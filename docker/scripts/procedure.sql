CREATE PROCEDURE [dbo].[CalcGrade] 
	@PERFORMED INT
AS
DECLARE
	@EVALUATION INT, 
	@USER INT, 
	@GOALS INT, 
	@ROLE NVARCHAR(20), 
	@GOALS_GRADE FLOAT,
	@SKILLS_GRADE FLOAT,
	@FINAL_GRADE DECIMAL(18,2);

SELECT @EVALUATION = id_evaluation, @USER = id_user FROM performed_evaluations WHERE id = @PERFORMED;
SELECT @ROLE = role FROM users WHERE id = @USER;
SELECT @GOALS = COUNT(*) FROM performed_goals WHERE id_performed_evaluation = @PERFORMED;
	
SELECT @GOALS_GRADE = COALESCE(SUM(CAST(T3.value * (CAST(T2.weight AS DECIMAL(18,2)) / 100) AS DECIMAL(18,2))), 0) * 0.6
FROM  performed_goals_kpis T0 
	INNER JOIN performed_goals T1 ON T0.id_performed_goal = T1.id
	INNER JOIN kpis T2 ON T0.id_kpi = T2.id
	LEFT JOIN ratings T3 ON T0.id_rating_manager = T3.id
WHERE T1.id_performed_evaluation = @PERFORMED;

IF @ROLE = 'USER'
	SELECT 
		@SKILLS_GRADE = COALESCE(SUM(COALESCE(T2.value, 0)) / NULLIF(CONVERT(DECIMAL(5, 2), COUNT(T0.id_skill)), 0), 0) * 0.4
	FROM performed_skills T0
		INNER JOIN performed_evaluations T1 ON T0.id_performed_evaluation = T1.id
		LEFT JOIN ratings T2 ON T0.id_rating_manager = T2.id
		INNER JOIN users T3 ON T1.id_user = T3.id
		INNER JOIN sections_skills T4 ON T0.id_skill = T4.id_skill
		INNER JOIN sections T5 ON T4.id_section = T5.id
	WHERE T1.id = @PERFORMED AND T3.id = @USER AND JSON_VALUE(T5.visibility, '$.USER') = 'true';
ELSE
	SELECT @SKILLS_GRADE = SUM(T0."rating") FROM
	(
		SELECT 
			COALESCE(SUM(COALESCE(T2.value, 0)) / NULLIF(CONVERT(DECIMAL(5, 2), COUNT(T0.id_skill)), 0), 0) * 0.3 AS "rating"
		FROM performed_skills T0
			INNER JOIN performed_evaluations T1 ON T0.id_performed_evaluation = T1.id
			INNER JOIN ratings T2 ON T0.id_rating_manager = T2.id
			INNER JOIN users T3 ON T1.id_user = T3.id
			INNER JOIN sections_skills T4 ON T0.id_skill = T4.id_skill
			INNER JOIN sections T5 ON T4.id_section = T5.id
		WHERE T1.id = @PERFORMED AND T3.id = @USER AND JSON_VALUE(T5.visibility, '$.USER') = 'false'
		UNION ALL
		SELECT 
			COALESCE(SUM(COALESCE(T2.value, 0)) / NULLIF(CONVERT(DECIMAL(5, 2), COUNT(T0.id_skill)), 0), 0) * 0.1 AS "rating"
		FROM performed_skills T0
			INNER JOIN performed_evaluations T1 ON T0.id_performed_evaluation = T1.id
			LEFT JOIN ratings T2 ON T0.id_rating_manager = T2.id
			INNER JOIN users T3 ON T1.id_user = T3.id
			INNER JOIN sections_skills T4 ON T0.id_skill = T4.id_skill
			INNER JOIN sections T5 ON T4.id_section = T5.id
		WHERE T1.id = @PERFORMED AND T3.id = @USER AND JSON_VALUE(T5.visibility, '$.USER') = 'true'
	) T0
	
SET @FINAL_GRADE = (CAST(@GOALS_GRADE + @SKILLS_GRADE AS DECIMAL(18,2))) * (2.85 / 3);
UPDATE performed_evaluations SET grade = @FINAL_GRADE WHERE id = @PERFORMED;
SELECT @FINAL_GRADE AS grade;
import { MigrationInterface, QueryRunner } from 'typeorm'

export class entities1652881147112 implements MigrationInterface {
  name = 'entities1652881147112'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "departments_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_3df211d0bb83558d3b10f0b0e44" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_3de2c1fd199567452537c167d34" DEFAULT getdate(), "id_department" int, CONSTRAINT "UQ_0ab4ec837d3dca1bed95de67b73" UNIQUE ("name"), CONSTRAINT "PK_53cc45acebd0f443da290764c11" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3f1543c59b45769b941cb5cef5" ON "departments_i18n" ("locale", "name") `
    )
    await queryRunner.query(
      `CREATE TABLE "users_info" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "lastname" nvarchar(255) NOT NULL, "position" nvarchar(255), "hiring_date" datetime, "badge" int, "cost_center" int, "created_at" datetime2 NOT NULL CONSTRAINT "DF_dbadee3e4904721c60fc9368797" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_ff726f56b96c4d5addb027932b7" DEFAULT getdate(), "id_user" int, CONSTRAINT "PK_9bcc2add2d98c69cbb75a0cba27" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_b73a92e2defa4ab1db4b479d16" ON "users_info" ("id_user") WHERE "id_user" IS NOT NULL`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "username" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "role" nvarchar(255) CONSTRAINT CHK_b8c106307556a173b043517972_ENUM CHECK(role IN ('director','coordinator','manager','user')) NOT NULL CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'user', "password" nvarchar(255) NOT NULL, "reset_password_token" nvarchar(255), "confirmation_token" nvarchar(255), "confirmed" bit NOT NULL CONSTRAINT "DF_2a39c2b157b2243de823078fb10" DEFAULT 0, "blocked" bit NOT NULL CONSTRAINT "DF_96119538f2b94220cc7b4838186" DEFAULT 0, "created_at" datetime2 NOT NULL CONSTRAINT "DF_c9b5b525a96ddc2c5647d7f7fa5" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_6d596d799f9cb9dac6f7bf7c23c" DEFAULT getdate(), "deleted_at" datetime2, "id_info" int, "id_manager" int, "id_department" int, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_772886e2f1f47b9ceb04a06e20" ON "users" ("username", "email") `
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_83d9548fc459d58a7fed8160e7" ON "users" ("id_info") WHERE "id_info" IS NOT NULL`
    )
    await queryRunner.query(
      `CREATE TABLE "departments" ("id" int NOT NULL IDENTITY(1,1), "key" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_a3ab2926f3e068ac16ba6ab1bed" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_397a72a7f8acdd1b1ac85c544cf" DEFAULT getdate(), CONSTRAINT "UQ_c2892a1c87548db0f755815032c" UNIQUE ("key"), CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "kpis" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(3000) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_68dc5089801831d2dc1078d3451" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_48a298fb357909c3ad403c26169" DEFAULT getdate(), "managerId" int, CONSTRAINT "PK_96cc541107cdc102a50e2b0ac90" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ae9385eea774a40534e07cfb99" ON "kpis" ("managerId", "name") `
    )
    await queryRunner.query(
      `CREATE TABLE "evaluation_goals_kpis" ("id" int NOT NULL IDENTITY(1,1), "target" nvarchar(2000) NOT NULL, "weight" int NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_6337253ba9abe0f56ecc46e43e4" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_6709edbee3d9128158a6f719897" DEFAULT getdate(), "deleted_at" datetime2, "id_evaluation_goal" int, "id_kpi" int, CONSTRAINT "PK_fd13a6cf65fb40c46611c3037fc" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_44ffd158808b44091fd63dc840" ON "evaluation_goals_kpis" ("id_evaluation_goal", "id_kpi") `
    )
    await queryRunner.query(
      `CREATE TABLE "goals" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(3000) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_c1171823d19139accf56f4a027d" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_8194fec1f975dce08f43b9d9f02" DEFAULT getdate(), "deleted_at" datetime2, "managerId" int, CONSTRAINT "PK_26e17b251afab35580dff769223" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f118c6d1dba83450e1fb6383d5" ON "goals" ("managerId", "name") `
    )
    await queryRunner.query(
      `CREATE TABLE "evaluation_goals" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_c4670c14ac31fad7db1de250afd" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_440f806dc5cac5e9a08fff905b4" DEFAULT getdate(), "deleted_at" datetime2, "id_evaluation" int, "id_user" int, "id_goal" int, CONSTRAINT "PK_a3f533a290daebdc74c224cf1ce" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5d38f857155460eea1ef59b04a" ON "evaluation_goals" ("id_evaluation", "id_user", "id_goal") `
    )
    await queryRunner.query(
      `CREATE TABLE "feedbacks_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) NOT NULL, "inquire" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_ef3452414e943cb59994b36cb87" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_a5bcd329c4708623700bd6c798d" DEFAULT getdate(), "id_feedback" int, CONSTRAINT "UQ_5b8ebdd96ab6aff26698c5b4a91" UNIQUE ("inquire"), CONSTRAINT "PK_4bd551dc0ce4779443a920dc554" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "feedbacks" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_a640975f8ccf17d9337d4ff8289" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_702c980bb7e8a500183e63f4a1c" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "questions_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) NOT NULL, "ask" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_2951819ef69bbe868d3ed853e48" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_89e67b96a69e4b0085c3b97b8a6" DEFAULT getdate(), "id_question" int, CONSTRAINT "UQ_b31f92707649815511151f80db9" UNIQUE ("ask"), CONSTRAINT "PK_d4649d34ac520beba208a6449ad" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6cc760fefecfe2b1085bc5d964" ON "questions_i18n" ("locale", "ask") `
    )
    await queryRunner.query(
      `CREATE TABLE "questions" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_03d214f92d9f3788afa3d6c6cbf" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_e05765efbd271985fbd7c705c6c" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "sections_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) NOT NULL, "title" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_bb6707de094a55f1688c645f5fc" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_bbe761cf4381c14fb182b1f62e2" DEFAULT getdate(), "id_section" int, CONSTRAINT "UQ_36120703e60b991fd1fff2d95bb" UNIQUE ("title"), CONSTRAINT "PK_e742d43e8119c4e0900f554c30c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_796009b62d401d39a87bd599e1" ON "sections_i18n" ("locale", "title") `
    )
    await queryRunner.query(
      `CREATE TABLE "skills_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) NOT NULL, "title" nvarchar(500) NOT NULL, "description" nvarchar(1500) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_49cda74993d36fc24706d35db1a" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_8444b3fb3c14aeaf26230bddb3d" DEFAULT getdate(), "id_skill" int, CONSTRAINT "UQ_cfc0dd7cd3965b95b0c233ad428" UNIQUE ("description"), CONSTRAINT "PK_24317eee8619ab3a8b29fc21751" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3ad695072ae8f5a7d17f5125c3" ON "skills_i18n" ("locale", "title", "description") `
    )
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_5691383aae0eedf3e760e13bc93" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_b66cd3980805599124869abb779" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "sections" ("id" int NOT NULL IDENTITY(1,1), "visibility" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_32557a690983f452a99a60e0c1f" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_ec055976f7d297543644e27d939" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "evaluations" ("id" int NOT NULL IDENTITY(1,1), "year" int NOT NULL, "period" nvarchar(255) NOT NULL, "mid_date" nvarchar(255) NOT NULL, "end_date" nvarchar(255) NOT NULL, "finished" bit NOT NULL CONSTRAINT "DF_ce6327dcc6b6d029b264a98fe08" DEFAULT 0, "created_at" datetime2 NOT NULL CONSTRAINT "DF_4318c6c2369c701f70623236563" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_4af9d81a7f2f1ce6f246833fca9" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "UQ_9f5b5463df9c534efe9eaf00653" UNIQUE ("year"), CONSTRAINT "PK_f683b433eba0e6dae7e19b29e29" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "performed_evaluations" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_2e4f460f2cad399d7623705e99d" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_f3d54a566ece0f839f452699618" DEFAULT getdate(), "id_evaluation" int, "id_user" int, CONSTRAINT "PK_0b716572b41f8e173f63e111582" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_cc65fa5e66976cc5378483cb6b" ON "performed_evaluations" ("id_evaluation", "id_user") `
    )
    await queryRunner.query(
      `CREATE TABLE "sections_questions" ("id_section" int NOT NULL, "id_question" int NOT NULL, CONSTRAINT "PK_55ad03a5615d214fb9b5b25d333" PRIMARY KEY ("id_section", "id_question"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_cba67dcd1e160f764b64d3be80" ON "sections_questions" ("id_section") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_d77711698e7755ef675c62c990" ON "sections_questions" ("id_question") `
    )
    await queryRunner.query(
      `CREATE TABLE "sections_skills" ("id_section" int NOT NULL, "id_skill" int NOT NULL, CONSTRAINT "PK_c27052974adbc7e429af8234b53" PRIMARY KEY ("id_section", "id_skill"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_cc60494923c2236065f58828b1" ON "sections_skills" ("id_section") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_702af868e3afd187c27de82f2d" ON "sections_skills" ("id_skill") `
    )
    await queryRunner.query(
      `CREATE TABLE "evaluations_sections" ("id_evaluation" int NOT NULL, "id_section" int NOT NULL, CONSTRAINT "PK_e56e1d933a7fac2511e9631e30b" PRIMARY KEY ("id_evaluation", "id_section"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_0ba83ab878910a419d5f8e5ecd" ON "evaluations_sections" ("id_evaluation") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_bff6d40fc28067ea94dc256ec6" ON "evaluations_sections" ("id_section") `
    )
    await queryRunner.query(
      `CREATE TABLE "evaluations_feedbacks" ("id_evaluation" int NOT NULL, "id_feedback" int NOT NULL, CONSTRAINT "PK_6c2d958d77147a35e78dce18275" PRIMARY KEY ("id_evaluation", "id_feedback"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_8e6354484700827b7f2e1fb0eb" ON "evaluations_feedbacks" ("id_evaluation") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_58b4050478444aab6ce31839c5" ON "evaluations_feedbacks" ("id_feedback") `
    )
    await queryRunner.query(
      `ALTER TABLE "departments_i18n" ADD CONSTRAINT "FK_1b521a832cee6f73988751677c5" FOREIGN KEY ("id_department") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "users_info" ADD CONSTRAINT "FK_b73a92e2defa4ab1db4b479d164" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_83d9548fc459d58a7fed8160e73" FOREIGN KEY ("id_info") REFERENCES "users_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_b02459f8160c69e9c5eba1331d9" FOREIGN KEY ("id_manager") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_c2ef2a584021384115595a7b78e" FOREIGN KEY ("id_department") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "kpis" ADD CONSTRAINT "FK_768ffe916f462fef573f6c0164f" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals_kpis" ADD CONSTRAINT "FK_ebd979cf5856f5b910cb6087b6a" FOREIGN KEY ("id_evaluation_goal") REFERENCES "evaluation_goals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals_kpis" ADD CONSTRAINT "FK_b642071a954ad5a296d1f54c585" FOREIGN KEY ("id_kpi") REFERENCES "kpis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_8bc2b358d680dcd9a90283967e5" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals" ADD CONSTRAINT "FK_3248108596488ce3f10b3bac188" FOREIGN KEY ("id_evaluation") REFERENCES "evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals" ADD CONSTRAINT "FK_7b2bc5d2f3a128a17132c1b5e5e" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals" ADD CONSTRAINT "FK_84a6b2cf5a89d94c54d80b1e982" FOREIGN KEY ("id_goal") REFERENCES "goals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "feedbacks_i18n" ADD CONSTRAINT "FK_13603024f3308bd563692311db0" FOREIGN KEY ("id_feedback") REFERENCES "feedbacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "questions_i18n" ADD CONSTRAINT "FK_1f7ad8a631a009c341981cebd4c" FOREIGN KEY ("id_question") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_i18n" ADD CONSTRAINT "FK_87b0391dd5f05125de4ac1d2ac3" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "skills_i18n" ADD CONSTRAINT "FK_b0673045f539b722c3d5406e3be" FOREIGN KEY ("id_skill") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_evaluations" ADD CONSTRAINT "FK_41c31a374e87665d55e17bbfd6f" FOREIGN KEY ("id_evaluation") REFERENCES "evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_evaluations" ADD CONSTRAINT "FK_531932210537d83460ab420ca08" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_questions" ADD CONSTRAINT "FK_cba67dcd1e160f764b64d3be80b" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_questions" ADD CONSTRAINT "FK_d77711698e7755ef675c62c990b" FOREIGN KEY ("id_question") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_skills" ADD CONSTRAINT "FK_cc60494923c2236065f58828b14" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_skills" ADD CONSTRAINT "FK_702af868e3afd187c27de82f2d1" FOREIGN KEY ("id_skill") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluations_sections" ADD CONSTRAINT "FK_0ba83ab878910a419d5f8e5ecdd" FOREIGN KEY ("id_evaluation") REFERENCES "evaluations"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluations_sections" ADD CONSTRAINT "FK_bff6d40fc28067ea94dc256ec68" FOREIGN KEY ("id_section") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluations_feedbacks" ADD CONSTRAINT "FK_8e6354484700827b7f2e1fb0ebb" FOREIGN KEY ("id_evaluation") REFERENCES "evaluations"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluations_feedbacks" ADD CONSTRAINT "FK_58b4050478444aab6ce31839c59" FOREIGN KEY ("id_feedback") REFERENCES "feedbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluations_feedbacks" DROP CONSTRAINT "FK_58b4050478444aab6ce31839c59"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluations_feedbacks" DROP CONSTRAINT "FK_8e6354484700827b7f2e1fb0ebb"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluations_sections" DROP CONSTRAINT "FK_bff6d40fc28067ea94dc256ec68"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluations_sections" DROP CONSTRAINT "FK_0ba83ab878910a419d5f8e5ecdd"`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_skills" DROP CONSTRAINT "FK_702af868e3afd187c27de82f2d1"`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_skills" DROP CONSTRAINT "FK_cc60494923c2236065f58828b14"`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_questions" DROP CONSTRAINT "FK_d77711698e7755ef675c62c990b"`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_questions" DROP CONSTRAINT "FK_cba67dcd1e160f764b64d3be80b"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_evaluations" DROP CONSTRAINT "FK_531932210537d83460ab420ca08"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_evaluations" DROP CONSTRAINT "FK_41c31a374e87665d55e17bbfd6f"`
    )
    await queryRunner.query(
      `ALTER TABLE "skills_i18n" DROP CONSTRAINT "FK_b0673045f539b722c3d5406e3be"`
    )
    await queryRunner.query(
      `ALTER TABLE "sections_i18n" DROP CONSTRAINT "FK_87b0391dd5f05125de4ac1d2ac3"`
    )
    await queryRunner.query(
      `ALTER TABLE "questions_i18n" DROP CONSTRAINT "FK_1f7ad8a631a009c341981cebd4c"`
    )
    await queryRunner.query(
      `ALTER TABLE "feedbacks_i18n" DROP CONSTRAINT "FK_13603024f3308bd563692311db0"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals" DROP CONSTRAINT "FK_84a6b2cf5a89d94c54d80b1e982"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals" DROP CONSTRAINT "FK_7b2bc5d2f3a128a17132c1b5e5e"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals" DROP CONSTRAINT "FK_3248108596488ce3f10b3bac188"`
    )
    await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_8bc2b358d680dcd9a90283967e5"`)
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals_kpis" DROP CONSTRAINT "FK_b642071a954ad5a296d1f54c585"`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_goals_kpis" DROP CONSTRAINT "FK_ebd979cf5856f5b910cb6087b6a"`
    )
    await queryRunner.query(`ALTER TABLE "kpis" DROP CONSTRAINT "FK_768ffe916f462fef573f6c0164f"`)
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c2ef2a584021384115595a7b78e"`)
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b02459f8160c69e9c5eba1331d9"`)
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_83d9548fc459d58a7fed8160e73"`)
    await queryRunner.query(
      `ALTER TABLE "users_info" DROP CONSTRAINT "FK_b73a92e2defa4ab1db4b479d164"`
    )
    await queryRunner.query(
      `ALTER TABLE "departments_i18n" DROP CONSTRAINT "FK_1b521a832cee6f73988751677c5"`
    )
    await queryRunner.query(
      `DROP INDEX "IDX_58b4050478444aab6ce31839c5" ON "evaluations_feedbacks"`
    )
    await queryRunner.query(
      `DROP INDEX "IDX_8e6354484700827b7f2e1fb0eb" ON "evaluations_feedbacks"`
    )
    await queryRunner.query(`DROP TABLE "evaluations_feedbacks"`)
    await queryRunner.query(`DROP INDEX "IDX_bff6d40fc28067ea94dc256ec6" ON "evaluations_sections"`)
    await queryRunner.query(`DROP INDEX "IDX_0ba83ab878910a419d5f8e5ecd" ON "evaluations_sections"`)
    await queryRunner.query(`DROP TABLE "evaluations_sections"`)
    await queryRunner.query(`DROP INDEX "IDX_702af868e3afd187c27de82f2d" ON "sections_skills"`)
    await queryRunner.query(`DROP INDEX "IDX_cc60494923c2236065f58828b1" ON "sections_skills"`)
    await queryRunner.query(`DROP TABLE "sections_skills"`)
    await queryRunner.query(`DROP INDEX "IDX_d77711698e7755ef675c62c990" ON "sections_questions"`)
    await queryRunner.query(`DROP INDEX "IDX_cba67dcd1e160f764b64d3be80" ON "sections_questions"`)
    await queryRunner.query(`DROP TABLE "sections_questions"`)
    await queryRunner.query(
      `DROP INDEX "IDX_cc65fa5e66976cc5378483cb6b" ON "performed_evaluations"`
    )
    await queryRunner.query(`DROP TABLE "performed_evaluations"`)
    await queryRunner.query(`DROP TABLE "evaluations"`)
    await queryRunner.query(`DROP TABLE "sections"`)
    await queryRunner.query(`DROP TABLE "skills"`)
    await queryRunner.query(`DROP INDEX "IDX_3ad695072ae8f5a7d17f5125c3" ON "skills_i18n"`)
    await queryRunner.query(`DROP TABLE "skills_i18n"`)
    await queryRunner.query(`DROP INDEX "IDX_796009b62d401d39a87bd599e1" ON "sections_i18n"`)
    await queryRunner.query(`DROP TABLE "sections_i18n"`)
    await queryRunner.query(`DROP TABLE "questions"`)
    await queryRunner.query(`DROP INDEX "IDX_6cc760fefecfe2b1085bc5d964" ON "questions_i18n"`)
    await queryRunner.query(`DROP TABLE "questions_i18n"`)
    await queryRunner.query(`DROP TABLE "feedbacks"`)
    await queryRunner.query(`DROP TABLE "feedbacks_i18n"`)
    await queryRunner.query(`DROP INDEX "IDX_5d38f857155460eea1ef59b04a" ON "evaluation_goals"`)
    await queryRunner.query(`DROP TABLE "evaluation_goals"`)
    await queryRunner.query(`DROP INDEX "IDX_f118c6d1dba83450e1fb6383d5" ON "goals"`)
    await queryRunner.query(`DROP TABLE "goals"`)
    await queryRunner.query(
      `DROP INDEX "IDX_44ffd158808b44091fd63dc840" ON "evaluation_goals_kpis"`
    )
    await queryRunner.query(`DROP TABLE "evaluation_goals_kpis"`)
    await queryRunner.query(`DROP INDEX "IDX_ae9385eea774a40534e07cfb99" ON "kpis"`)
    await queryRunner.query(`DROP TABLE "kpis"`)
    await queryRunner.query(`DROP TABLE "departments"`)
    await queryRunner.query(`DROP INDEX "REL_83d9548fc459d58a7fed8160e7" ON "users"`)
    await queryRunner.query(`DROP INDEX "IDX_772886e2f1f47b9ceb04a06e20" ON "users"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP INDEX "REL_b73a92e2defa4ab1db4b479d16" ON "users_info"`)
    await queryRunner.query(`DROP TABLE "users_info"`)
    await queryRunner.query(`DROP INDEX "IDX_3f1543c59b45769b941cb5cef5" ON "departments_i18n"`)
    await queryRunner.query(`DROP TABLE "departments_i18n"`)
  }
}

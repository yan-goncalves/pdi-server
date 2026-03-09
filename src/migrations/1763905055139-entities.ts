import { MigrationInterface, QueryRunner } from "typeorm";

export class Entities1763905055139 implements MigrationInterface {
    name = 'Entities1763905055139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create evaluation_approvals table
        await queryRunner.query(`
            CREATE TABLE "evaluation_approvals" (
                "id" int NOT NULL IDENTITY(1,1),
                "period" nvarchar(255) NOT NULL,
                "status" nvarchar(255) NOT NULL DEFAULT 'PENDING',
                "comment" nvarchar(MAX),
                "created_at" datetime2 NOT NULL CONSTRAINT "DF_evaluation_approvals_created_at" DEFAULT getdate(),
                "updated_at" datetime2 NOT NULL CONSTRAINT "DF_evaluation_approvals_updated_at" DEFAULT getdate(),
                "id_performed_evaluation" int NOT NULL,
                "id_hr_user" int,
                CONSTRAINT "PK_evaluation_approvals" PRIMARY KEY ("id")
            )
        `);

        // Create unique index on performed_evaluation + period
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_evaluation_approvals_performed_period"
            ON "evaluation_approvals" ("id_performed_evaluation", "period")
        `);

        // Add foreign key to performed_evaluations
        await queryRunner.query(`
            ALTER TABLE "evaluation_approvals"
            ADD CONSTRAINT "FK_evaluation_approvals_performed_evaluation"
            FOREIGN KEY ("id_performed_evaluation")
            REFERENCES "performed_evaluations"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        // Add foreign key to users (hr_user)
        await queryRunner.query(`
            ALTER TABLE "evaluation_approvals"
            ADD CONSTRAINT "FK_evaluation_approvals_hr_user"
            FOREIGN KEY ("id_hr_user")
            REFERENCES "users"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        // Populate existing finished evaluations as APPROVED
        // For MID evaluations
        await queryRunner.query(`
            INSERT INTO "evaluation_approvals"
                ("id_performed_evaluation", "period", "status", "comment", "created_at", "updated_at")
            SELECT
                id,
                'MID',
                'APPROVED',
                'Automatically approved - evaluation finished before approval system implementation',
                created_at,
                updated_at
            FROM "performed_evaluations"
            WHERE "mid_finished" = 1
        `);

        // For END evaluations
        await queryRunner.query(`
            INSERT INTO "evaluation_approvals"
                ("id_performed_evaluation", "period", "status", "comment", "created_at", "updated_at")
            SELECT
                id,
                'END',
                'APPROVED',
                'Automatically approved - evaluation finished before approval system implementation',
                created_at,
                updated_at
            FROM "performed_evaluations"
            WHERE "end_finished" = 1
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys
        await queryRunner.query(`
            ALTER TABLE "evaluation_approvals"
            DROP CONSTRAINT "FK_evaluation_approvals_hr_user"
        `);

        await queryRunner.query(`
            ALTER TABLE "evaluation_approvals"
            DROP CONSTRAINT "FK_evaluation_approvals_performed_evaluation"
        `);

        // Drop index
        await queryRunner.query(`
            DROP INDEX "IDX_evaluation_approvals_performed_period"
            ON "evaluation_approvals"
        `);

        // Drop table
        await queryRunner.query(`DROP TABLE "evaluation_approvals"`);
    }

}

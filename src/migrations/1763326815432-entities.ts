import { MigrationInterface, QueryRunner } from "typeorm";

export class entities1763326815432 implements MigrationInterface {
    name = 'entities1763326815432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "performed_evaluations" ADD "calibration_value" float`);
        await queryRunner.query(`ALTER TABLE "performed_evaluations" ADD "calibration_justification" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "performed_evaluations" DROP COLUMN "calibration_justification"`);
        await queryRunner.query(`ALTER TABLE "performed_evaluations" DROP COLUMN "calibration_value"`);
    }

}

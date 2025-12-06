import { MigrationInterface, QueryRunner } from "typeorm";

export class entities1763320158154 implements MigrationInterface {
    name = 'entities1763320158154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpis" DROP CONSTRAINT "FK_799560f4cd65142a1afb2e4815f"`);
        await queryRunner.query(`ALTER TABLE "kpis" DROP CONSTRAINT "FK_768ffe916f462fef573f6c0164f"`);
        await queryRunner.query(`DROP INDEX "IDX_3f1543c59b45769b941cb5cef5" ON "departments_i18n"`);
        await queryRunner.query(`DROP INDEX "IDX_d339ae0c66697e951248e92948" ON "kpis"`);
        await queryRunner.query(`ALTER TABLE "departments_i18n" DROP CONSTRAINT "UQ_0ab4ec837d3dca1bed95de67b73"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a4eb2bef2ca337e2f75f491152" ON "kpis" ("id_goal", "id_manager", "name") `);
        await queryRunner.query(`ALTER TABLE "kpis" ADD CONSTRAINT "FK_7e1e1119ad65f0146b17d85c2cf" FOREIGN KEY ("id_goal") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpis" ADD CONSTRAINT "FK_6981b02832693aacfc028537f05" FOREIGN KEY ("id_manager") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpis" DROP CONSTRAINT "FK_6981b02832693aacfc028537f05"`);
        await queryRunner.query(`ALTER TABLE "kpis" DROP CONSTRAINT "FK_7e1e1119ad65f0146b17d85c2cf"`);
        await queryRunner.query(`DROP INDEX "IDX_a4eb2bef2ca337e2f75f491152" ON "kpis"`);
        await queryRunner.query(`ALTER TABLE "departments_i18n" ADD CONSTRAINT "UQ_0ab4ec837d3dca1bed95de67b73" UNIQUE ("name")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d339ae0c66697e951248e92948" ON "kpis" ("id_goal", "id_manager", "name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3f1543c59b45769b941cb5cef5" ON "departments_i18n" ("locale", "name") `);
        await queryRunner.query(`ALTER TABLE "kpis" ADD CONSTRAINT "FK_768ffe916f462fef573f6c0164f" FOREIGN KEY ("id_manager") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpis" ADD CONSTRAINT "FK_799560f4cd65142a1afb2e4815f" FOREIGN KEY ("id_goal") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

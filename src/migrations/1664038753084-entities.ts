import { MigrationInterface, QueryRunner } from 'typeorm'

export class entities1664038753084 implements MigrationInterface {
  name = 'entities1664038753084'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "components_text_field_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_328ec9a5e8cb83c11b5390462a_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_4a6f67dc08e367874b37c5e8566" DEFAULT 'BR', "labelPlaceholder" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_42ba3dcbe44d484b851ba62df00" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_76f99eb92f849806d000690d0b0" DEFAULT getdate(), "id_text_field" int, CONSTRAINT "UQ_892198734b6bb2db0ab4ab019c7" UNIQUE ("labelPlaceholder"), CONSTRAINT "PK_8b5d496886ceba131329a504cfd" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_68d839702aeba43a6ccca1ed55" ON "components_text_field_i18n" ("locale", "labelPlaceholder") `
    )
    await queryRunner.query(
      `CREATE TABLE "components_text_field" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_3a7896f75dd41a3a9501acb09a0" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_efc142b260819ff32b053efb856" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_e9215fcd82ca315b3454b81290b" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "components_button" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_88b8045dd88d8272c2d4b06bf41" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_8b4ce163f9d266a6bb4d3562e78" DEFAULT getdate(), CONSTRAINT "PK_1020cc29ec6ecc3a30e81c17035" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "components_button_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_0757c8ce27520ceafbdc4d1148_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_e08aad5b8fcbf1355959cc8f38c" DEFAULT 'BR', "label" nvarchar(255) NOT NULL, "loadingLabel" nvarchar(255), "created_at" datetime2 NOT NULL CONSTRAINT "DF_0318b0398d3b0f6692a41dbca62" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_cd5065bb3f350bea58b11b495fc" DEFAULT getdate(), "id_button" int, CONSTRAINT "UQ_303c5ce6f39ba31cb64e54a64fe" UNIQUE ("label"), CONSTRAINT "PK_d7103a6426986fa6c727206e1e0" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f82ed92747c5e696a37f1d1348" ON "components_button_i18n" ("locale", "label", "loadingLabel") `
    )
    await queryRunner.query(
      `CREATE TABLE "users_info" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "lastname" nvarchar(255) NOT NULL, "position" nvarchar(255), "hiring_date" datetime, "badge" int, "cost_center" int, "created_at" datetime2 NOT NULL CONSTRAINT "DF_dbadee3e4904721c60fc9368797" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_ff726f56b96c4d5addb027932b7" DEFAULT getdate(), "id_user" int, CONSTRAINT "PK_9bcc2add2d98c69cbb75a0cba27" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_b73a92e2defa4ab1db4b479d16" ON "users_info" ("id_user") WHERE "id_user" IS NOT NULL`
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "username" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "role" nvarchar(255) CONSTRAINT CHK_89b7e1721095e5d5c33c0434da_ENUM CHECK(role IN ('ADMIN','DIRECTOR','COORDINATOR','MANAGER','USER')) NOT NULL CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'USER', "password" nvarchar(255) NOT NULL, "reset_password_token" nvarchar(255), "confirmation_token" nvarchar(255), "confirmed" bit NOT NULL CONSTRAINT "DF_2a39c2b157b2243de823078fb10" DEFAULT 0, "blocked" bit NOT NULL CONSTRAINT "DF_96119538f2b94220cc7b4838186" DEFAULT 0, "picture" nvarchar(255), "created_at" datetime2 NOT NULL CONSTRAINT "DF_c9b5b525a96ddc2c5647d7f7fa5" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_6d596d799f9cb9dac6f7bf7c23c" DEFAULT getdate(), "deleted_at" datetime2, "id_info" int, "id_manager" int, "id_department" int, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
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
      `CREATE TABLE "departments_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_7015f8a368145f13744b526f9d_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_bb72e159aa47ca527fe5e3e6f92" DEFAULT 'BR', "name" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_3df211d0bb83558d3b10f0b0e44" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_3de2c1fd199567452537c167d34" DEFAULT getdate(), "id_department" int, CONSTRAINT "UQ_0ab4ec837d3dca1bed95de67b73" UNIQUE ("name"), CONSTRAINT "PK_53cc45acebd0f443da290764c11" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3f1543c59b45769b941cb5cef5" ON "departments_i18n" ("locale", "name") `
    )
    await queryRunner.query(
      `CREATE TABLE "evaluation_result_concepts" ("id" int NOT NULL IDENTITY(1,1), "concept" char NOT NULL, "color" nvarchar(255) CONSTRAINT CHK_4aabd7392492d483d6f22078b1_ENUM CHECK(color IN ('dark','gray','red','pink','grape','violet','indigo','blue','cyan','green','lime','yellow','orange','teal')) NOT NULL, "min" float NOT NULL, "max" float NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_b988dd4ff3c9baeb8b67bac1738" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_153778bcd64c68c1951b0af11e1" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_43a7cbb69540058dab5b6aa8f82" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_66df05e691ae1633fa2a4628ba" ON "evaluation_result_concepts" ("concept", "color") `
    )
    await queryRunner.query(
      `CREATE TABLE "evaluation_result_concepts_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_2e8dd03a28bde3b7141a8c4e0f_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_ada38724d152f770b4cbef9bac9" DEFAULT 'BR', "description" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_48b0178dcaf4b4f5406a468c694" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_e4e0a073b397a21f71cae821a10" DEFAULT getdate(), "id_evaluation_result_concept" int, CONSTRAINT "UQ_e7de344f643ad1100c00c433191" UNIQUE ("description"), CONSTRAINT "PK_05524f19806cc87afd1b6697ae3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a07676a8e0fc4c858c68956f71" ON "evaluation_result_concepts_i18n" ("locale", "description") `
    )
    await queryRunner.query(
      `CREATE TABLE "feedbacks_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_f19348a0770a2b74e77d4475d6_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_dbb96c8d7b7dd8aa288a077608a" DEFAULT 'BR', "inquire" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_ef3452414e943cb59994b36cb87" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_a5bcd329c4708623700bd6c798d" DEFAULT getdate(), "id_feedback" int, CONSTRAINT "UQ_5b8ebdd96ab6aff26698c5b4a91" UNIQUE ("inquire"), CONSTRAINT "PK_4bd551dc0ce4779443a920dc554" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "feedbacks" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_a640975f8ccf17d9337d4ff8289" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_702c980bb7e8a500183e63f4a1c" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "questions_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_12e9176a513ddc4b7861e6280c_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_3ae77d84669baa536bc94042bf0" DEFAULT 'BR', "ask" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_2951819ef69bbe868d3ed853e48" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_89e67b96a69e4b0085c3b97b8a6" DEFAULT getdate(), "id_question" int, CONSTRAINT "UQ_b31f92707649815511151f80db9" UNIQUE ("ask"), CONSTRAINT "PK_d4649d34ac520beba208a6449ad" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_6cc760fefecfe2b1085bc5d964" ON "questions_i18n" ("locale", "ask") `
    )
    await queryRunner.query(
      `CREATE TABLE "questions" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_03d214f92d9f3788afa3d6c6cbf" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_e05765efbd271985fbd7c705c6c" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "sections_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_64c128576ba9866b7e83fb6d3e_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_130a72d3203251612d2f3af4e31" DEFAULT 'BR', "title" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_bb6707de094a55f1688c645f5fc" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_bbe761cf4381c14fb182b1f62e2" DEFAULT getdate(), "id_section" int, CONSTRAINT "UQ_36120703e60b991fd1fff2d95bb" UNIQUE ("title"), CONSTRAINT "PK_e742d43e8119c4e0900f554c30c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_796009b62d401d39a87bd599e1" ON "sections_i18n" ("locale", "title") `
    )
    await queryRunner.query(
      `CREATE TABLE "skills_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_1d79e57d2b98b94229cf5108b1_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_79d202559b9d3462f3572f2aa9e" DEFAULT 'BR', "title" nvarchar(500) NOT NULL, "description" nvarchar(1500) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_49cda74993d36fc24706d35db1a" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_8444b3fb3c14aeaf26230bddb3d" DEFAULT getdate(), "id_skill" int, CONSTRAINT "UQ_cfc0dd7cd3965b95b0c233ad428" UNIQUE ("description"), CONSTRAINT "PK_24317eee8619ab3a8b29fc21751" PRIMARY KEY ("id"))`
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
      `CREATE TABLE "evaluations" ("id" int NOT NULL IDENTITY(1,1), "year" int NOT NULL, "period" nvarchar(255) NOT NULL CONSTRAINT "DF_6a5fde36c82b373b0244d0f7c16" DEFAULT 'OUT', "mid_date" nvarchar(255) NOT NULL, "end_date" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_4318c6c2369c701f70623236563" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_4af9d81a7f2f1ce6f246833fca9" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "UQ_9f5b5463df9c534efe9eaf00653" UNIQUE ("year"), CONSTRAINT "PK_f683b433eba0e6dae7e19b29e29" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_9f5b5463df9c534efe9eaf0065" ON "evaluations" ("year") `
    )
    await queryRunner.query(
      `CREATE TABLE "kpis" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(3000) NOT NULL, "target" nvarchar(2000) NOT NULL, "weight" int NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_68dc5089801831d2dc1078d3451" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_48a298fb357909c3ad403c26169" DEFAULT getdate(), "id_goal" int, "id_manager" int, CONSTRAINT "PK_96cc541107cdc102a50e2b0ac90" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d339ae0c66697e951248e92948" ON "kpis" ("id_goal", "id_manager", "name") `
    )
    await queryRunner.query(
      `CREATE TABLE "goals" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(3000) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_c1171823d19139accf56f4a027d" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_8194fec1f975dce08f43b9d9f02" DEFAULT getdate(), "deleted_at" datetime2, "id_evaluation" int, "id_manager" int, "id_user" int, CONSTRAINT "PK_26e17b251afab35580dff769223" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c389d32efed3578a02b5c86458" ON "goals" ("id_evaluation", "id_manager", "id_user", "name") `
    )
    await queryRunner.query(
      `CREATE TABLE "media" ("id" int NOT NULL IDENTITY(1,1), "filename" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_c30f45ea7b47895ca14398e9744" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_46cc6399e00f4d3984d5731ea4c" DEFAULT getdate(), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "pdi_competences_categories" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_d2f6bc9693de8af0cc5577e36ca" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_1ce28a7bc04ee779dd580074a0e" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "UQ_48fdd3301e727c56360f0fc21dc" UNIQUE ("name"), CONSTRAINT "PK_f46e668209c055063686f2f91ce" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "pdi_competences" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(500) NOT NULL, "action" nvarchar(500) NOT NULL, "deadline" datetime NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_5a74a94e93f5f0003d8b83cd649" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_b851ec025e34c5431a7a072ad4b" DEFAULT getdate(), "id_performed_evaluation" int, "id_category" int, CONSTRAINT "PK_72b703689ce0fd400c4e7fe4c2d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_673a5b998dd429d67f8c7503cc" ON "pdi_competences" ("id_performed_evaluation", "name", "id_category", "action") `
    )
    await queryRunner.query(
      `CREATE TABLE "pdi_qualities" ("id" int NOT NULL IDENTITY(1,1), "category" nvarchar(255) CONSTRAINT CHK_f3c9e72d161d4a5f8e25588e8c_ENUM CHECK(category IN ('STRENGTH','WEAKNESS')) NOT NULL, "description" nvarchar(500) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_b3ea7b8d9307450fbb997f4e1de" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_bb58074a1e7eb3ee3e6127d3bb5" DEFAULT getdate(), "deleted_at" datetime2, "id_performed_evaluation" int, CONSTRAINT "PK_83c4914fd82bd71281b5b0f23e1" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "performed_feedbacks" ("id" int NOT NULL IDENTITY(1,1), "mid_reply" nvarchar(4000), "end_reply" nvarchar(4000), "created_at" datetime2 NOT NULL CONSTRAINT "DF_5b92f860bab5804fc6ec2b1af7a" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_07dcf4c4f57e1420ff941ab1143" DEFAULT getdate(), "id_performed_evaluation" int, "id_feedback" int, CONSTRAINT "PK_619f7044c6d42a9a7a3e7da0b8d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ae3696de35a5c966f103c68a21" ON "performed_feedbacks" ("id_performed_evaluation", "id_feedback") `
    )
    await queryRunner.query(
      `CREATE TABLE "ratings_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_e60b0a55c9bc36e388b25ed93f_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_7cfc12dc230159a91319cc91322" DEFAULT 'BR', "description" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_10be8a98d5af77ae1695bf12449" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_473879e0517362450b3c4c8d41d" DEFAULT getdate(), "id_rating" int, CONSTRAINT "UQ_13eba896f3f5e56ae034f250b56" UNIQUE ("description"), CONSTRAINT "PK_5cdd8e3f712708788d15efa72f1" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_634a9afb9cdf135598eaf6045c" ON "ratings_i18n" ("locale", "description") `
    )
    await queryRunner.query(
      `CREATE TABLE "ratings" ("id" int NOT NULL IDENTITY(1,1), "value" int NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_7ce8cbddc00e6031369f998f67d" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_dee0e06f074ac3a714fe8142082" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "UQ_c105c42bf5032e509533aaa0ad6" UNIQUE ("value"), CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "performed_goals_kpis" ("id" int NOT NULL IDENTITY(1,1), "achieved" nvarchar(2000), "mid_feedback_user" nvarchar(3000), "end_feedback_user" nvarchar(3000), "mid_feedback_manager" nvarchar(3000), "end_feedback_manager" nvarchar(3000), "created_at" datetime2 NOT NULL CONSTRAINT "DF_506def5582b1f97a5884ca89675" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_ac0a960a0a2efb46be2849c8678" DEFAULT getdate(), "id_performed_goal" int, "id_kpi" int, "id_rating_manager" int, CONSTRAINT "PK_eb1b95b1fa599ff774cc8991ada" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "performed_goals" ("id" int NOT NULL IDENTITY(1,1), "created_at" datetime2 NOT NULL CONSTRAINT "DF_041ff109f378d1703ef2c461759" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_8351aad58ea2fff061ecf1ad6d0" DEFAULT getdate(), "id_performed_evaluation" int, "id_goal" int, CONSTRAINT "PK_120e6dd1ca8f715b7450a963a3c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_0b194c54fc750b56ffebd438a6" ON "performed_goals" ("id_performed_evaluation", "id_goal") `
    )
    await queryRunner.query(
      `CREATE TABLE "performed_questions" ("id" int NOT NULL IDENTITY(1,1), "reply" nvarchar(255) CONSTRAINT CHK_5bedcc26bf3c68e2cde4cae84b_ENUM CHECK(reply IN ('YES','NO')), "justification" nvarchar(3000), "created_at" datetime2 NOT NULL CONSTRAINT "DF_1c76ecd524b55b3735b0186374c" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_4f2c21d702784346ee03e12aa31" DEFAULT getdate(), "id_performed_evaluation" int, "id_question" int, CONSTRAINT "PK_abe99fad9c6b69b5c4857edbbe0" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_52095697972fe13e292c592114" ON "performed_questions" ("id_performed_evaluation", "id_question") `
    )
    await queryRunner.query(
      `CREATE TABLE "performed_skills" ("id" int NOT NULL IDENTITY(1,1), "end_feedback_user" nvarchar(3000), "mid_feedback_manager" nvarchar(3000), "end_feedback_manager" nvarchar(3000), "created_at" datetime2 NOT NULL CONSTRAINT "DF_6db5a3c2009a8470b651a9f8b6a" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_23b5c30e9a6710c398f611556cf" DEFAULT getdate(), "id_performed_evaluation" int, "id_skill" int, "id_rating_user" int, "id_rating_manager" int, CONSTRAINT "PK_9a6e394422e6177a46bd8284e3c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_04d5a84ab8c44c88d3b89f0fb9" ON "performed_skills" ("id_performed_evaluation", "id_skill") `
    )
    await queryRunner.query(
      `CREATE TABLE "performed_evaluations" ("id" int NOT NULL IDENTITY(1,1), "grade" float, "mid_finished" bit NOT NULL CONSTRAINT "DF_eb82eeb49b3823530d58bd0db50" DEFAULT 0, "end_finished" bit NOT NULL CONSTRAINT "DF_222b466a8e5c0e11daf0425fd5f" DEFAULT 0, "created_at" datetime2 NOT NULL CONSTRAINT "DF_2e4f460f2cad399d7623705e99d" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_f3d54a566ece0f839f452699618" DEFAULT getdate(), "id_evaluation" int, "id_user" int, CONSTRAINT "PK_0b716572b41f8e173f63e111582" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_cc65fa5e66976cc5378483cb6b" ON "performed_evaluations" ("id_evaluation", "id_user") `
    )
    await queryRunner.query(
      `CREATE TABLE "pdi_coachings" ("id" int NOT NULL IDENTITY(1,1), "category" nvarchar(255) CONSTRAINT CHK_1168d5ac503be88df4b1adc679_ENUM CHECK(category IN ('GROWTH','CAREER')) NOT NULL, "action" nvarchar(500) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_1e9dde513f2a71aa4064244f8cf" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_aa6dcc67e670246bc2e78c826e7" DEFAULT getdate(), "id_performed_evaluation" int, CONSTRAINT "PK_d806e471a4d99d5d7eb14bf5a79" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_635be71b8e42b432739cd17474" ON "pdi_coachings" ("id_performed_evaluation", "category", "action") `
    )
    await queryRunner.query(
      `CREATE TABLE "pages_home_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_21328e9da8ddbd1df0188a37cd_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_cf280a426ea4b104a27082064a4" DEFAULT 'BR', "title" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_b5182cb1244d8e68e6be17ff730" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_aa0d629846c91791237a2ab2a42" DEFAULT getdate(), "id_home" int, CONSTRAINT "UQ_0ab258af61992f7cc02edba5e1b" UNIQUE ("title"), CONSTRAINT "UQ_50c2b083254f7bab3a3dbd8ae89" UNIQUE ("description"), CONSTRAINT "PK_bacd77b9f4d1bff3b996aed44d8" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_592d15bb07a18011cc94a4f307" ON "pages_home_i18n" ("locale", "title") `
    )
    await queryRunner.query(
      `CREATE TABLE "pages_home" ("id" int NOT NULL IDENTITY(1,1), "hero" nvarchar(255), "created_at" datetime2 NOT NULL CONSTRAINT "DF_5c24528eca561e0f139cc714ac3" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_faaf7237417afcd2e6bffca759f" DEFAULT getdate(), "deleted_at" datetime2, "id_button" int, CONSTRAINT "PK_03991896bfb791f3d4659ff08ee" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_13821c2daf113167013a62fa58" ON "pages_home" ("id_button") WHERE "id_button" IS NOT NULL`
    )
    await queryRunner.query(
      `CREATE TABLE "pages_sign_in_i18n" ("id" int NOT NULL IDENTITY(1,1), "locale" nvarchar(255) CONSTRAINT CHK_ab8c5e8d4ddaecf1b665c00751_ENUM CHECK(locale IN ('EN','BR')) NOT NULL CONSTRAINT "DF_223d3c0ed14c2c581b7c7eba410" DEFAULT 'BR', "title" nvarchar(255) NOT NULL, "caption" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_a727e99a5f412b60abd54081f3d" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_6eb6ebae5b85de0351ad04a7a3e" DEFAULT getdate(), "id_sign_in" int, CONSTRAINT "UQ_180dfbdea9c683bc7cfbe61afc7" UNIQUE ("title"), CONSTRAINT "UQ_527b5d1999aff191ecec8dc907f" UNIQUE ("caption"), CONSTRAINT "PK_a49de5fcdc0dbfa77220502b24a" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_fb975726296c87962477722300" ON "pages_sign_in_i18n" ("locale", "title", "caption") `
    )
    await queryRunner.query(
      `CREATE TABLE "pages_sign_in" ("id" int NOT NULL IDENTITY(1,1), "logo" nvarchar(255), "created_at" datetime2 NOT NULL CONSTRAINT "DF_d1c36f43907461f12abffe334ab" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_5733efce43d5d5cc9600fdaf5fc" DEFAULT getdate(), "deleted_at" datetime2, "id_textfield_username" int, "id_textfield_password" int, "id_button" int, CONSTRAINT "PK_cf7d69284db244600aee8c8a43d" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_317853ee792edd82869bac6bbe" ON "pages_sign_in" ("id_textfield_username") WHERE "id_textfield_username" IS NOT NULL`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_a77230ded196ef0c1dbbdf4846" ON "pages_sign_in" ("id_textfield_password") WHERE "id_textfield_password" IS NOT NULL`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "REL_f99c0e17dce8be1b03185c7038" ON "pages_sign_in" ("id_button") WHERE "id_button" IS NOT NULL`
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
      `ALTER TABLE "components_text_field_i18n" ADD CONSTRAINT "FK_6a96bfffce951cbc68c885c3597" FOREIGN KEY ("id_text_field") REFERENCES "components_text_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "components_button_i18n" ADD CONSTRAINT "FK_64fb13641d5c715256c2cc15282" FOREIGN KEY ("id_button") REFERENCES "components_button"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "users_info" ADD CONSTRAINT "FK_b73a92e2defa4ab1db4b479d164" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
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
      `ALTER TABLE "departments_i18n" ADD CONSTRAINT "FK_1b521a832cee6f73988751677c5" FOREIGN KEY ("id_department") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "evaluation_result_concepts_i18n" ADD CONSTRAINT "FK_4bde171057495a4416965014dec" FOREIGN KEY ("id_evaluation_result_concept") REFERENCES "evaluation_result_concepts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "kpis" ADD CONSTRAINT "FK_799560f4cd65142a1afb2e4815f" FOREIGN KEY ("id_goal") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "kpis" ADD CONSTRAINT "FK_768ffe916f462fef573f6c0164f" FOREIGN KEY ("id_manager") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_afb400a75e6be9098ade2c77147" FOREIGN KEY ("id_evaluation") REFERENCES "evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_d61f91f0973ef3524fe22c6cc1a" FOREIGN KEY ("id_manager") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "goals" ADD CONSTRAINT "FK_e2545ee0889159f51c0df7ef9b7" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pdi_competences" ADD CONSTRAINT "FK_3c4a2ddb8b10fadb3466aa675c0" FOREIGN KEY ("id_performed_evaluation") REFERENCES "performed_evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pdi_competences" ADD CONSTRAINT "FK_b37b4712616c690b8e2691b0415" FOREIGN KEY ("id_category") REFERENCES "pdi_competences_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pdi_qualities" ADD CONSTRAINT "FK_e9f081a6014917cc878e61c5347" FOREIGN KEY ("id_performed_evaluation") REFERENCES "performed_evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_feedbacks" ADD CONSTRAINT "FK_47f5736197fe15ec5b7dfe54a99" FOREIGN KEY ("id_performed_evaluation") REFERENCES "performed_evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_feedbacks" ADD CONSTRAINT "FK_769136023a8b6fe873241492f29" FOREIGN KEY ("id_feedback") REFERENCES "feedbacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "ratings_i18n" ADD CONSTRAINT "FK_b5c7fbb20fcce8550bc26157125" FOREIGN KEY ("id_rating") REFERENCES "ratings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals_kpis" ADD CONSTRAINT "FK_2c9622ff90aed28ab466c488262" FOREIGN KEY ("id_performed_goal") REFERENCES "performed_goals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals_kpis" ADD CONSTRAINT "FK_5c4c11b25bf382d27a7278a0ff9" FOREIGN KEY ("id_kpi") REFERENCES "kpis"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals_kpis" ADD CONSTRAINT "FK_2291b31bae12ee18a435ebc3ba6" FOREIGN KEY ("id_rating_manager") REFERENCES "ratings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals" ADD CONSTRAINT "FK_99ced67a2e74ce3cc6ff04592e6" FOREIGN KEY ("id_performed_evaluation") REFERENCES "performed_evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals" ADD CONSTRAINT "FK_09127bc368c7915fee52e2adbd5" FOREIGN KEY ("id_goal") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_questions" ADD CONSTRAINT "FK_41fd46bc0f15b26c69669b2b071" FOREIGN KEY ("id_performed_evaluation") REFERENCES "performed_evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_questions" ADD CONSTRAINT "FK_e49094aa5d576a5a4b4234cee4e" FOREIGN KEY ("id_question") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_skills" ADD CONSTRAINT "FK_f0926239762a51b36f91f6a33bc" FOREIGN KEY ("id_performed_evaluation") REFERENCES "performed_evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_skills" ADD CONSTRAINT "FK_145a8d8c3aef737c06a1a135b74" FOREIGN KEY ("id_skill") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_skills" ADD CONSTRAINT "FK_c1fa964f7e4e322120789a35a75" FOREIGN KEY ("id_rating_user") REFERENCES "ratings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_skills" ADD CONSTRAINT "FK_acae7a1d191bbfe89e4ab5d67e2" FOREIGN KEY ("id_rating_manager") REFERENCES "ratings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_evaluations" ADD CONSTRAINT "FK_41c31a374e87665d55e17bbfd6f" FOREIGN KEY ("id_evaluation") REFERENCES "evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_evaluations" ADD CONSTRAINT "FK_531932210537d83460ab420ca08" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pdi_coachings" ADD CONSTRAINT "FK_ca908e050bc245650a1da93addf" FOREIGN KEY ("id_performed_evaluation") REFERENCES "performed_evaluations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_home_i18n" ADD CONSTRAINT "FK_504911b815039639d60ae27404d" FOREIGN KEY ("id_home") REFERENCES "pages_home"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_home" ADD CONSTRAINT "FK_13821c2daf113167013a62fa58e" FOREIGN KEY ("id_button") REFERENCES "components_button"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_sign_in_i18n" ADD CONSTRAINT "FK_3a71903d2e6c01687126dd1f0c0" FOREIGN KEY ("id_sign_in") REFERENCES "pages_sign_in"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_sign_in" ADD CONSTRAINT "FK_317853ee792edd82869bac6bbe7" FOREIGN KEY ("id_textfield_username") REFERENCES "components_text_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_sign_in" ADD CONSTRAINT "FK_a77230ded196ef0c1dbbdf4846e" FOREIGN KEY ("id_textfield_password") REFERENCES "components_text_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_sign_in" ADD CONSTRAINT "FK_f99c0e17dce8be1b03185c7038d" FOREIGN KEY ("id_button") REFERENCES "components_button"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "pages_sign_in" DROP CONSTRAINT "FK_f99c0e17dce8be1b03185c7038d"`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_sign_in" DROP CONSTRAINT "FK_a77230ded196ef0c1dbbdf4846e"`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_sign_in" DROP CONSTRAINT "FK_317853ee792edd82869bac6bbe7"`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_sign_in_i18n" DROP CONSTRAINT "FK_3a71903d2e6c01687126dd1f0c0"`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_home" DROP CONSTRAINT "FK_13821c2daf113167013a62fa58e"`
    )
    await queryRunner.query(
      `ALTER TABLE "pages_home_i18n" DROP CONSTRAINT "FK_504911b815039639d60ae27404d"`
    )
    await queryRunner.query(
      `ALTER TABLE "pdi_coachings" DROP CONSTRAINT "FK_ca908e050bc245650a1da93addf"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_evaluations" DROP CONSTRAINT "FK_531932210537d83460ab420ca08"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_evaluations" DROP CONSTRAINT "FK_41c31a374e87665d55e17bbfd6f"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_skills" DROP CONSTRAINT "FK_acae7a1d191bbfe89e4ab5d67e2"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_skills" DROP CONSTRAINT "FK_c1fa964f7e4e322120789a35a75"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_skills" DROP CONSTRAINT "FK_145a8d8c3aef737c06a1a135b74"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_skills" DROP CONSTRAINT "FK_f0926239762a51b36f91f6a33bc"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_questions" DROP CONSTRAINT "FK_e49094aa5d576a5a4b4234cee4e"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_questions" DROP CONSTRAINT "FK_41fd46bc0f15b26c69669b2b071"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals" DROP CONSTRAINT "FK_09127bc368c7915fee52e2adbd5"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals" DROP CONSTRAINT "FK_99ced67a2e74ce3cc6ff04592e6"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals_kpis" DROP CONSTRAINT "FK_2291b31bae12ee18a435ebc3ba6"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals_kpis" DROP CONSTRAINT "FK_5c4c11b25bf382d27a7278a0ff9"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_goals_kpis" DROP CONSTRAINT "FK_2c9622ff90aed28ab466c488262"`
    )
    await queryRunner.query(
      `ALTER TABLE "ratings_i18n" DROP CONSTRAINT "FK_b5c7fbb20fcce8550bc26157125"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_feedbacks" DROP CONSTRAINT "FK_769136023a8b6fe873241492f29"`
    )
    await queryRunner.query(
      `ALTER TABLE "performed_feedbacks" DROP CONSTRAINT "FK_47f5736197fe15ec5b7dfe54a99"`
    )
    await queryRunner.query(
      `ALTER TABLE "pdi_qualities" DROP CONSTRAINT "FK_e9f081a6014917cc878e61c5347"`
    )
    await queryRunner.query(
      `ALTER TABLE "pdi_competences" DROP CONSTRAINT "FK_b37b4712616c690b8e2691b0415"`
    )
    await queryRunner.query(
      `ALTER TABLE "pdi_competences" DROP CONSTRAINT "FK_3c4a2ddb8b10fadb3466aa675c0"`
    )
    await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_e2545ee0889159f51c0df7ef9b7"`)
    await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_d61f91f0973ef3524fe22c6cc1a"`)
    await queryRunner.query(`ALTER TABLE "goals" DROP CONSTRAINT "FK_afb400a75e6be9098ade2c77147"`)
    await queryRunner.query(`ALTER TABLE "kpis" DROP CONSTRAINT "FK_768ffe916f462fef573f6c0164f"`)
    await queryRunner.query(`ALTER TABLE "kpis" DROP CONSTRAINT "FK_799560f4cd65142a1afb2e4815f"`)
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
      `ALTER TABLE "evaluation_result_concepts_i18n" DROP CONSTRAINT "FK_4bde171057495a4416965014dec"`
    )
    await queryRunner.query(
      `ALTER TABLE "departments_i18n" DROP CONSTRAINT "FK_1b521a832cee6f73988751677c5"`
    )
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c2ef2a584021384115595a7b78e"`)
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b02459f8160c69e9c5eba1331d9"`)
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_83d9548fc459d58a7fed8160e73"`)
    await queryRunner.query(
      `ALTER TABLE "users_info" DROP CONSTRAINT "FK_b73a92e2defa4ab1db4b479d164"`
    )
    await queryRunner.query(
      `ALTER TABLE "components_button_i18n" DROP CONSTRAINT "FK_64fb13641d5c715256c2cc15282"`
    )
    await queryRunner.query(
      `ALTER TABLE "components_text_field_i18n" DROP CONSTRAINT "FK_6a96bfffce951cbc68c885c3597"`
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
    await queryRunner.query(`DROP INDEX "REL_f99c0e17dce8be1b03185c7038" ON "pages_sign_in"`)
    await queryRunner.query(`DROP INDEX "REL_a77230ded196ef0c1dbbdf4846" ON "pages_sign_in"`)
    await queryRunner.query(`DROP INDEX "REL_317853ee792edd82869bac6bbe" ON "pages_sign_in"`)
    await queryRunner.query(`DROP TABLE "pages_sign_in"`)
    await queryRunner.query(`DROP INDEX "IDX_fb975726296c87962477722300" ON "pages_sign_in_i18n"`)
    await queryRunner.query(`DROP TABLE "pages_sign_in_i18n"`)
    await queryRunner.query(`DROP INDEX "REL_13821c2daf113167013a62fa58" ON "pages_home"`)
    await queryRunner.query(`DROP TABLE "pages_home"`)
    await queryRunner.query(`DROP INDEX "IDX_592d15bb07a18011cc94a4f307" ON "pages_home_i18n"`)
    await queryRunner.query(`DROP TABLE "pages_home_i18n"`)
    await queryRunner.query(`DROP INDEX "IDX_635be71b8e42b432739cd17474" ON "pdi_coachings"`)
    await queryRunner.query(`DROP TABLE "pdi_coachings"`)
    await queryRunner.query(
      `DROP INDEX "IDX_cc65fa5e66976cc5378483cb6b" ON "performed_evaluations"`
    )
    await queryRunner.query(`DROP TABLE "performed_evaluations"`)
    await queryRunner.query(`DROP INDEX "IDX_04d5a84ab8c44c88d3b89f0fb9" ON "performed_skills"`)
    await queryRunner.query(`DROP TABLE "performed_skills"`)
    await queryRunner.query(`DROP INDEX "IDX_52095697972fe13e292c592114" ON "performed_questions"`)
    await queryRunner.query(`DROP TABLE "performed_questions"`)
    await queryRunner.query(`DROP INDEX "IDX_0b194c54fc750b56ffebd438a6" ON "performed_goals"`)
    await queryRunner.query(`DROP TABLE "performed_goals"`)
    await queryRunner.query(`DROP TABLE "performed_goals_kpis"`)
    await queryRunner.query(`DROP TABLE "ratings"`)
    await queryRunner.query(`DROP INDEX "IDX_634a9afb9cdf135598eaf6045c" ON "ratings_i18n"`)
    await queryRunner.query(`DROP TABLE "ratings_i18n"`)
    await queryRunner.query(`DROP INDEX "IDX_ae3696de35a5c966f103c68a21" ON "performed_feedbacks"`)
    await queryRunner.query(`DROP TABLE "performed_feedbacks"`)
    await queryRunner.query(`DROP TABLE "pdi_qualities"`)
    await queryRunner.query(`DROP INDEX "IDX_673a5b998dd429d67f8c7503cc" ON "pdi_competences"`)
    await queryRunner.query(`DROP TABLE "pdi_competences"`)
    await queryRunner.query(`DROP TABLE "pdi_competences_categories"`)
    await queryRunner.query(`DROP TABLE "media"`)
    await queryRunner.query(`DROP INDEX "IDX_c389d32efed3578a02b5c86458" ON "goals"`)
    await queryRunner.query(`DROP TABLE "goals"`)
    await queryRunner.query(`DROP INDEX "IDX_d339ae0c66697e951248e92948" ON "kpis"`)
    await queryRunner.query(`DROP TABLE "kpis"`)
    await queryRunner.query(`DROP INDEX "IDX_9f5b5463df9c534efe9eaf0065" ON "evaluations"`)
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
    await queryRunner.query(
      `DROP INDEX "IDX_a07676a8e0fc4c858c68956f71" ON "evaluation_result_concepts_i18n"`
    )
    await queryRunner.query(`DROP TABLE "evaluation_result_concepts_i18n"`)
    await queryRunner.query(
      `DROP INDEX "IDX_66df05e691ae1633fa2a4628ba" ON "evaluation_result_concepts"`
    )
    await queryRunner.query(`DROP TABLE "evaluation_result_concepts"`)
    await queryRunner.query(`DROP INDEX "IDX_3f1543c59b45769b941cb5cef5" ON "departments_i18n"`)
    await queryRunner.query(`DROP TABLE "departments_i18n"`)
    await queryRunner.query(`DROP TABLE "departments"`)
    await queryRunner.query(`DROP INDEX "REL_83d9548fc459d58a7fed8160e7" ON "users"`)
    await queryRunner.query(`DROP INDEX "IDX_772886e2f1f47b9ceb04a06e20" ON "users"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP INDEX "REL_b73a92e2defa4ab1db4b479d16" ON "users_info"`)
    await queryRunner.query(`DROP TABLE "users_info"`)
    await queryRunner.query(
      `DROP INDEX "IDX_f82ed92747c5e696a37f1d1348" ON "components_button_i18n"`
    )
    await queryRunner.query(`DROP TABLE "components_button_i18n"`)
    await queryRunner.query(`DROP TABLE "components_button"`)
    await queryRunner.query(`DROP TABLE "components_text_field"`)
    await queryRunner.query(
      `DROP INDEX "IDX_68d839702aeba43a6ccca1ed55" ON "components_text_field_i18n"`
    )
    await queryRunner.query(`DROP TABLE "components_text_field_i18n"`)
  }
}

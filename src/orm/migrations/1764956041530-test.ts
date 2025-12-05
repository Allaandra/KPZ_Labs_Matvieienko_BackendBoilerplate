import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1764956041530 implements MigrationInterface {
  name = 'test1764956041530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "kindergarten_group" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "child_count" integer NOT NULL DEFAULT '0',
                CONSTRAINT "UQ_35a281839f8cc1d553fd2d6a230" UNIQUE ("name"),
                CONSTRAINT "PK_1d6c99fe85a044b013a8faa9282" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "child" (
                "id" SERIAL NOT NULL,
                "first_name" character varying(100) NOT NULL,
                "last_name" character varying(100) NOT NULL,
                "patronymic" character varying(100),
                "birthday_date" date NOT NULL,
                "groups_id" integer,
                CONSTRAINT "PK_4609b9b323ca37c6bc435ec4b6b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying(100) NOT NULL,
                "password" character varying NOT NULL,
                "username" character varying(40),
                "name" character varying(40),
                "role" character varying(30) NOT NULL DEFAULT 'STANDARD',
                "language" character varying(15) NOT NULL DEFAULT 'en-US',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "child"
            ADD CONSTRAINT "FK_7750656f3c5829f10e5cc2218f5" FOREIGN KEY ("groups_id") REFERENCES "kindergarten_group"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "child" DROP CONSTRAINT "FK_7750656f3c5829f10e5cc2218f5"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "child"
        `);
    await queryRunner.query(`
            DROP TABLE "kindergarten_group"
        `);
  }
}

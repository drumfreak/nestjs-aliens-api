import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1665165935255 implements MigrationInterface {
  name = 'initial1665165935255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`roles\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`email\` varchar(255) NOT NULL,
                \`firstName\` varchar(255) NULL,
                \`lastName\` varchar(255) NULL,
                \`password\` varchar(255) NULL,
                \`passwordTemporary\` varchar(255) NULL,
                \`passwordTemporarySet\` tinyint NOT NULL DEFAULT '0',
                \`forcePasswordChange\` tinyint NOT NULL DEFAULT '0',
                \`userResetToken\` varchar(255) NULL,
                \`lastPasswordResetDate\` datetime NULL,
                \`userRoleId\` int NULL,
                \`userSettings\` json NULL,
                \`lastLoginDate\` datetime NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_a52455e2cef06f0a3faf30f96a3\` FOREIGN KEY (\`userRoleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a52455e2cef06f0a3faf30f96a3\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\`
        `);
    await queryRunner.query(`
            DROP TABLE \`users\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\`
        `);
    await queryRunner.query(`
            DROP TABLE \`roles\`
        `);
  }
}

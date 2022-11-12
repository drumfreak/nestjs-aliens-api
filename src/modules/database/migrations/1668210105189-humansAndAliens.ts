import { MigrationInterface, QueryRunner } from "typeorm";

export class humansAndAliens1668210105189 implements MigrationInterface {
    name = 'humansAndAliens1668210105189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`spaceships\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NULL,
                \`description\` text NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`planets\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NULL,
                \`description\` text NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`humans\` DROP COLUMN \`name\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`locations\`
            ADD \`humanId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`humans\`
            ADD \`firstName\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`humans\`
            ADD \`lastName\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`aliens\`
            ADD \`planetId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`aliens\`
            ADD \`spaceshipId\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`locations\`
            ADD CONSTRAINT \`FK_2acff4c6610ec5a5db006df5ca1\` FOREIGN KEY (\`humanId\`) REFERENCES \`humans\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aliens\`
            ADD CONSTRAINT \`FK_2b49bebc51cd839e4c41a4f1c90\` FOREIGN KEY (\`planetId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`aliens\`
            ADD CONSTRAINT \`FK_8da802471db4eb8c4cd212f9038\` FOREIGN KEY (\`spaceshipId\`) REFERENCES \`spaceships\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`aliens\` DROP FOREIGN KEY \`FK_8da802471db4eb8c4cd212f9038\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aliens\` DROP FOREIGN KEY \`FK_2b49bebc51cd839e4c41a4f1c90\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`locations\` DROP FOREIGN KEY \`FK_2acff4c6610ec5a5db006df5ca1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aliens\` DROP COLUMN \`spaceshipId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`aliens\` DROP COLUMN \`planetId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`humans\` DROP COLUMN \`lastName\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`humans\` DROP COLUMN \`firstName\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`locations\` DROP COLUMN \`humanId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`humans\`
            ADD \`name\` varchar(255) NULL
        `);
        await queryRunner.query(`
            DROP TABLE \`planets\`
        `);
        await queryRunner.query(`
            DROP TABLE \`spaceships\`
        `);
    }

}

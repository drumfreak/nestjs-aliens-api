import { MigrationInterface, QueryRunner } from "typeorm";

export class basicLoadIn1668208268444 implements MigrationInterface {
    name = 'basicLoadIn1668208268444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`abductions\` (
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
            CREATE TABLE \`aliens\` (
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
            CREATE TABLE \`humans\` (
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
            CREATE TABLE \`locations\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NULL,
                \`description\` text NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`locations\`
        `);
        await queryRunner.query(`
            DROP TABLE \`humans\`
        `);
        await queryRunner.query(`
            DROP TABLE \`aliens\`
        `);
        await queryRunner.query(`
            DROP TABLE \`abductions\`
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class abductions1668208652297 implements MigrationInterface {
    name = 'abductions1668208652297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`abductions_aliens_aliens\` (
                \`abductionsId\` int NOT NULL,
                \`aliensId\` int NOT NULL,
                INDEX \`IDX_a86d4ce022d51eabe15bc456c4\` (\`abductionsId\`),
                INDEX \`IDX_69d5bef12347fbfa610cfe6a8a\` (\`aliensId\`),
                PRIMARY KEY (\`abductionsId\`, \`aliensId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`abductions_humans_humans\` (
                \`abductionsId\` int NOT NULL,
                \`humansId\` int NOT NULL,
                INDEX \`IDX_25277b291920326435ab513b7e\` (\`abductionsId\`),
                INDEX \`IDX_122bb060012fab190069d49e7e\` (\`humansId\`),
                PRIMARY KEY (\`abductionsId\`, \`humansId\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions\`
            ADD \`abductionDate\` timestamp NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions\`
            ADD \`didItHurt\` tinyint NOT NULL DEFAULT 0
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions_aliens_aliens\`
            ADD CONSTRAINT \`FK_a86d4ce022d51eabe15bc456c45\` FOREIGN KEY (\`abductionsId\`) REFERENCES \`abductions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions_aliens_aliens\`
            ADD CONSTRAINT \`FK_69d5bef12347fbfa610cfe6a8a0\` FOREIGN KEY (\`aliensId\`) REFERENCES \`aliens\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions_humans_humans\`
            ADD CONSTRAINT \`FK_25277b291920326435ab513b7e9\` FOREIGN KEY (\`abductionsId\`) REFERENCES \`abductions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions_humans_humans\`
            ADD CONSTRAINT \`FK_122bb060012fab190069d49e7e8\` FOREIGN KEY (\`humansId\`) REFERENCES \`humans\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`abductions_humans_humans\` DROP FOREIGN KEY \`FK_122bb060012fab190069d49e7e8\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions_humans_humans\` DROP FOREIGN KEY \`FK_25277b291920326435ab513b7e9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions_aliens_aliens\` DROP FOREIGN KEY \`FK_69d5bef12347fbfa610cfe6a8a0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions_aliens_aliens\` DROP FOREIGN KEY \`FK_a86d4ce022d51eabe15bc456c45\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions\` DROP COLUMN \`didItHurt\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`abductions\` DROP COLUMN \`abductionDate\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_122bb060012fab190069d49e7e\` ON \`abductions_humans_humans\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_25277b291920326435ab513b7e\` ON \`abductions_humans_humans\`
        `);
        await queryRunner.query(`
            DROP TABLE \`abductions_humans_humans\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_69d5bef12347fbfa610cfe6a8a\` ON \`abductions_aliens_aliens\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_a86d4ce022d51eabe15bc456c4\` ON \`abductions_aliens_aliens\`
        `);
        await queryRunner.query(`
            DROP TABLE \`abductions_aliens_aliens\`
        `);
    }

}

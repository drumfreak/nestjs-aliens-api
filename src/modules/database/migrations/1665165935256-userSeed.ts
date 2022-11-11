import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1665165935256 implements MigrationInterface {
  name = 'initial1665165935256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('User Migration creating role Admin....');
    await queryRunner.query(`INSERT INTO roles (name) VALUES('Admin')`);

    console.log(
      'User Migration creating User admin@nestbuilder.io with pass nestbuilder',
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, userRoleId, firstName, lastName) VALUES('admin@nestbuilder.io', '$2b$08$xqwh2o9sEYoxRAXa2tl4muwRd3hGRc8t0tpR.zynv3vVyIoi70vte', 1, 'Admin', 'User')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('User Migration reverting Admin....');
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await queryRunner.query(`TRUNCATE roles`);
    await queryRunner.query(`TRUNCATE users`);
    await queryRunner.query(`SET FOREIGN_KEY_CHECKS = 1`);
    console.log('User Migration reverted User admin@nestbuilder.io');
  }
}

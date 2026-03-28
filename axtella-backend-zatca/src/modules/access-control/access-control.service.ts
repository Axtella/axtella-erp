import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AccessControlService {
  constructor(private readonly dataSource: DataSource) {}

  async getRolesForUser(userId: string): Promise<string[]> {
    const rows = await this.dataSource.query(
      `
      SELECT r.code
      FROM roles r
      INNER JOIN user_roles ur ON ur.role_id = r.id
      WHERE ur.user_id = $1
      ORDER BY r.code ASC
      `,
      [userId],
    );

    return rows.map((row: { code: string }) => row.code);
  }

  async getPermissionsForUser(userId: string): Promise<string[]> {
    const rows = await this.dataSource.query(
      `
      SELECT DISTINCT p.code
      FROM permissions p
      INNER JOIN role_permissions rp ON rp.permission_id = p.id
      INNER JOIN user_roles ur ON ur.role_id = rp.role_id
      WHERE ur.user_id = $1
      ORDER BY p.code ASC
      `,
      [userId],
    );

    return rows.map((row: { code: string }) => row.code);
  }
}

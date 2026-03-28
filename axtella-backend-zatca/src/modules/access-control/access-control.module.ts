import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlService } from './access-control.service';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { UserRoleEntity } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity, UserRoleEntity, RolePermissionEntity])],
  providers: [AccessControlService],
  exports: [AccessControlService, TypeOrmModule],
})
export class AccessControlModule {}

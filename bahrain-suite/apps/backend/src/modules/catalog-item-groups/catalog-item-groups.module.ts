import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogItemGroup } from './entities/catalog-item-group.entity';
import { CatalogItemGroupsService } from './catalog-item-groups.service';
import { CatalogItemGroupsController } from './catalog-item-groups.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogItemGroup])],
  controllers: [CatalogItemGroupsController],
  providers: [CatalogItemGroupsService],
  exports: [TypeOrmModule, CatalogItemGroupsService],
})
export class CatalogItemGroupsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogItemGroup } from '../catalog-item-groups/entities/catalog-item-group.entity';
import { CatalogItem } from './entities/catalog-item.entity';
import { CatalogItemsService } from './catalog-items.service';
import { CatalogItemsController } from './catalog-items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogItem, CatalogItemGroup])],
  controllers: [CatalogItemsController],
  providers: [CatalogItemsService],
  exports: [TypeOrmModule, CatalogItemsService],
})
export class CatalogItemsModule {}

import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsGateway } from './items.gateway';

@Module({
  providers: [ItemsGateway, ItemsService],
})
export class ItemsModule {}

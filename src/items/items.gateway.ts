import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../permissions.decorator';
import { SocketGuard } from '../socket-guard';
import { PermissionsGuard } from '../permissions.guard';

@WebSocketGateway()
export class ItemsGateway {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(AuthGuard('jwt'), SocketGuard)
  @Permissions('create:items')
  @SubscribeMessage('createItem')
  create(@MessageBody() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @SubscribeMessage('findAllItems')
  findAll() {
    return this.itemsService.findAll();
  }

  @SubscribeMessage('findOneItem')
  findOne(@MessageBody() id: number) {
    return this.itemsService.findOne(id);
  }

  @UseGuards(SocketGuard)
  @Permissions('update:items')
  @SubscribeMessage('updateItem')
  update(@MessageBody() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(updateItemDto.id, updateItemDto);
  }
  @UseGuards(SocketGuard)
  @Permissions('delete:items')
  @SubscribeMessage('removeItem')
  remove(@MessageBody() id: number) {
    return this.itemsService.remove(id);
  }
}

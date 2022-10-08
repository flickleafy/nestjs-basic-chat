import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join } from 'path';
import { AuthzModule } from './authz/authz.module';
import { ItemsModule } from './items/items.module';
const opt: ServeStaticModuleOptions = {
  rootPath: join(__dirname, '..', 'client'),
};

@Module({
  imports: [ServeStaticModule.forRoot(opt), EventsModule, AuthzModule, ItemsModule],
})
export class AppModule {}

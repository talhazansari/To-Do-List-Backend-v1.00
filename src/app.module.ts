import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ItemSchema} from './schema/item.schema'
import { ItemService } from './item/item.service';
import { ItemController} from './item/item.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {dbName:'Items'}),
    MongooseModule.forFeature([{name:'Item', schema:ItemSchema}])
  ],
  controllers: [AppController,ItemController],
  providers: [AppService, ItemService],
})
export class AppModule {}

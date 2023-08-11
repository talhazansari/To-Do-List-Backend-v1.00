import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';

@Schema()

export class Item
{
    @Prop()
    description:string;
    @Prop()
    status: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
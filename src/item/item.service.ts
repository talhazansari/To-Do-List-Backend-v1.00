import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from 'src/dto/create-item.dto';
import { UpdateItemDto } from 'src/dto/update-item.dto';
import { IStudent } from 'src/interface/student.interface';
@Injectable()
export class ItemService {
  constructor(@InjectModel('Item') private itemModel: Model<IStudent>) {}

  async createItem(dtoCI: CreateItemDto): Promise<IStudent> {
    const newItem = await new this.itemModel(dtoCI).save();
    return newItem;
  }
  async getAllItems(): Promise<IStudent[]> {
    const itemData = await this.itemModel.find();
    if (!itemData || itemData.length == 0) {
      throw new NotFoundException('Item Data Not Found');
    }
    return itemData;
  }
  async getItem(itemDescription: string): Promise<IStudent> {
    const existingItem = await this.itemModel.findById(itemDescription);
    if (!existingItem)
      throw new NotFoundException('Item ${itemDescription} not found');
    return existingItem;
  }
  async deleteStudent(itemDescription: string): Promise<IStudent> {
    const deletedItem = await this.itemModel.findByIdAndDelete(itemDescription);
    if (!deletedItem) {
      throw new NotFoundException('Item #${itemId} not found');
    }
    return deletedItem;
  }

  async updateItem(
    itemDescription: string,
    updateItemdto: UpdateItemDto,
  ): Promise<IStudent> {
    const updatedItem = await this.itemModel.findByIdAndUpdate(
      itemDescription,
      updateItemdto,
      { new: true },
    );
    if (!updatedItem) {
      throw new NotFoundException('Item #${ItemDescription} not found');
    }
    return updatedItem;
  }
}

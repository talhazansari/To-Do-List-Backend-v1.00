import {
  Controller,
  Post,
  Put,
  Res,
  Param,
  HttpStatus,
  Delete,
  Get,
  Body,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { response } from 'express';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from 'src/dto/update-item.dto';

@Controller('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async createItem(@Res() response, @Body() createItemDto: CreateItemDto) {
    try {
      const newItem = await this.itemService.createItem(createItemDto);
      return response.status(HttpStatus.OK).json({
        message: 'Data Created Successfully',
        newItem,
      });
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ statusCode: 400, message: 'Error ITem Not Created' });
    }
  }

  @Delete('/:id')
  async deleteItem(@Res() response, @Param('id') itemDescription: string) {
    try {
      const deleteStudent = await this.itemService.deleteStudent(
        itemDescription,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Data Deleted Successfully',
        deleteStudent,
      });
    } catch (error) {}
  }

  @Get()
  async getItems(@Res() response) {
    try {
      const itemData = await this.itemService.getAllItems();
      return response.status(HttpStatus.OK).json({
        message: 'All items found',
        itemData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/:id')
  async updateItem(
    @Res() response,
    @Param('id') itemDescription: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    try {
      const existingStudent = await this.itemService.updateItem(
        itemDescription,
        updateItemDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Data Updated Successfully',
        existingStudent,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}

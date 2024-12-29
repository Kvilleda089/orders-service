import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from '../services/orders/orders.service';
import { OrderStatus } from '../entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder(
    @Body('customerName') customerName: string,
    @Body('totalAmount') totalAmount: number,
  ) {
    return await this.orderService.createOrder(customerName, totalAmount);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Put(':id/status')
  async updateOrder(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    return this.orderService.updateOrder(id, status);
  }

  @Delete(':id')
  async DeleteOrderCommand(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}

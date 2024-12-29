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
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { OrderResponseDTO } from '../dtos/order-response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createDto: CreateOrderDTO,
  ): Promise<OrderResponseDTO> {
    const order = await this.orderService.createOrder(createDto);
    return new OrderResponseDTO(order);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<OrderResponseDTO> {
    const order = await this.orderService.getOrderById(id);
    return new OrderResponseDTO(order);
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
    return this.orderService.updateOrderStatus(id, status);
  }

  @Delete(':id')
  async DeleteOrderCommand(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }
}

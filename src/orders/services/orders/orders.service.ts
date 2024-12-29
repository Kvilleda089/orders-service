import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from 'src/orders/commands/implementations/create-order.command';
import { DeleteOrderCommand } from 'src/orders/commands/implementations/delete-order.command';
import { UpdateOrderCommand } from 'src/orders/commands/implementations/update-order.command';
import { Order, OrderStatus } from 'src/orders/entities/order.entity';
import { GetOrderByIdQuery } from 'src/orders/queries/implementations/get-order-by-id.query';
import { GetOrdersQuery } from 'src/orders/queries/implementations/get-orders.query';

@Injectable()
export class OrdersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createOrder(customerName: string, totalAmount: number): Promise<Order> {
    const command = new CreateOrderCommand(customerName, totalAmount);
    return await this.commandBus.execute(command);
  }

  async getOrderById(id: string): Promise<Order> {
    const query = new GetOrderByIdQuery(id);
    return await this.queryBus.execute(query);
  }

  async getAllOrders(): Promise<Order[]> {
    const query = new GetOrdersQuery();
    return await this.queryBus.execute(query);
  }

  async updateOrder(id: string, status: OrderStatus): Promise<Order> {
    const command = new UpdateOrderCommand(id, status);
    return await this.commandBus.execute(command);
  }

  async deleteOrder(id: string): Promise<void> {
    const command = new DeleteOrderCommand(id);
    return await this.commandBus.execute(command);
  }
}

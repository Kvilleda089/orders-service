import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from '../implementations/get-orders.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetOrdersQuery)
export class GetAllOrdersQuery implements IQueryHandler<GetOrdersQuery> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async execute(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
}

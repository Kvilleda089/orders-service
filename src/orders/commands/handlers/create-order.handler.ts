import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../implementations/create-order.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    const { customerName, totalAmount } = command.createOrderDto;

    const order = this.orderRepository.create({ customerName, totalAmount });
    return await this.orderRepository.save(order);
  }
}

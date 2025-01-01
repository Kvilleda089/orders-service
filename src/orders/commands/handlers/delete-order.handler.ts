import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrderCommand } from '../implementations/delete-order.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async execute(command: DeleteOrderCommand): Promise<void> {
    const { id } = command;

    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order whit ID ${id} not found`);
    }

    await this.orderRepository.remove(order);
  }
}

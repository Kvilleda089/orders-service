import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderStatusCommand } from '../implementations/update-order-status.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from '../../entities/order.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler
  implements ICommandHandler<UpdateOrderStatusCommand>
{
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async execute(command: UpdateOrderStatusCommand): Promise<Order> {
    const { id, status } = command;
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      console.log(order);
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (!Object.values(OrderStatus).includes(status)) {
      throw new BadRequestException(`Invalid order satatus: ${status}`);
    }

    order.status = status;
    return await this.orderRepository.save(order);
  }
}

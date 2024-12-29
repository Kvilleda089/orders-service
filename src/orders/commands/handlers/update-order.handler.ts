import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from '../implementations/update-order.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async execute(command: UpdateOrderCommand): Promise<any> {
    const { id, status } = command;
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    if (!Object.values(OrderStatus).includes(status)) {
      throw new Error(`Invalid order satatus: ${status}`);
    }

    order.status = status;
    return await this.orderRepository.save(order);
  }
}

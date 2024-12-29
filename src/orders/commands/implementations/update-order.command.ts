import { OrderStatus } from 'src/orders/entities/order.entity';

export class UpdateOrderCommand {
  constructor(
    public readonly id: string,
    public readonly status: OrderStatus,
  ) {}
}

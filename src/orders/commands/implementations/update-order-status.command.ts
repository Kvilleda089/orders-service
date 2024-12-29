import { OrderStatus } from 'src/orders/entities/order.entity';

export class UpdateOrderStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: OrderStatus,
  ) {}
}

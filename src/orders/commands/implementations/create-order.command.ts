import { CreateOrderDTO } from 'src/orders/dtos/create-order.dto';

export class CreateOrderCommand {
  constructor(public readonly createOrderDto: CreateOrderDTO) {}
}

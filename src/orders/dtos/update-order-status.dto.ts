import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class UpdateOrderStatusDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}

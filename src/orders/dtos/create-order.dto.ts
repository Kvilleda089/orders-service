import { IsNotEmpty, IsNumber } from 'class-validator';
import { isGreatThanZero } from '../decorator/non-zero-amount.validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  customerName: string;

  @IsNumber()
  @isGreatThanZero({ message: 'Total Amount must be greater than 0' })
  totalAmount: number;
}

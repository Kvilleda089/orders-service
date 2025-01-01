import { IsNotEmpty, IsNumber } from 'class-validator';
import { isGreatThanZero } from '../decorator/non-zero-amount.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({ description: 'The name of the customer' })
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: 'The total amount for the order' })
  @IsNumber()
  @isGreatThanZero({ message: 'Total Amount must be greater than 0' })
  totalAmount: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class OrderResponseDTO {
  @ApiProperty({ description: 'The unique identifier of the order' })
  id: string;

  @ApiProperty({ description: 'The name of the customer' })
  customerName: string;

  @ApiProperty({ description: 'The date the order was placed' })
  orderDate: Date;

  @ApiProperty({ description: 'The total amount for the order' })
  totalAmount: number;

  @ApiProperty({ description: 'The status of the order' })
  status: string;

  constructor(partial: Partial<OrderResponseDTO>) {
    Object.assign(this, partial);
  }
}

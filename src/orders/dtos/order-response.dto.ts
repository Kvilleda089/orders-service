export class OrderResponseDTO {
  id: string;
  customerName: string;
  orderDate: Date;
  totalAmount: number;
  status: string;

  constructor(partial: Partial<OrderResponseDTO>) {
    Object.assign(this, partial);
  }
}

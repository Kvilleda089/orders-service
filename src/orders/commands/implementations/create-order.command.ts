export class CreateOrderCommand {
  constructor(
    public readonly customerName: string,
    public readonly totalAmount: number,
  ) {}
}

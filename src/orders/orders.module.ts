import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersController } from './controllers//orders.controller';
import { OrdersService } from './services/orders/orders.service';
import { CreateOrderHandler } from './commands/handlers/create-order.handler';
import { DeleteOrderHandler } from './commands/handlers/delete-order.handler';
import { UpdateOrderHandler } from './commands/handlers/update-order.handler';
import { GetOrderByIdHandler } from './queries/handlers/get-order-by-id.handler';
import { GetOrdersHandler } from './queries/handlers/get-orders.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CqrsModule],
  providers: [
    OrdersService,
    CreateOrderHandler,
    DeleteOrderHandler,
    UpdateOrderHandler,
    GetOrderByIdHandler,
    GetOrdersHandler,
  ],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}

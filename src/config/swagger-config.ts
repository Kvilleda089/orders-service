import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { orderExample } from '../documents/example/order-example';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('API Orders-service')
    .setDescription('API for order management and handling')
    .setVersion('1.0')
    .addTag('orders')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  addExamplesToSwagger(document);
}

function addExamplesToSwagger(document: any) {
  document.paths['/orders'] = {
    get: {
      summary: 'Obtener lista de ordenes',
      responses: {
        200: {
          description: 'Lista de órdenes obtenida con éxito',
          content: {
            'application/json': {
              example: [orderExample],
            },
          },
        },
      },
    },

    post: {
      summary: 'Crear una nueva orden',
      requestBody: {
        description: 'Cuerpo de la solicitud para crear una orden',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                customerName: {
                  type: 'string',
                  example: 'Juan Pérez',
                },
                totalAmount: {
                  type: 'number',
                  example: 100.0,
                },
              },
              required: ['customerName', 'totalAmount'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Orden creada con éxito',
          content: {
            'application/json': {
              example: orderExample,
            },
          },
        },
        400: {
          description: 'Error de solicitud - Datos inválidos',
          content: {
            'application/json': {
              examples: {
                customerNameMissing: {
                  value: {
                    statusCode: 400,
                    timestamp: '2025-01-01T21:01:46.607Z',
                    path: '/orders',
                    message: {
                      message: ['customerName should not be empty'],
                      error: 'Bad Request',
                      statusCode: 400,
                    },
                  },
                },
                totalAmountMissing: {
                  value: {
                    statusCode: 400,
                    timestamp: '2025-01-01T21:38:13.436Z',
                    path: '/orders',
                    message: {
                      message: [
                        'Total Amount must be greater than 0',
                        'totalAmount must be a number conforming to the specified constraints',
                      ],
                      error: 'Bad Request',
                      statusCode: 400,
                    },
                  },
                },
                totalAmountInvalid: {
                  value: {
                    statusCode: 400,
                    timestamp: '2025-01-01T21:38:13.436Z',
                    path: '/orders',
                    message: {
                      message: [
                        'Total Amount must be greater than 0',
                        'totalAmount must be a number conforming to the specified constraints',
                      ],
                      error: 'Bad Request',
                      statusCode: 400,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  document.paths['/orders/{id}'] = {
    get: {
      summary: 'Obtener orden por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID de la orden',
          required: true,
          schema: {
            type: 'string',
            example: 'f0f71bab-dace-4af9-a40a-985f75209724', // ID de ejemplo
          },
        },
      ],
      responses: {
        200: {
          description: 'Orden obtenida con éxito',
          content: {
            'application/json': {
              example: {
                id: 'f0f71bab-dace-4af9-a40a-985f75209724',
                customerName: 'Pedro Pazcal',
                orderDate: '2025-01-02T01:38:57.476Z',
                totalAmount: '32103.3',
                status: 'COMPLETED',
              },
            },
          },
        },
        404: {
          description: 'Orden no encontrada',
          content: {
            'application/json': {
              example: {
                statusCode: 404,
                timestamp: '2025-01-01T21:30:23.134Z',
                path: '/orders/f0f71bab-dace-4af9-a40a-985f75209722',
                message: {
                  message:
                    'Order with ID f0f71bab-dace-4af9-a40a-985f75209722 not found',
                  error: 'Not Found',
                  statusCode: 404,
                },
              },
            },
          },
        },
      },
    },
  };

  document.paths['/orders/{id}/status'] = {
    put: {
      summary: 'Actualizar estado de una orden',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID de la orden',
          required: true,
          schema: {
            type: 'string',
            example: 'bd84b2e1-e4a7-4c4e-b17a-90005c7e143c',
          },
        },
        {
          name: 'status',
          in: 'body',
          description: 'Nuevo estado de la orden',
          required: true,
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
                example: 'COMPLETED',
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: 'Orden actualizada con éxito',
          content: {
            'application/json': {
              example: {
                id: 'bd84b2e1-e4a7-4c4e-b17a-90005c7e143c',
                customerName: 'Juan Perez',
                orderDate: '2024-12-29T22:42:28.926Z',
                totalAmount: '100.3',
                status: 'COMPLETED',
              },
            },
          },
        },
        400: {
          description: 'Error de solicitud - Estado inválido',
          content: {
            'application/json': {
              example: {
                statusCode: 400,
                timestamp: '2025-01-01T21:06:45.917Z',
                path: '/orders/bd84b2e1-e4a7-4c4e-b17a-90005c7e143c/status',
                message: {
                  message: 'Invalid order status: completado',
                  error: 'Bad Request',
                  statusCode: 400,
                },
              },
            },
          },
        },

        404: {
          description: 'Error de solicitud - Not Found ID',
          content: {
            'application/json': {
              example: {
                statusCode: 400,
                timestamp: '2025-01-01T21:06:45.917Z',
                path: '/orders/f0f71bab-dace-4af9-a40a-985f75209722/status',
                message: {
                  message:
                    'Order with ID f0f71bab-dace-4af9-a40a-985f75209722 not found',
                  error: 'Bad Request',
                  statusCode: 404,
                },
              },
            },
          },
        },
      },
    },
  };
}

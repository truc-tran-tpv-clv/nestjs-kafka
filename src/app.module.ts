import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { faker } from '@faker-js/faker';

console.log('🚀debug CONSUMER_GROUP_ID🚀', process.env.CONSUMER_GROUP_ID);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: `client-${faker.string.uuid()}`,
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: process.env.CONSUMER_GROUP_ID,
          },
          run: {
            autoCommit: true,
          },
          subscribe: {
            fromBeginning: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

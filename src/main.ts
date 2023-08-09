import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  KafkaOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const microServiceKafka: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
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
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      ...microServiceKafka,
    },
  );

  await app.listen();
}
bootstrap();

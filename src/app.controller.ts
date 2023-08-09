import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private client: ClientKafka) {}

  @EventPattern('product.create')
  async subscribe(@Payload() data: any, @Ctx() context: KafkaContext) {
    const { offset } = context.getMessage();
    const partition = context.getPartition();
    const topic = context.getTopic();

    console.log(
      '🚀debug consume message🚀',
      JSON.stringify({ data, offset, partition, topic }, null, 4),
    );

    // implementation

    // logic

    // await context
    //   .getConsumer()
    //   .commitOffsets([
    //     { topic, partition, offset: (Number(offset) + 1).toString() },
    //   ])
    //   .catch((error) => console.error(error));
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('debug connect kafka success');
  }
}

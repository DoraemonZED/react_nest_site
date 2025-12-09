import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      inject: [ConfigService],
      provide: 'REDIS_CLIENT',
      useFactory: async (config: ConfigService) => {
        const client = createClient({
          url: config.get('redis.url'),
        });
        await client.connect();
        return client;
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}

import { Module } from '@nestjs/common';
import { RecurrencesController } from './recurrences.controller';

@Module({
  controllers: [RecurrencesController]
})
export class RecurrencesModule {}

import { Module } from '@nestjs/common';
import { FeesService } from '../services/fees.service';
import { FeesController } from '../controllers/fees.controller';

@Module({
  providers: [FeesService],
  controllers: [FeesController],
})
export class FeesModule {}

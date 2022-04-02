import { Module } from '@nestjs/common';
import { FeesService } from '../services/fees.service';
import { FeesController } from '../controllers/fees.controller';
import { PrismaService } from 'src/services/prisma.service';
import { ErrorService } from 'src/services/error.service';

@Module({
  providers: [FeesService, PrismaService, ErrorService],
  controllers: [FeesController],
})
export class FeesModule {}

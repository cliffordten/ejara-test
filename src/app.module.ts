import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeesModule } from './fees/fees.module';

@Module({
  imports: [FeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

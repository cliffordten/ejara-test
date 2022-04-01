import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FeesModule } from './fees/fees.module';

@Module({
  imports: [FeesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

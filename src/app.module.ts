import { Module } from '@nestjs/common';
import { FeesModule } from './modules/fees.module';

@Module({
  imports: [FeesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

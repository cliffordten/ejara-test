import { Controller, Get, Param } from '@nestjs/common';
import { ResultHistoryModel, ResultModel } from './fees.model';
import { FeesService } from './fees.service';

@Controller('fees')
export class FeesController {
  constructor(private readonly feeService: FeesService) {}

  @Get('/latest')
  async getLatestBlockFee(): Promise<ResultModel> {
    return await this.feeService.computeReqResult();
  }

  @Get('/requestHistory')
  getRequestHistory(): { history: ResultHistoryModel[] } {
    return { history: this.feeService.getResultHistory() };
  }

  @Get(':block_number')
  async getBlockFee(
    @Param('block_number') blockNumber: string,
  ): Promise<ResultModel> {
    return await this.feeService.computeReqResult(blockNumber);
  }
}

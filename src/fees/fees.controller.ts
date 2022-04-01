import { Controller, Get, Param } from '@nestjs/common';
import { ResultHistoryModel, ResultModel } from './fees.model';
import { FeesService } from './fees.service';
import { ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Fees Module')
@Controller('fees')
export class FeesController {
  constructor(private readonly feeService: FeesService) {}

  @ApiResponse({
    description: 'Get the avaerage fee for the latest block in blockcain',
    status: 200,
  })
  @Get('/latest')
  async getLatestBlockFee(): Promise<ResultModel> {
    return await this.feeService.computeReqResult();
  }

  @ApiResponse({
    description: 'Get the avaerage fee for the block in blockcain by hash',
    status: 200,
  })
  @Get('/requestHistory')
  getRequestHistory(): { history: ResultHistoryModel[] } {
    return { history: this.feeService.getResultHistory() };
  }

  @ApiResponse({
    description: 'Get History List of all queries that is stored in Memory',
    status: 200,
  })
  @ApiParam({
    name: 'block_number',
    type: 'string',
    description: 'Blockchain hash that identifies the block in the blockchain',
    example: 'BLkuidhUBW2KvdjBUdr25Rga83RdQfCdv8T1pfXwRLWKveQ3msM',
  })
  @Get(':block_number')
  async getBlockFee(
    @Param('block_number') blockNumber: string,
  ): Promise<ResultModel> {
    return await this.feeService.computeReqResult(blockNumber);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { ResultHistoryModel, ResultModel } from '../models/fees.model';
import { FeesService } from '../services/fees.service';
import { ApiParam, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Fees Module')
@Controller('fees')
export class FeesController {
  constructor(private readonly feeService: FeesService) {}

  @ApiResponse({
    description: 'Get the average fee for the latest block in blockchain',
    status: 200,
  })
  @Get('/latest')
  async getLatestBlockFee(): Promise<ResultModel> {
    return await this.feeService.computeRequestResult();
  }

  @ApiResponse({
    description: 'Get History List of all queries that is stored in Memory',
    status: 200,
  })
  @Get('/requestHistory')
  async getRequestHistory(): Promise<{ history: ResultHistoryModel[] }> {
    return { history: await this.feeService.getResultHistory() };
  }

  @ApiResponse({
    description: 'Get the average fee for the block in blockchain by hash',
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
    @Param('block_number') blockHash: string,
  ): Promise<ResultModel> {
    if (!blockHash) {
      throw new Error('Block Hash (block_number) is required');
    }

    return await this.feeService.computeRequestResult(blockHash);
  }
}

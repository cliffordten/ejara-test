import { Injectable } from '@nestjs/common';
import { ResultHistoryModel, ResultModel } from '../models/fees.model';
import axios from 'axios';

const fetchUrl = 'https://tez.nodes.ejaraapis.xyz/chains/main/blocks/';

@Injectable()
export class FeesService {
  private resultHistory: ResultHistoryModel[] = [];
  private blockHash: string;

  // get the latest block number from the block chain
  private getLatestBlockHash = async (): Promise<string> => {
    const { data } = await axios.get(fetchUrl);

    return data[0][0];
  };

  // get the block transaction fees given the block hash or block number
  private getBlockTranFees = async (hash: string = null): Promise<number[]> => {
    this.blockHash = hash || (await this.getLatestBlockHash());

    const { data } = await axios.get(`${fetchUrl}/${this.blockHash}`);

    return data?.operations?.reduce((prev: any, curr: any) => {
      const curContent = [];

      curr.forEach((el: any) => {
        curContent.push(...el?.contents);
      });

      const transFees = curContent
        ?.filter((item: any) => item?.kind === 'transaction')
        ?.map((item: any) => Number(item?.fee));

      return [...prev, ...transFees];
    }, []);
  };

  // compute median value given an array of numbers
  private computeMedian = (arr: number[]): number => {
    if (!arr.length) return undefined;

    const sortedArr = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);

    return sortedArr.length % 2 === 0
      ? (sortedArr[mid - 1] + sortedArr[mid]) / 2
      : sortedArr[mid];
  };

  // compute the average value of a given array of numbers
  private computeAverage = (arr: number[]): number => {
    if (!arr.length) return undefined;

    const arrSum = arr.reduce((sum, el) => sum + el, 0);

    return arrSum / arr.length;
  };

  // compute the request result for the avialable routes
  computeReqResult = async (hash: string = null): Promise<ResultModel> => {
    const transFees = await this.getBlockTranFees(hash);

    const feeResult = {
      id: new Date().valueOf(),
      min: transFees.sort((a, b) => a - b)[0],
      max: transFees.sort((a, b) => b - a)[0],
      median: this.computeMedian(transFees),
      average: this.computeAverage(transFees),
    };

    this.resultHistory.push({
      block: this.blockHash,
      result_data: feeResult,
    });

    return feeResult;
  };

  // get the history of all request that is in memory
  getResultHistory = (): ResultHistoryModel[] => {
    return this.resultHistory;
  };
}

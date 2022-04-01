export class ResultModel {
  constructor(
    public id: number,
    public min: number,
    public max: number,
    public average: number,
    public median: number,
  ) {}
}

export class ResultHistoryModel {
  constructor(public block: string, public result_data: ResultModel) {}
}

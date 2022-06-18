export interface IResponseHttpModel {
  status: number;
  error: boolean;
  body: any;
}

export interface IPagingModel {
  length: number;
  pageSize: number;
  pageIndex: number;
  previousPageIndex: number;
}

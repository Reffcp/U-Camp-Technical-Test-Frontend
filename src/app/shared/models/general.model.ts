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

export interface IItemFilterCondition {
  name: string;
  id: string;
  results: number;
}

export interface IItemSortCondition {
  name: string;
  id: string;
}

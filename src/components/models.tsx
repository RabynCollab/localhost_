

export interface Datas {
  data: DataModel[],
  getData: Function
}


export interface DataModel {
  id: number,
  title?: string,
  comment?: string
}
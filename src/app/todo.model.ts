export class TodoList {
  status: number = 0;
  id: number;
  constructor(
    public title: string,
    public comment: string,
    private _addedOn: Date = new Date()
  ) {}

  public get addedOn(): Date {
    return this._addedOn;
  }
}
export interface ITodoReponse {
  message: string;
  data: TodoList[];
}

export interface ITodoCreatePayload {
  title: string;
  comment: string;
  addedOn: Date;
}

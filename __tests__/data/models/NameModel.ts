import { BaseModel, IBaseModelOptions } from '../../../src';

export class NameModel extends BaseModel {
  public title: string = '';
  public first: string = '';
  public last: string = '';

  constructor(data: Partial<NameModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }
}

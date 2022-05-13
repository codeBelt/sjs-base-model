import { BaseModel } from '../../../src';
import { IBaseModelOptions } from '../../../src/BaseModel.types';

export class NameModel extends BaseModel {
  public title: string = '';
  public first: string = '';
  public last: string = '';

  constructor(data: Partial<NameModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }

  public update(data: Partial<NameModel>): void {
    super.update(data);
  }
}

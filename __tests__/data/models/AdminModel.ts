import { BaseModel, IBaseModelOptions } from '../../../src';

export class AdminModel extends BaseModel {
  public id: string = '';
  public name: string = '';
  public description: string = '';
  public userCount: number = 0;

  constructor(data: Partial<AdminModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }
}

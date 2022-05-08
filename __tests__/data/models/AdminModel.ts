import { IBaseModelOptions } from '../../../src/IBaseModelOptions';
import { BaseModel } from '../../../src';

export class AdminModel extends BaseModel {
  public id: string = '';
  public name: string = '';
  public description: string = '';
  public userCount: number = 0;

  constructor(data: Partial<AdminModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }

  public update(data: Partial<AdminModel>): void {
    super.update(data);
  }
}

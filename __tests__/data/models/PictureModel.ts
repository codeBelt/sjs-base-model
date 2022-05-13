import { BaseModel } from '../../../src';
import { IBaseModelOptions } from '../../../src/BaseModel.types';

export class PictureModel extends BaseModel {
  public large: string = '';
  public medium: string = '';
  public thumbnail: string = '';

  constructor(data: Partial<PictureModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }

  public update(data: Partial<PictureModel>): void {
    super.update(data);
  }
}

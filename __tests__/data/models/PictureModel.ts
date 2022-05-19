import { BaseModel, IBaseModelOptions } from '../../../src';

export class PictureModel extends BaseModel {
  public large: string = '';
  public medium: string = '';
  public thumbnail: string = '';

  constructor(data: Partial<PictureModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }
}

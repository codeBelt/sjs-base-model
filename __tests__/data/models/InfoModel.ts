import { BaseModel, ConversionTypeEnum, IBaseModelOptions, IConversionOption } from '../../../src';
import { AdminModel } from './AdminModel';

export class InfoModel extends BaseModel {
  public seed: string = '';
  public results: number | null = null;
  public page: number | null = null;
  public version: string = '';
  public stringified: AdminModel = AdminModel as any;

  constructor(data: Partial<InfoModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }

  public update(data: Partial<InfoModel>): void {
    const conversionOptions: IConversionOption = {
      stringified: ConversionTypeEnum.JSON,
    };

    super.update(data, conversionOptions);
  }
}

import { IBaseModelOptions } from '../../../src/IBaseModelOptions';
import { BaseModel, ConversionTypeEnum, IConversionOption } from '../../../src';

export class ConversionInfoModel extends BaseModel {
  public seed: string = '';
  public results: boolean = false; // Was a string but converted into a boolean by IConversionOption
  public page: number | null = null; // Was a string but converted into a number by IConversionOption
  public version: number | null = null; // Was a string but converted into a float by IConversionOption

  constructor(data: Partial<ConversionInfoModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }

  public update(data: Partial<ConversionInfoModel>): void {
    const conversionOptions: IConversionOption = {
      results: ConversionTypeEnum.Boolean,
      page: ConversionTypeEnum.Number,
      version: ConversionTypeEnum.Float,
    };

    super.update(data, conversionOptions);
  }
}

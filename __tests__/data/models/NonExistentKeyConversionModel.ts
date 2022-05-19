import { BaseModel, ConversionTypeEnum, IConversionOption, IBaseModelOptions } from '../../../src';

export class NonExistentKeyConversionModel extends BaseModel {
  public something: string = '';

  constructor(data: Partial<NonExistentKeyConversionModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }

  public update(data: Partial<NonExistentKeyConversionModel>): void {
    const conversionOptions: IConversionOption = {
      nonExistentKey: ConversionTypeEnum.Float,
    };

    super.update(data, conversionOptions);
  }
}

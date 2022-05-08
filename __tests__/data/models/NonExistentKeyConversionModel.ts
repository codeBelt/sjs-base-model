import { BaseModel, ConversionTypeEnum, IConversionOption } from '../../../src';
import { IBaseModelOptions } from '../../../src/BaseModel.types';

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

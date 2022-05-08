import { ConversionTypeEnum } from './ConversionTypeEnum';

export interface IConversionOption {
  [propertyName: string]: ConversionTypeEnum;
}

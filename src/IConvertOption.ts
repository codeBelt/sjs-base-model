import {ConversionTypeEnum} from './ConversionTypeEnum';

export interface IConvertOption {
    [propertyName: string]: ConversionTypeEnum;
}

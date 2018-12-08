import { ConversionTypeEnum } from './ConversionTypeEnum';
import { IConversionOption } from './IConversionOption';
export declare class Util {
    private static _idCounter;
    static uniqueId(prefix?: string): any;
    static deletePropertyFromObject(object: any, value: string | string[]): any;
    static clone(src: any, renamePropertyName?: (keyName: string) => string): any;
    static toBoolean(value: string | number | boolean): boolean;
    static convertDataUsingConversionOptions(data: object, conversionOptions: IConversionOption): void;
    static convertDataToConversionType(propertyData: string | number | boolean, conversionType: ConversionTypeEnum): string | number | boolean | object;
}

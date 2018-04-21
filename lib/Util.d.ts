import { ConversionTypeEnum } from './ConversionTypeEnum';
import { IConvertOption } from './IConvertOption';
export declare class Util {
    private static _idCounter;
    static uniqueId(prefix?: string): any;
    static deletePropertyFromObject(object: any, value: string | string[]): any;
    static clone(src: any, renamePropertyName?: (keyName: string) => string): any;
    static toBoolean(value: string | number | boolean): boolean;
    static convertDataUsingOptions(data: object, convertOptions: IConvertOption): void;
    static convertDataToType(propertyData: string | number, convertType: ConversionTypeEnum): string | number | boolean;
}

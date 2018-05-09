import { BaseObject } from './BaseObject';
import { IBaseModelOptions } from './IBaseModelOptions';
import { IBaseModel } from './IBaseModel';
import { IConversionOption } from './IConversionOption';
export declare class BaseModel extends BaseObject implements IBaseModel {
    static readonly IS_BASE_MODEL: boolean;
    protected sjsOptions: IBaseModelOptions;
    constructor(opts?: IBaseModelOptions);
    update(data?: any, conversionOptions?: IConversionOption): any;
    toJSON(): any;
    toJSONString(): string;
    fromJSON(json: string): any;
    clone<T = BaseModel>(): T;
    protected _getPropertyData(currentPropertyData: any, passedInDataForProperty: any): any;
    protected _updateData(currentPropertyData: any, passedInDataForProperty: any): any;
    protected _isBaseModelClass(currentPropertyData: any): boolean;
    protected _isBaseModelObject(currentPropertyData: any): boolean;
    protected _isObjectWithProperties(data: any): boolean;
    protected _isObject(data: any, consoleError?: boolean): boolean;
}

import { IBaseModel } from './IBaseModel';
import { IBaseModelOptions } from './IBaseModelOptions';
import { BaseObject } from './BaseObject';
export declare class BaseModel extends BaseObject implements IBaseModel {
    static readonly IS_BASE_MODEL: boolean;
    protected sjsOptions: IBaseModelOptions;
    constructor(opts?: IBaseModelOptions);
    update(data?: any): any;
    toJSON(): any;
    toJSONString(): string;
    fromJSON(json: string): any;
    clone(): BaseModel;
    protected _getPropertyData(currentPropertyData: any, passedInDataForProperty: any): any;
    protected _updateData(currentPropertyData: any, passedInDataForProperty: any): any;
    protected _isBaseModelClass(currentPropertyData: any): boolean;
    protected _isBaseModelObject(currentPropertyData: any): boolean;
}

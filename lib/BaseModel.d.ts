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
    protected _updatePropertyWithDataPassedIn(propertyName: any, updateData: any): void;
    protected _updateData(propertyData: any, updateData: any): any;
}

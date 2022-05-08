import { BaseObject } from './BaseObject';
import { ConversionTypeEnum } from './BaseModel.constants';

export interface IBaseModel {
  update(data: this): this;
  toJSON(): BaseModelToJsonOmit<this>;
  toJSONString(): string;
  fromJSON(json: string): this;
  clone(): IBaseModel;
}

export interface IBaseModelOptions {
  expand?: boolean;
}

export interface IConversionOption {
  [propertyName: string]: ConversionTypeEnum;
}

export type BaseModelToJsonOmit<T> = Omit<T, Exclude<keyof IBaseModel, T> | 'sjsOptions' | keyof BaseObject>;

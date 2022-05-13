import { BaseObject } from './BaseObject';
import { ConversionTypeEnum } from './BaseModel.constants';

export interface IBaseModel {
  update(data: this): this;
  toJSON(): BaseModelToJson<this>;
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

export type BaseModelToJson<T> = Omit<T, Exclude<keyof IBaseModel, T> | 'sjsOptions' | keyof BaseObject>;

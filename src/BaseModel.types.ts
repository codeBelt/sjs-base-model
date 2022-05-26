import { BaseObject } from './BaseObject';
import { ConversionTypeEnum } from './BaseModel.constants';

export interface IBaseModel {
  clone(): IBaseModel;
  fromJSON(json: string): this;
  toJSON(): BaseModelJson<this>;
  toJSONString(): string;
  update(data: this): this;
}

export interface IBaseModelOptions {
  expand?: boolean;
}

export interface IConversionOption {
  [propertyName: string]: ConversionTypeEnum;
}

export type BaseModelJson<T> = Omit<T, Exclude<keyof IBaseModel, T> | keyof BaseObject>;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Record<string, any>
    ? RecursivePartial<T[P]>
    : T[P];
};

import { ConversionTypeEnum } from './BaseModel.constants';

export interface IBaseModel {
  update(data: this): this;
  toJSON(): any;
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

export interface IBaseModel {
    update(data: any): any;
    toJSON(): any;
    toJSONString(): string;
    fromJSON(json: string): any;
    clone(): IBaseModel;
}

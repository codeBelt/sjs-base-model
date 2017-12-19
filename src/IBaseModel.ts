/**
 * @class IBaseModel
 * @extends IBaseObject
 * @interface
 */
export interface IBaseModel {

    /**
     * @method update
     */
    update(data: any): any;

    /**
     * @method toJSON
     */
    toJSON(): any;

    /**
     * @method toJSONString
     */
    toJSONString(): string;

    /**
     * @method fromJSON
     */
    fromJSON(json: string): any;

    /**
     * @method clone
     */
    clone(): IBaseModel;

}

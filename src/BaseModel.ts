import {BaseObject} from './BaseObject';
import {IBaseModelOptions} from './IBaseModelOptions';
import {IBaseModel} from './IBaseModel';
import {IConversionOption} from './IConversionOption';
import {Util} from './Util';
import {ConversionTypeEnum} from './ConversionTypeEnum';

/**
 *  Base Model is a design pattern used to transfer data between software application subsystems.
 *
 * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
 *  Also in the class you inherit BaseModel from you can override the update method to handle the data how you want.
 *
 * @class BaseModel
 * @extends BaseObject
 * @param [data] {any} Provide a way to update the base model upon initialization.
 * @param [opts] {{ expand:boolean }} Options for the base model.
 * @requires Extend
 * @requires BaseObject
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *      // Example how to extend the BaseModel class.
 *      let data = {
 *              make: 'Tesla',
 *              model: 'Model S',
 *              YeAr: 2014,
 *              feature: {
 *                  abs: true,
 *                  airbags: true
 *              }
 *      }
 *      let carModel = new CarModel(data);
 *
 *
 *      // Example how to extend the BaseModel class.
 *      class CarModel extends BaseModel {
 *
 *          // You need to have properties so the data will get assigned.
 *          // If not the data will not get assigned to the model.
 *          make = null;
 *          model = null;
 *          year = null;
 *          allWheel = false; // Set a default value
 *
 *          // You can assign BaseModel to a property which will
 *          // automatically created it and pass the data to it.
 *          feature = FeatureModel
 *
 *          // If you have an array of data and want them assign to a BaseModel.
 *          feature = [FeatureModel];
 *
 *          constructor(data = {}, opts = {}) {
 *              super(opts);
 *
 *              if (data) {
 *                  this.update(data);
 *              }
 *          }
 *
 *          // @overridden BaseModel.update
 *          update(data) {
 *              super.update(data);
 *
 *              // If the data doesn't match the property name.
 *              // You can set the value(s) manually after the update super method has been called.
 *              this.year = data.YeAr;
 *          }
 *      }
 */
export class BaseModel extends BaseObject implements IBaseModel {
    /**
     * This property helps distinguish a BaseModel from other functions.
     *
     * @property IS_BASE_MODEL
     * @type {boolean}
     * @public
     * @static
     * @readonly
     */
    public static readonly IS_BASE_MODEL: boolean = true;

    /**
     * @property sjsOptions
     * @type {IBaseModelOptions}}
     * @public
     */
    public readonly sjsOptions: IBaseModelOptions = {
        expand: false,
    };

    constructor(opts: IBaseModelOptions = {}) {
        super();

        this.sjsOptions.expand = opts.expand === true;
    }

    /**
     * Provide a way to update the  Base Model.
     *
     * @method update
     * @param [data={}] {any}
     * @param [conversionOptions={}] {IConversionOption}
     * @public
     * @example
     *     // Example of updating some of the data:
     *     carModel.update({ year: 2015, allWheel: true});
     *
     *     // Of course you can also do it the following way:
     *     carModel.year = 2015;
     *     carModel.allWheel = false;
     */
    public update(data: any = {}, conversionOptions: IConversionOption = {}): any {
        const dataToUse: {[propertyName: string]: any} = this._isObject(data, true) ? data : {};

        Util.validConversionOptionNames(this, conversionOptions);

        Object.keys(this).forEach((propertyName: string) => {
            // Ignore the sjsId property because it is set in the BaseObject constructor and we don't want to update it.
            if (propertyName !== 'sjsId' && propertyName !== 'sjsOptions') {
                const currentPropertyData: any = this[propertyName];
                let passedInDataForProperty: any = dataToUse[propertyName];

                if (Boolean(conversionOptions[propertyName])) {
                    const conversionType: ConversionTypeEnum = conversionOptions[propertyName];

                    passedInDataForProperty = Util.convertDataToConversionType(passedInDataForProperty, conversionType);
                }

                this[propertyName] = this._getPropertyData(currentPropertyData, passedInDataForProperty);
            }
        });

        return this;
    }

    /**
     * Converts the Base Model data into a JSON object and deletes the sjsId property.
     *
     * @method toJSON
     * @returns {any}
     * @public
     * @example
     *     const obj = carModel.toJSON();
     */
    public toJSON(): any {
        const clone: any = Util.clone(this);

        return Util.deletePropertyFromObject(clone, ['sjsId', 'sjsOptions']);
    }

    /**
     * Converts a  Base Model to a JSON string,
     *
     * @method toJSONString
     * @returns {string}
     * @public
     * @example
     *     const str = carModel.toJSONString();
     */
    public toJSONString(): string {
        return JSON.stringify(this.toJSON());
    }

    /**
     * Converts the string json data into an Object and calls the {{#crossLink "BaseModel/update:method"}}{{/crossLink}} method with the converted Object.
     *
     * @method fromJSON
     * @param json {string}
     * @public
     * @example
     *      const str = '{"make":"Tesla","model":"Model S","year":2014}'
     *      const carModel = new CarModel();
     *      carModel.fromJSON(str);
     */
    public fromJSON(json: string): any {
        const parsedData: any = JSON.parse(json);

        this.update(parsedData);

        return this;
    }

    /**
     * Create a clone/copy of the  Base Model.
     *
     * @method clone
     * @returns {BaseModel}
     * @public
     * @example
     *     const clone = carModel.clone();
     *
     *     const clone = carModel.clone<SomeModel>();
     */
    public clone<T = BaseModel>(): T {
        const clonedBaseModel: T = new (this as any).constructor(this);

        return clonedBaseModel;
    }

    /**
     * Adds the updateData to the property
     *
     * @method _getPropertyData
     * @param propertyName
     * @param updateData
     * @protected
     */
    protected _getPropertyData(currentPropertyData: any, passedInDataForProperty: any): any {
        if (Array.isArray(currentPropertyData) === true) {
            const fistItemInArray: any = currentPropertyData[0];
            const isBaseModelObject: boolean = this._isBaseModelObject(fistItemInArray);
            const isBaseModelClass: boolean = this._isBaseModelClass(fistItemInArray);

            if (passedInDataForProperty == null && isBaseModelClass === true) {
                return [];
            }

            if (passedInDataForProperty == null) {
                return currentPropertyData;
            }

            const arrayData: any[] = Array.isArray(passedInDataForProperty) === false ? [passedInDataForProperty] : passedInDataForProperty;

            if (isBaseModelClass === true) {
                return arrayData.map((json: object) => new fistItemInArray(json, this.sjsOptions));
            }

            if (isBaseModelObject === true) {
                return arrayData.map((json: object) => new (fistItemInArray as any).constructor(json, this.sjsOptions));
            }

            return arrayData;
        }

        return passedInDataForProperty == null
            ? this._updateData(currentPropertyData, null)
            : this._updateData(currentPropertyData, passedInDataForProperty);
    }

    /**
     * @method _updateData
     * @param currentPropertyData
     * @param passedInDataForProperty
     * @protected
     */
    protected _updateData(currentPropertyData: any, passedInDataForProperty: any): any {
        const isBaseModelObject: boolean = this._isBaseModelObject(currentPropertyData);
        const isBaseModelClass: boolean = this._isBaseModelClass(currentPropertyData);
        const isPassedInDataAnObjectWithProperties: boolean = Util.isObjectWithProperties(passedInDataForProperty);

        if (isBaseModelObject === true && isPassedInDataAnObjectWithProperties === true) {
            // Call the update method on th BaseModel object and give it the passed in data.
            const baseModel: BaseModel = currentPropertyData;

            baseModel.update(passedInDataForProperty);

            return baseModel;
        }

        if (isBaseModelClass === true && (isPassedInDataAnObjectWithProperties === true || this.sjsOptions.expand === true)) {
            // If data is passed in or the expand option is set to true then create the BaseModel.
            // Give the constructor the passed in data or an empty object if the expand is true.
            const obj: object = isPassedInDataAnObjectWithProperties ? passedInDataForProperty : {};

            return new currentPropertyData(obj, this.sjsOptions);
        } else if (isBaseModelClass === true) {
            // Don't create the BaseModel if there is no data passed in. Return null to be assigned to the property.
            return null;
        }

        // If there is no data passed in then return the data that is currently on the property so it stays the same.
        return passedInDataForProperty != null ? passedInDataForProperty : currentPropertyData;
    }

    /**
     * Check the currentPropertyData to see if it is a BaseModel Class and not instantiated.
     *
     * @method _isBaseModelClass
     * @param currentPropertyData
     * @returns {boolean}
     * @protected
     */
    protected _isBaseModelClass(currentPropertyData: any): boolean {
        return typeof currentPropertyData === 'function' && currentPropertyData.IS_BASE_MODEL === true;
    }

    /**
     * Check the currentPropertyData to see if it is an instantiated version of the BaseModel.
     *
     * @method _isBaseModelObject
     * @param currentPropertyData
     * @returns {boolean}
     * @protected
     */
    protected _isBaseModelObject(currentPropertyData: any): boolean {
        return currentPropertyData instanceof BaseModel;
    }

    /**
     * Check if the data is an object.
     */
    protected _isObject(data: any, consoleError: boolean = false): boolean {
        const isObject: boolean = Util.isObject(data);

        if (isObject === false && consoleError === true) {
            console.error(`Something is wrong! ${this.getClassName()} only allows Objects but "${data}" was passed in.`);
        }

        return isObject;
    }
}

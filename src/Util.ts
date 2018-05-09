import {ConversionTypeEnum} from './ConversionTypeEnum';
import {IConversionOption} from './IConversionOption';

/**
 * A Utility class that has several static methods to assist in development.
 *
 * @class Util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
export class Util {

    /**
     * Keeps track of the count for the uniqueId method.
     *
     * @property _idCounter
     * @type {int}
     * @private
     * @static
     */
    private static _idCounter: number = 0;

    /**
     * Generates a unique ID. If a prefix is passed in, the value will be appended to it.
     *
     * @method uniqueId
     * @param [prefix] {string} The string value used for the prefix.
     * @returns {init|string} Returns the unique identifier.
     * @public
     * @static
     * @example
     *      let property = Util.uniqueId();
     *      // 1
     *
     *      let property = Util.uniqueId('prefixName_');
     *      // prefixName_1
     */
    public static uniqueId(prefix: string = null): any {
        const id: number = ++Util._idCounter;

        if (prefix != null) {
            return String(prefix + id);
        } else {
            return id;
        }
    }

    /**
     * Removes a list of properties from an object.
     *
     * @method deletePropertyFromObject
     * @param object {Object} The object you want to remove properties from.
     * @param value {string|Array.<string>} A property name or an array of property names you want to remove from the object.
     * @returns {any} Returns the object passed in without the removed the properties.
     * @public
     * @static
     * @example
     *      let obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.deletePropertyFromObject(obj, ['phone', 'gender']);
     *
     *      // { name: 'Robert' }
     */
    public static deletePropertyFromObject(object: any, value: string | string[]): any {
        // If properties is not an array then make it an array object.
        const propertyNameList: any = (value instanceof Array) ? value : [value];

        Object
            .keys(object)
            .forEach((key: string) => {
                const propertyData: any = object[key];

                if (propertyNameList.includes(key) === true) {
                    delete object[key];
                } else if (propertyData instanceof Array) {
                    propertyData.forEach((item: any) => Util.deletePropertyFromObject(item, propertyNameList));
                } else if (propertyData instanceof Object) {
                    Util.deletePropertyFromObject(propertyData, propertyNameList);
                }
            });

        return object;
    }

    /**
     * Makes a clone of an object.
     *
     * @method clone
     * @param src {Object} The object you to clone.
     * @param renamePropertyName {(keyName: string) => string} Optional function to rename property names
     * @returns {any} Returns a clone object of the one passed in.
     * @public
     * @static
     * @example
     *      let cloneOfObject = Util.clone(obj);
     */
    public static clone(src: any, renamePropertyName: (keyName: string) => string = null): any {
        if (src === null || typeof src === 'undefined' || typeof src !== 'object') {
            return src;
        }

        if (src instanceof Date) {
            return new Date(src.getTime());
        }

        if (src instanceof RegExp) {
            return new RegExp(src);
        }

        if (src instanceof Array) {
            return src.map((item: any) => Util.clone(item, renamePropertyName));
        }

        if (src instanceof Object) {
            const objCopy: {[key: string]: any} = {};

            Object.keys(src)
                .forEach((keyName: string) => {
                    const name: string = (renamePropertyName !== null) ? renamePropertyName(keyName) : keyName;

                    objCopy[name] = Util.clone(src[keyName], renamePropertyName);
                });

            return objCopy;
        }

        throw new Error(`Unable to copy. ${src} isn't supported.`);
    }

    /**
     * Converts a string or number to a boolean.
     * @example
     *      Util.toBoolean("FALSE");
     *      // false
     *
     *      Util.toBoolean("off");
     *      // false
     *
     *      Util.toBoolean(0);
     *      // false
     *
     *      Util.toBoolean(undefined);
     *      // false
     */
    public static toBoolean(value: string | number | boolean): boolean {
        const normalized: string | number | boolean = (typeof value === 'string')
            ? value.toLowerCase()
            : value;

        return !(normalized == null || normalized <= 0 || normalized === 'false' || normalized === 'off');
    }

    public static convertDataUsingOptions(data: object, conversionOptions: IConversionOption): void {
        Object
            .keys(conversionOptions)
            .forEach((propertyName: string) => {
                if (data.hasOwnProperty(propertyName)) {
                    const propertyData: number | string = (data as any)[propertyName];
                    const conversionType: ConversionTypeEnum = conversionOptions[propertyName];

                    (data as any)[propertyName] = Util.convertDataToType(propertyData, conversionType);
                }
            });
    }

    public static convertDataToType(propertyData: string | number, conversionType: ConversionTypeEnum): string | number | boolean {
        switch (conversionType) {
            case ConversionTypeEnum.Boolean:
                return Util.toBoolean(propertyData);
            case ConversionTypeEnum.Float:
                return (propertyData === null)
                    ? propertyData
                    : parseFloat(propertyData as string);
            case ConversionTypeEnum.Number:
                return (propertyData === null)
                    ? propertyData
                    : parseInt(propertyData as string, 10);
            default:
                return propertyData;
        }
    }

}

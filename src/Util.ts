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
     * @param obj {Object} The object you to clone.
     * @returns {any} Returns a clone object of the one passed in.
     * @public
     * @static
     * @example
     *      let cloneOfObject = Util.clone(obj);
     */
    public static clone(obj: any): any {

        // other scripts: http://davidwalsh.name/javascript-clone
        // http://oranlooney.com/functional-javascript/
        // http://oranlooney.com/deep-copy-javascript/

        // Handle the 3 simple types, and null or undefined
        if (obj == null || typeof obj !== 'object') {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            const date: Date = new Date();

            date.setTime(obj.getTime());

            return date;
        }

        // Handle Array
        if (obj instanceof Array) {
            const array: any[] = [];
            const length: number = obj.length;

            for (let i = 0; i < length; i++) {
                array[i] = Util.clone(obj[i]);
            }

            return array;
        }

        // Handle Object
        if (obj instanceof Object) {
            const copy: any = {};

            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = Util.clone(obj[attr]);
                }
            }

            return copy;
        }

        throw new Error(`[Util] Unable to clone type ${typeof obj}.`);
    }

}

import { ConversionTypeEnum } from './BaseModel.constants';
import { IConversionOption } from './BaseModel.types';

/**
 * A Utility class that has several static methods to assist in development.
 *
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
export class Util {
  /**
   * Makes a clone of an object.
   *
   * @param src {Object} The object you to clone.
   * @param renamePropertyName {(keyName: string) => string} Optional function to rename property names
   * @returns {any} Returns a clone object of the one passed in.
   * @example
   *      let cloneOfObject = Util.clone(obj);
   */
  public static clone(src: any, renamePropertyName?: (keyName: string) => string): any {
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
      return src.map((item: unknown) => Util.clone(item, renamePropertyName));
    }

    if (src instanceof Object) {
      const objCopy: Record<string, unknown> = {};

      Object.keys(src).forEach((keyName: string) => {
        const name: string = renamePropertyName ? renamePropertyName(keyName) : keyName;

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
  public static toBoolean(value: null | undefined | string | number | boolean): boolean {
    const normalized: null | undefined | string | number | boolean =
      typeof value === 'string' ? value.toLowerCase() : value;

    return !(normalized == null || normalized <= 0 || normalized === 'false' || normalized === 'off');
  }

  public static validConversionOptionNames(data: object, conversionOptions: IConversionOption = {}): void {
    Object.keys(conversionOptions).forEach((conversionPropertyName: string) => {
      if (!data.hasOwnProperty(conversionPropertyName)) {
        throw new SyntaxError(
          `Conversion property name "${conversionPropertyName}" does not match a property name on the model.`
        );
      }
    });
  }

  public static convertDataToConversionType(
    propertyData: null | string | number | boolean,
    conversionType: ConversionTypeEnum
  ): null | string | number | boolean | object {
    switch (conversionType) {
      case ConversionTypeEnum.Boolean:
        return Util.toBoolean(propertyData);
      case ConversionTypeEnum.Float:
        return propertyData === null ? null : parseFloat(propertyData as string);
      case ConversionTypeEnum.Number:
        return propertyData === null ? null : parseInt(propertyData as string, 10);
      case ConversionTypeEnum.String:
        if (Util.isObject(propertyData)) {
          return JSON.stringify(propertyData);
        }

        return propertyData === null ? null : String(propertyData);
      case ConversionTypeEnum.JSON:
        try {
          return JSON.parse(propertyData as string);
        } catch (error) {
          // Don't throw or console.log errors because it's by design to return the data on error.
          // For example the first time the model is created it needs to parse the data but if the
          // models update method is called we want to keep the data the same.

          return propertyData;
        }

      default:
        return propertyData;
    }
  }

  /**
   * Check the data is an object with properties.
   */
  public static isObjectWithProperties(data: Record<string, unknown>): boolean {
    return Util.isObject(data) && Object.keys(data).length > 0;
  }

  /**
   * Check if the data is an object.
   */
  public static isObject(data: unknown): boolean {
    return Boolean(data) && Array.isArray(data) === false && typeof data === 'object';
  }
}

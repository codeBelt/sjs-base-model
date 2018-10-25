import {Util} from './Util';

/**
 * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes.
 *
 * @class BaseObject
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
export class BaseObject {

    /**
     * The sjsId (StructureJS ID) is a unique identifier automatically assigned to most StructureJS objects upon instantiation.
     *
     * @property sjsId
     * @type {int}
     * @default null
     * @writeOnce
     * @readOnly
     * @public
     */
    public sjsId: number = null;

    constructor() {
        this.sjsId = Util.uniqueId();
    }

    /**
     * The purpose of the destroy method is to make an object ready for garbage collection. This
     * should be thought of as a one way function. Once destroy is called no further methods should be
     * called on the object or properties accessed. It is the responsibility of those who implement this
     * function to stop all running Timers, all running Sounds, and take any other steps necessary to make an
     * object eligible for garbage collection.
     *
     * By default the destroy method will null out all properties of the class automatically. You should call destroy
     * on other objects before calling the super.
     *
     * @method destroy
     * @return {void}
     * @public
     * @example
     *     destroy() {
     *          this.disable();
     *
     *          this._childInstance.destroy();
     *
     *          super.destroy();
     *     }
     */
    public destroy(): void {
        Object.keys(this)
            .filter((propertyName: string) => propertyName !== 'sjsId')
            .forEach((propertyName: string) => this[propertyName] = null);
    }

    /**
     * Gets the class/model.
     *
     * @method getClassName
     * @returns {string}
     * @public
     */
    public getClassName(): string {
        return (this as any).constructor.name;
    }

}

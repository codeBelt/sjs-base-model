/**
 * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes.
 *
 *  @author Robert S. (www.codeBelt.com)
 */
export class BaseObject {
  /**
   * The purpose of the destroy method is to make an object ready for garbage collection. This
   * should be thought of as a one way function. Once destroy is called no further methods should be
   * called on the object or properties accessed. It is the responsibility of those who implement this
   * function to stop all running Timers, all running Sounds, and take any other steps necessary to make an
   * object eligible for garbage collection.
   *
   * By default, the destroy method will null out all properties of the class automatically. You should call destroy
   * on other objects before calling the super.
   *
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
    Object.keys(this).forEach((propertyName: string) => (this[propertyName] = null));
  }

  /**
   * Gets the class/model name.
   */
  public getClassName(): string {
    return this.constructor.name;
  }
}

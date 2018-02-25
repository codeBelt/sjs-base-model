export declare class Util {
    private static _idCounter;
    static uniqueId(prefix?: string): any;
    static deletePropertyFromObject(object: any, value: string | string[]): any;
    static clone(src: any, renamePropertyName?: (keyName: string) => string): any;
}

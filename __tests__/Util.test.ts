import {Util, ConversionTypeEnum, IConversionOption} from '../src';

describe('Util', () => {
    let json: any = null;

    beforeEach(() => {
        json = {
            make: 'Tesla',
            model: 'Model S',
            YeAr: 2014,
            feature: {
                abs: true,
                airbags: true,
            },
            colors: [{id: 'red', name: 'Red'}, {id: 'white', name: 'White'}],
        };
    });

    test('Util.uniqueId()', () => {
        const expected: number = 1;
        const actual: number = Util.uniqueId();

        expect(expected).toEqual(actual);
    });

    test('Util.deletePropertyFromObject()', () => {
        const obj: any = {name: 'Robert', gender: 'male', phone: '555-555-5555'};
        const expected: any = {name: 'Robert'};
        const actual: any = Util.deletePropertyFromObject(obj, ['phone', 'gender']);

        expect(expected).toEqual(actual);
    });

    test('Util.clone()', () => {
        const expected: any = json;
        const actual: any = Util.clone(json);

        expect(expected).toEqual(actual);
    });

    test('Util.clone() and rename', () => {
        const expected: any = {
            the_make: 'Tesla',
            the_model: 'Model S',
            the_YeAr: 2014,
            the_feature: {
                the_abs: true,
                the_airbags: true,
            },
            the_colors: [{the_id: 'red', the_name: 'Red'}, {the_id: 'white', the_name: 'White'}],
        };
        const actual: any = Util.clone(json, (propertyName: string) => {
            return `the_${propertyName}`;
        });

        expect(expected).toEqual(actual);
    });

    test('Util.toBoolean()', () => {
        expect(Util.toBoolean(1)).toBeTruthy();
        expect(Util.toBoolean('1')).toBeTruthy();
        expect(Util.toBoolean(true)).toBeTruthy();
        expect(Util.toBoolean('true')).toBeTruthy();
        expect(Util.toBoolean('text')).toBeTruthy();
        expect(Util.toBoolean('null')).toBeTruthy();
        expect(Util.toBoolean('undefined')).toBeTruthy();

        expect(Util.toBoolean('FALSE')).toBeFalsy();
        expect(Util.toBoolean('false')).toBeFalsy();
        expect(Util.toBoolean('off')).toBeFalsy();
        expect(Util.toBoolean(0)).toBeFalsy();
        expect(Util.toBoolean('0')).toBeFalsy();
        expect(Util.toBoolean(null)).toBeFalsy();
        expect(Util.toBoolean(undefined)).toBeFalsy();
        expect(Util.toBoolean(false)).toBeFalsy();
    });

    test('Util.convertDataToConversionType()', () => {
        expect(Util.convertDataToConversionType(1.02323, ConversionTypeEnum.Number)).toEqual(1);
        expect(Util.convertDataToConversionType('1', ConversionTypeEnum.Number)).toEqual(1);
        expect(Util.convertDataToConversionType(null, ConversionTypeEnum.Number)).toEqual(null);
        expect(Util.convertDataToConversionType(1, ConversionTypeEnum.Number)).toEqual(1); // should return same

        expect(Util.convertDataToConversionType('1', ConversionTypeEnum.Boolean)).toEqual(true);
        expect(Util.convertDataToConversionType(0, ConversionTypeEnum.Boolean)).toEqual(false);
        expect(Util.convertDataToConversionType('0', ConversionTypeEnum.Boolean)).toEqual(false);
        expect(Util.convertDataToConversionType('FALSE', ConversionTypeEnum.Boolean)).toEqual(false);
        expect(Util.convertDataToConversionType('', ConversionTypeEnum.Boolean)).toEqual(false);
        expect(Util.convertDataToConversionType(null, ConversionTypeEnum.Boolean)).toEqual(false);
        expect(Util.convertDataToConversionType(false, ConversionTypeEnum.Boolean)).toEqual(false); // should return same

        expect(Util.convertDataToConversionType('01.02', ConversionTypeEnum.Float)).toEqual(1.02);
        expect(Util.convertDataToConversionType(1, ConversionTypeEnum.Float)).toEqual(1);
        expect(Util.convertDataToConversionType(2222.22222222, ConversionTypeEnum.Float)).toEqual(2222.22222222);
        expect(Util.convertDataToConversionType(null, ConversionTypeEnum.Float)).toEqual(null);
        expect(Util.convertDataToConversionType(1.02, ConversionTypeEnum.Float)).toEqual(1.02); // should return same

        expect(Util.convertDataToConversionType(1.11, ConversionTypeEnum.String)).toEqual('1.11');
        expect(Util.convertDataToConversionType(false, ConversionTypeEnum.String)).toEqual('false');
        expect(Util.convertDataToConversionType(null, ConversionTypeEnum.String)).toEqual(null);
        expect(Util.convertDataToConversionType(json, ConversionTypeEnum.String)).toEqual(JSON.stringify(json));
        expect(Util.convertDataToConversionType('1.11', ConversionTypeEnum.String)).toEqual('1.11'); // should return same

        expect(Util.convertDataToConversionType(JSON.stringify(json), ConversionTypeEnum.JSON)).toEqual(json);
        expect(Util.convertDataToConversionType(json, ConversionTypeEnum.JSON)).toEqual(json); // should return same
    });

    describe('Util.convertDataUsingConversionOptions()', () => {
        test('Should convert data types', () => {
            const data: object = {
                stringToFloat: '23.345',
                stringToNumber: '23.345',
                stringToFalse: '0',
                stringToTrue: '1',
                noChange: '8',
                numberToString: 8,
                stringToJson: '{"complete":"Complete","new":"New","open":"Open"}',
            };
            const conversionOptions: IConversionOption = {
                stringToFloat: ConversionTypeEnum.Float,
                stringToNumber: ConversionTypeEnum.Number,
                stringToFalse: ConversionTypeEnum.Boolean,
                stringToTrue: ConversionTypeEnum.Boolean,
                numberToString: ConversionTypeEnum.String,
                stringToJson: ConversionTypeEnum.JSON,
            };

            Util.convertDataUsingConversionOptions(data, conversionOptions);

            expect(data).toEqual({
                stringToFloat: 23.345,
                stringToNumber: 23,
                stringToFalse: false,
                stringToTrue: true,
                noChange: '8',
                numberToString: '8',
                stringToJson: {complete: 'Complete', new: 'New', open: 'Open'},
            });
        });

        test('should throw error on non existent key', () => {
            const data: any = {
                something: '',
            };
            const conversionOptions: IConversionOption = {
                nonExistentKey: ConversionTypeEnum.Float,
            };

            expect(() => {
                Util.convertDataUsingConversionOptions(data, conversionOptions);
            }).toThrow(SyntaxError);
        });
    });

    test('Util.isObject', () => {
        expect(Util.isObject(undefined)).toBeFalsy();
        expect(Util.isObject(null)).toBeFalsy();
        expect(Util.isObject(1)).toBeFalsy();
        expect(Util.isObject('string')).toBeFalsy();
        expect(Util.isObject([])).toBeFalsy();

        expect(Util.isObject({})).toBeTruthy();
        expect(Util.isObject(json)).toBeTruthy();
    });

    test('Util.isObjectWithProperties', () => {
        expect(Util.isObjectWithProperties({})).toBeFalsy();

        expect(Util.isObjectWithProperties(json)).toBeTruthy();
    });
});

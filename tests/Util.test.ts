import {Util} from '../src/Util';

describe('Util', () => {

    let json: any = null;

    beforeEach(() => {
        json = {
            make: 'Tesla',
            model: 'Model S',
            YeAr: 2014,
            feature: {
                abs: true,
                airbags: true
            },
            colors: [{id: 'red', name: 'Red'}, {id: 'white', name: 'White'}]
        };
    });


    it('Util.uniqueId()', () => {
        const expected: number = 1;
        const actual: number = Util.uniqueId();

        expect(expected).toEqual(actual);
    });

    it('Util.deletePropertyFromObject()', () => {
        const obj: any = { name: 'Robert', gender: 'male', phone: '555-555-5555' };
        const expected: any = {name: 'Robert'};
        const actual: any = Util.deletePropertyFromObject(obj, ['phone', 'gender']);

        expect(expected).toEqual(actual);
    });

    it('Util.clone()', () => {
        const expected: any = json;
        const actual: any = Util.clone(json);

        expect(expected).toEqual(actual);
    });

    it('Util.clone() and rename', () => {
        const expected: any = {
            the_make: 'Tesla',
            the_model: 'Model S',
            the_YeAr: 2014,
            the_feature: {
                the_abs: true,
                the_airbags: true
            },
            the_colors: [{the_id: 'red', the_name: 'Red'}, {the_id: 'white', the_name: 'White'}]
        };
        const actual: any = Util.clone(json, (propertyName: string) => {
            return `the_${propertyName}`;
        });

        expect(expected).toEqual(actual);
    });

});

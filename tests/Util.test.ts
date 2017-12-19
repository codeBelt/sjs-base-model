import {Util} from '../src/Util';

describe('Util', function() {

    it('Util.uniqueId()', function() {
        const expected: number = 1;
        const actual: number = Util.uniqueId();

        expect(expected).toEqual(actual);
    });

    it('Util.deletePropertyFromObject()', function() {
        const obj: any = { name: 'Robert', gender: 'male', phone: '555-555-5555' };
        const expected: any = {name: 'Robert'};
        const actual: any = Util.deletePropertyFromObject(obj, ['phone', 'gender']);

        expect(expected).toEqual(actual);
    });

});

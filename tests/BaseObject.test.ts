import {BaseObject} from '../src/BaseObject';

describe('BaseObject', function() {

    let baseObject = null;

    beforeEach(() => {
        baseObject = new BaseObject();
    });

    it('baseObject.sjsId', function() {
        const expected: number = 1;
        const actual: number = baseObject.sjsId;

        expect(expected).toEqual(actual);
    });

    xit('baseObject.destroy()', function() {
        const expected: number = 1;
        const actual: number = baseObject.sjsId;

        baseObject.destroy();

        expect(expected).toEqual(actual);
    });

});

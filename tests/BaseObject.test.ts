import {BaseObject} from '../src/BaseObject';
import {InfoModel} from './data/models/InfoModel';

describe('BaseObject', function() {

    it('baseObject.sjsId', function() {
        const baseObject = new BaseObject();
        const expected: number = 1;
        const actual: number = baseObject.sjsId;

        expect(expected).toEqual(actual);
    });

    it('baseObject.destroy()', function() {
        const infoModel = new InfoModel();

        expect(infoModel.sjsOptions).toEqual({expand: false});

        infoModel.destroy();

        expect(infoModel.sjsOptions).toBe(null);
    });

});

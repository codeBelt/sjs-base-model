import {BaseObject} from '../src/BaseObject';
import {InfoModel} from './data/models/InfoModel';

describe('BaseObject', () => {

    it('baseObject.sjsId', () => {
        const baseObject = new BaseObject();
        const expected: number = 1;
        const actual: number = baseObject.sjsId;

        expect(expected).toEqual(actual);
    });

    it('baseObject.destroy()', () => {
        const infoModel = new InfoModel();

        expect(infoModel.sjsOptions).toEqual({expand: false});

        infoModel.destroy();

        expect(infoModel.sjsOptions).toBe(null);
    });

});

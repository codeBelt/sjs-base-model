import {BaseModel} from '../src/BaseModel';

import * as data from './data/results.json';

describe('BaseModel', () => {

    let baseModel = null;

    beforeEach(() => {
        baseModel = new BaseModel();
    });

    it('can find things', () => {
        expect(baseModel.update()).toEqual(baseModel);
    });

});

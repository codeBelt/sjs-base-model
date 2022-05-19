import { InfoModel } from './data/models/InfoModel';
import { Util } from '../src';
import data from './data/results.json';

describe('BaseObject', () => {
  let json = data;

  beforeEach(() => {
    json = Util.clone(data);
  });

  test('baseObject.destroy()', () => {
    const infoModel = new InfoModel(json.info as any);

    expect(infoModel).toEqual({
      ...json.info,
      stringified: JSON.parse(json.info.stringified),
    });

    infoModel.destroy();

    expect(infoModel).toEqual({
      page: null,
      results: null,
      seed: null,
      stringified: null,
      version: null,
    });
  });
});

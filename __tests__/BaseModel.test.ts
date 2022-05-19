import data from './data/results.json';
import { BaseModel, Util } from '../src';
import { InfoModel } from './data/models/InfoModel';
import { UserModel } from './data/models/UserModel';
import { UserResponseModel } from './data/models/UserResponseModel';
import { ConversionInfoModel } from './data/models/ConversionInfoModel';
import { NonExistentKeyConversionModel } from './data/models/NonExistentKeyConversionModel';
import { NameModel } from './data/models/NameModel';
import { AdminModel } from './data/models/AdminModel';

describe('BaseModel', () => {
  let json = data;

  beforeEach(() => {
    json = Util.clone(data);
  });

  test('update returns itself', () => {
    const baseModel = new BaseModel();

    expect(baseModel.update()).toEqual(baseModel);
  });

  test('should populate InfoModel', () => {
    const model = new InfoModel(json.info as any);

    expect(model.toJSON()).toEqual({
      ...json.info,
      stringified: JSON.parse(json.info.stringified),
    });
    expect(model.stringified).toBeInstanceOf(AdminModel);
  });

  test('should have default of InfoModel', () => {
    const model = new InfoModel();

    expect(model.toJSON()).toEqual({
      page: null,
      results: null,
      seed: '',
      stringified: null,
      version: '',
    });
    expect(model.stringified).toEqual(null);
  });

  test('should have default of UserResponseModel', () => {
    const model = new UserResponseModel();

    expect(model.info).toEqual(null);
    expect(model.results).toEqual([]);
  });

  test('should clone and not mutate data', () => {
    const model = new UserResponseModel(json as any);
    const clone = model.clone();

    clone.info.version = '888';

    expect(model.info).not.toEqual(clone.info);
    expect(model.toJSON()).not.toEqual(clone.toJSON());
  });

  test('should assign single items into array property of UserResponseModel', () => {
    const model = new UserResponseModel({
      results: { gender: 'male' },
      resultsAny: { gender: 'male' },
      singleStringToArray: 'male',
      nullToArray: null,
      zeroToArray: 0,
      falseToArray: false,
    } as any);

    expect(model.info).toEqual(null);
    expect(model.results[0]).toBeInstanceOf(UserModel);
    expect(model.results[0].gender).toEqual('male');
    expect(model.resultsAny).toEqual([{ gender: 'male' }]);
    expect(model.singleStringToArray).toEqual(['male']);
    expect(model.nullToArray).toEqual([]);
    expect(model.zeroToArray).toEqual([0]);
    expect(model.falseToArray).toEqual([false]);
  });

  test('should have default of UserResponseModel with null passed in', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const model = new UserResponseModel(null as any);

    expect(model.info).toEqual(null);
    expect(model.results).toEqual([]);
    expect(consoleError).toBeCalledWith(
      'Something is wrong! UserResponseModel only allows Objects but "null" was passed in.'
    );

    consoleError.mockReset();
  });

  test('should have populate UserResponseModel', () => {
    const model = new UserResponseModel(json as any);

    const expectedData = {
      ...json,
      results: json.results.map((resultItem) => ({
        gender: resultItem.gender,
        name: resultItem.name,
        picture: resultItem.picture,
        email: resultItem.email,
        nat: resultItem.nat,
      })),
      info: {
        ...json.info,
        stringified: JSON.parse(json.info.stringified),
      },
    };

    expect(model.toJSON()).toEqual(expectedData);
  });

  test('should call update with empty object and have no changes', () => {
    const model = new UserResponseModel(json as any);
    const expectedData = {
      ...json,
      results: json.results.map((resultItem) => ({
        gender: resultItem.gender,
        name: resultItem.name,
        picture: resultItem.picture,
        email: resultItem.email,
        nat: resultItem.nat,
      })),
      info: {
        ...json.info,
        stringified: JSON.parse(json.info.stringified),
      },
    };

    model.update({});

    expect(model.toJSON()).toEqual(expectedData);
  });

  test('should have populate UserResponseModel from same UserResponseModel', () => {
    let model = new UserResponseModel(json as any);

    model = new UserResponseModel(model);

    const expectedData = {
      ...json,
      results: json.results.map((resultItem) => ({
        gender: resultItem.gender,
        name: resultItem.name,
        picture: resultItem.picture,
        email: resultItem.email,
        nat: resultItem.nat,
      })),
      info: {
        ...json.info,
        stringified: JSON.parse(json.info.stringified),
      },
    };

    expect(model.toJSON()).toEqual(expectedData);
  });

  test('should update email results to one item in the array', () => {
    const model = new UserResponseModel(json as any);

    expect(model.results.length).toBe(3);

    model.update({
      results: [
        {
          email: 'example@example.com',
          name: {
            last: 'Cool',
          },
        } as UserModel,
      ],
    });

    expect(model.results.length).toBe(1);
    expect(model.results[0]).toBeInstanceOf(UserModel);
    expect(model.toJSON()).toEqual({
      ...json,
      results: [
        {
          picture: null,
          gender: '',
          nat: '',
          email: 'example@example.com',
          name: {
            first: '',
            title: '',
            last: 'Cool',
          },
        },
      ],
      info: {
        ...json.info,
        stringified: JSON.parse(json.info.stringified),
      },
    });
  });

  test('should populate UserModel', () => {
    const theData = json.results[0];
    const model = new UserModel(theData as any);

    const expectedData = {
      gender: theData.gender,
      name: theData.name,
      picture: theData.picture,
      email: theData.email,
      nat: theData.nat,
    };

    expect(model.toJSON()).toEqual(expectedData);
  });

  test('should update UserModel', () => {
    const theData = json.results[0];
    const model = new UserModel(theData as any);

    expect(model.email).toBe(theData.email);
    expect(model.name.last).toBe(theData.name.last);

    model.update({
      email: 'example@example.com',
      name: {
        last: 'Cool',
      } as NameModel,
    });

    expect(model.email).toBe('example@example.com');
    expect(model.name.toJSON()).toEqual({
      ...theData.name,
      last: 'Cool',
    });
  });

  test('should expand', () => {
    const expected: any = {
      info: {
        seed: '',
        results: null,
        page: null,
        version: '',
        stringified: {
          description: '',
          id: '',
          name: '',
          userCount: 0,
        },
      },
      results: [],
      resultsAny: [],
      singleStringToArray: [],
      nullToArray: [],
      zeroToArray: [],
      falseToArray: [],
    };
    const model = new UserResponseModel({}, { expand: true });

    expect(model.toJSON()).toEqual(expected);
  });

  describe('should test isObject', () => {
    const model = new BaseModel();

    const objects: object[] = [{}, new UserResponseModel()];
    const nonObjects: any[] = [[], true, false, undefined, null, 8, 20.18, '🚀'];

    test.each(objects)('toBeTruthy', (object) => {
      expect(model['_isObject'](object)).toBeTruthy();
    });

    test.each(nonObjects)('toBeTruthy', (nonObject) => {
      expect(model['_isObject'](nonObject)).toBeFalsy();
    });
  });

  test('should test IConversionOption', () => {
    const dataToBeConverted: any = {
      seed: 'abc',
      results: '3',
      page: '1',
      version: '1.1',
    };

    const model = new ConversionInfoModel(dataToBeConverted);

    expect(model.toJSON()).toEqual({
      seed: 'abc',
      results: true,
      page: 1,
      version: 1.1,
    });
  });

  test('should test non existent keys on IConversionOption', () => {
    expect(() => {
      new NonExistentKeyConversionModel({});
    }).toThrow(SyntaxError);
  });
});

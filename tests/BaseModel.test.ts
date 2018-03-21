import * as data from './data/results.json';
import {BaseModel} from '../src/BaseModel';
import {InfoModel} from './data/models/InfoModel';
import {UserModel} from './data/models/UserModel';
import {UserResponseModel} from './data/models/UserResponseModel';
import {Util} from '../src/Util';

describe('BaseModel', () => {

    let baseModel: BaseModel = null;
    let json: any = null;

    beforeEach(() => {
        baseModel = new BaseModel();
        json = Util.clone(data);
    });

    it('update returns itself', () => {
        expect(baseModel.update()).toEqual(baseModel);
    });

    it('should populate InfoModel', () => {
        const model = new InfoModel(json.info);

        expect(model.toJSON()).toEqual(json.info);
    });

    it('should have default of UserResponseModel', () => {
        const model = new UserResponseModel();

        expect(model.info).toEqual(null);
        expect(model.results).toEqual([]);
        expect(model.sjsOptions).toEqual({expand: false});
    });

    it('should have default of UserResponseModel with null passed in', () => {
        console.error('Ignore the "Something is wrong!" errors. They are expected.');

        const model = new UserResponseModel(null);

        expect(model.info).toEqual(null);
        expect(model.results).toEqual([]);
        expect(model.sjsOptions).toEqual({expand: false});
    });

    it('should have populate UserResponseModel', () => {
        const model = new UserResponseModel(json);

        const expectedData = {
            ...json,
            results: json.results.map((resultItem: any) => Util.deletePropertyFromObject(resultItem, ['location', 'login', 'dob', 'registered', 'phone', 'cell', 'id'])),
        };

        expect(model.toJSON()).toEqual(expectedData);
    });

    it('should call update with empty object and have no changes', () => {
        const model = new UserResponseModel(json);

        const expectedData = {
            ...json,
            results: json.results.map((resultItem: any) => Util.deletePropertyFromObject(resultItem, ['location', 'login', 'dob', 'registered', 'phone', 'cell', 'id'])),
        };

        model.update({});

        expect(model.toJSON()).toEqual(expectedData);
    });

    it('should have populate UserResponseModel from same UserResponseModel', () => {
        let model = new UserResponseModel(json);
        model = new UserResponseModel(model);

        const expectedData = {
            ...json,
            results: json.results.map((resultItem: any) => Util.deletePropertyFromObject(resultItem, ['location', 'login', 'dob', 'registered', 'phone', 'cell', 'id'])),
        };

        expect(model.toJSON()).toEqual(expectedData);
    });

    it('should update email results to one item in the array', () => {
        const model = new UserResponseModel(json);

        expect(model.results.length).toBe(3);

        model.update({
            results: [{
                email: 'example@example.com',
                name: {
                    last: 'Cool'
                }
            }],
        });

        expect(model.results.length).toBe(1);
        expect(model.results[0]).toBeInstanceOf(UserModel);
        expect(model.toJSON()).toEqual({
            ...json,
            results: [{
                picture: null,
                gender: '',
                nat: '',
                email: 'example@example.com',
                name: {
                    first: '',
                    title: '',
                    last: 'Cool',
                }
            }]
        });
    });

    it('should populate UserModel', () => {
        let theData = json.results[0];
        const model = new UserModel(theData);

        const expectedData = Util.deletePropertyFromObject(theData, ['location', 'login', 'dob', 'registered', 'phone', 'cell', 'id']);

        expect(model.toJSON()).toEqual(expectedData);
    });

    it('should update UserModel', () => {
        let theData = json.results[0];
        const model = new UserModel(theData);

        expect(model.email).toBe(theData.email);
        expect(model.name.last).toBe(theData.name.last);

        model.update({
            email: 'example@example.com',
            name: {
                last: 'Cool',
            },
        });

        expect(model.email).toBe('example@example.com');
        expect(model.name.toJSON()).toEqual({
            ...theData.name,
            last: 'Cool',
        });
    });

    it('should expand', () => {
        const expected: any = {
            info: {
                seed: '',
                results: null,
                page: null,
                version: '',
            },
            results: [],
            resultsAny: [],
        };
        const model = new UserResponseModel({}, {expand: true});

        expect(model.toJSON()).toEqual(expected);
    });

    it('should test isObject', () => {
        const baseModel = new BaseModel();

        const objects: object[] = [
            {},
            new UserResponseModel(),
        ];
        const nonObjects: any[] = [
            [],
            true,
            false,
            undefined,
            null,
            8,
            20.18,
            '🚀',
        ];

        objects.forEach((object: object) => expect(baseModel['_isObject'](object)).toBeTruthy());
        nonObjects.forEach((nonObject: any) => expect(baseModel['_isObject'](nonObject)).toBeFalsy());

        console.error('Ignore the "Something is wrong!" errors. They are expected.');
    });

});

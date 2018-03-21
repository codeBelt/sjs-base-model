import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {InfoModel} from './InfoModel';
import {UserModel} from './UserModel';
import {BaseModel} from '../../../src';

export class UserResponseModel extends BaseModel {

    public info: InfoModel = InfoModel as any;
    public results: UserModel[] = [UserModel as any];
    public resultsAny: any[] = [];

    constructor(data: any = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        this.update(data);
    }

    public update(data: any): void {
        super.update(data);
    }

}

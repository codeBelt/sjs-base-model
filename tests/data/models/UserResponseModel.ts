import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {InfoModel} from './InfoModel';
import {UserModel} from './UserModel';
import {BaseModel} from '../../../src';

export class UserResponseModel extends BaseModel {

    public info: InfoModel = InfoModel as any;
    public results: UserModel[] = [UserModel as any];

    constructor(data: any = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        if (data) {
            this.update(data);
        }
    }

    public update(data: any): void {
        super.update(data);
    }

}

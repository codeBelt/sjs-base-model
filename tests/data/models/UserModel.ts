import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {NameModel} from './NameModel';
import {PictureModel} from './PictureModel';
import {BaseModel} from '../../../src';

export class UserModel extends BaseModel {

    public gender: string = '';
    public name: NameModel = NameModel as any;
    public picture: PictureModel = PictureModel as any;
    public email: string = '';
    public nat: string = '';

    constructor(data: any = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        this.update(data);
    }

    public update(data: any): void {
        super.update(data);
    }

}

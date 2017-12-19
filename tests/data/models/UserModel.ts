import {BaseModel} from '../../../src/BaseModel';
import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {NameModel} from './NameModel';
import {PictureModel} from './PictureModel';

export class UserModel extends BaseModel {

    public gender: string = null;
    public name: NameModel = NameModel as any;
    public picture: PictureModel = PictureModel as any;
    public nat: string = null;

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

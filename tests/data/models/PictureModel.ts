import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {BaseModel} from '../../../src';

export class PictureModel extends BaseModel {

    public large: string = '';
    public medium: string = '';
    public thumbnail: string = '';

    constructor(data: any = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        this.update(data);
    }

    public update(data: any): void {
        super.update(data);
    }

}

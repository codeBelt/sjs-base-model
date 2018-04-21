import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {BaseModel} from '../../../src';

export class PictureModel extends BaseModel {

    public large: string = '';
    public medium: string = '';
    public thumbnail: string = '';

    constructor(data: Partial<PictureModel> = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        this.update(data);
    }

    public update(data: Partial<PictureModel>): void {
        super.update(data);
    }

}

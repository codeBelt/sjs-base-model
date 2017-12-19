import BaseModel from '../../../src/BaseModel';
import {IBaseModelOptions} from '../../../src/IBaseModelOptions';

export class PictureModel extends BaseModel {

    public large: string = null;
    public medium: string = null;
    public thumbnail: string = null;

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

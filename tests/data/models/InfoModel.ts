import BaseModel from '../../../src/BaseModel';
import {IBaseModelOptions} from '../../../src/IBaseModelOptions';

export class InfoModel extends BaseModel {

    public seed: string = null;
    public results: number = null;
    public page: number = null;
    public version: string = null;

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

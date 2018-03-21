import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {BaseModel} from '../../../src';

export class InfoModel extends BaseModel {

    public seed: string = '';
    public results: number = null;
    public page: number = null;
    public version: string = '';

    constructor(data: any = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        this.update(data);
    }

    public update(data: any): void {
        super.update(data);
    }

}

import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {BaseModel} from '../../../src';

export class InfoModel extends BaseModel {
    public seed: string = '';
    public results: number = null;
    public page: number = null;
    public version: string = '';

    constructor(data: Partial<InfoModel> = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        this.update(data);
    }

    public update(data: Partial<InfoModel>): void {
        super.update(data);
    }
}

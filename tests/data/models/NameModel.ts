import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {BaseModel} from '../../../src';

export class NameModel extends BaseModel {

    public title: string = '';
    public first: string = '';
    public last: string = '';

    constructor(data: any = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        this.update(data);
    }

    public update(data: any): void {
        super.update(data);
    }

}

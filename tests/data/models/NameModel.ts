import BaseModel from '../../../src/BaseModel';
import {IBaseModelOptions} from '../../../src/IBaseModelOptions';

export class NameModel extends BaseModel {

    public title: string = null;
    public first: string = null;
    public last: string = null;

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

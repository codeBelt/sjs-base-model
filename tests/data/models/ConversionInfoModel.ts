import {IBaseModelOptions} from '../../../src/IBaseModelOptions';
import {BaseModel, ConversionTypeEnum, IConvertOption} from '../../../src';

export class ConversionInfoModel extends BaseModel {

    public seed: string = '';
    public results: boolean = false; // Was a string but converted into a boolean by IConvertOption
    public page: number = null; // Was a string but converted into a number by IConvertOption
    public version: number = null; // Was a string but converted into a float by IConvertOption

    constructor(data: Partial<ConversionInfoModel> = {}, opts: IBaseModelOptions = {}) {
        super(opts);

        this.update(data);
    }

    public update(data: Partial<ConversionInfoModel>): void {
        const options: IConvertOption = {
            results: ConversionTypeEnum.Boolean,
            page: ConversionTypeEnum.Number,
            version: ConversionTypeEnum.Float,
        };

        super.update(data, options);
    }

}

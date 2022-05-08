export { BaseModel } from './BaseModel';
export { Util } from './Util';
export { ConversionTypeEnum } from './ConversionTypeEnum';

// Workaround for issue of exporting interfaces
import { IConversionOption as ExportedInterface } from './IConversionOption';
export type IConversionOption = ExportedInterface;

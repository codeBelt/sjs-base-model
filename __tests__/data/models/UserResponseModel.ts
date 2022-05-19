import { InfoModel } from './InfoModel';
import { UserModel } from './UserModel';
import { BaseModel, IBaseModelOptions } from '../../../src';

export class UserResponseModel extends BaseModel {
  public info: InfoModel = InfoModel as any;
  public results: UserModel[] = [UserModel as any];
  public resultsAny: any[] = [];
  public singleStringToArray: string[] = [];
  public nullToArray: any[] = [];
  public zeroToArray: number[] = [];
  public falseToArray: boolean[] = [];

  constructor(data: Partial<UserResponseModel> = {}, opts: IBaseModelOptions = {}) {
    super(opts);

    this.update(data);
  }

  public update(data: Partial<UserResponseModel>): void {
    super.update(data);
  }
}

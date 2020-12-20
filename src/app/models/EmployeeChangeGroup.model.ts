import {Employee, EmployeeJson} from './user.model';
import {ChangeGroup, ChangeGroupJson} from './changegroup.model';

export interface EmployeeChangeGroupJson {
  employeeId: number;
  employee: EmployeeJson;
  changeGroupId: number;
  changeGroup: ChangeGroupJson;
}

export class EmployeeChangeGroup {
  private employeeId: number;
  private changeGroupId: number;

  constructor(
    private employee: Employee,
    private changeGroup: ChangeGroup
  ) {}

  static fromJSON(json: EmployeeChangeGroupJson): EmployeeChangeGroup{
    if (json === null || json === undefined){
      return null;
    }
    const ecg = new EmployeeChangeGroup(
      Employee.fromJSON(json.employee),
      ChangeGroup.fromJSON(json.changeGroup));
    ecg.employeeId = json.employeeId;
    ecg.changeGroupId = json.changeGroupId;
    return ecg;
  }

  toJson(): EmployeeChangeGroupJson{
    return {
      employeeId: this.employeeId,
      employee: this.employee === null ? null : this.employee.toJSON(),
      changeGroupId: this.changeGroupId,
      changeGroup: this.changeGroup === null ? null : this.changeGroup.toJSON()
    } as EmployeeChangeGroupJson;
  }

  get EmployeeId(): number{
    return this.employeeId;
  }
  get Employee(): Employee{
    return this.employee;
  }
  get ChangeGroupId(): number{
    return this.changeGroupId;
  }
  get ChangeGroup(): ChangeGroup{
    return this.changeGroup;
  }
}


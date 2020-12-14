import {Employee, EmployeeJson} from './user.model';
import {EmployeeChangeGroup, EmployeeChangeGroupJson} from './EmployeeChangeGroup.model';

export interface ChangeGroupJson {
  id: number;
  name: string;
  employeeChangeGroups: EmployeeChangeGroupJson[];
}

export class ChangeGroup {
  private ID: number;
  private _CHECKED = false;

  constructor(
    private NAME: string,
    private EMPLOYEECHANGEGROUPS: EmployeeChangeGroup[]
  ) {
  }

  static fromJSON(json: ChangeGroupJson): ChangeGroup {
    if (json !== undefined) {
      const changegroup = new ChangeGroup(
        json.name,
        json.employeeChangeGroups == null ? null : json.employeeChangeGroups.map(EmployeeChangeGroup.fromJSON)
      );
      changegroup.ID = json.id;
      return changegroup;
    }
    return null as ChangeGroup;
  }

  toJSON(): ChangeGroupJson {
    // @ts-ignore
    return {
      name: this.NAME,
      employeeChangeGroups: this.EMPLOYEECHANGEGROUPS
    } as ChangeGroupJson;
  }

  get id(): number {
    return this.ID;
  }

  get name(): string {
    return this.NAME;
  }

  get CHECKED(): boolean {
    return this._CHECKED;
  }

  set CHECKED(value: boolean) {
    this._CHECKED = value;
  }

  get EmployeeChangeGroups(): EmployeeChangeGroup[] {
    return this.EMPLOYEECHANGEGROUPS;
  }
}

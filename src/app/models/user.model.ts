import {EmployeeChangeGroup, EmployeeChangeGroupJson} from './EmployeeChangeGroup.model';

export interface EmployeeJson{
  organizationParts: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  employeeChangeGroups: EmployeeChangeGroupJson[];
}

export class Employee {
  private _ID: number;
  constructor(
    private _ORGANIZATIONPARTS: string,
    private _FIRSTNAME: string,
    private _LASTNAME: string,
    private _EMAIL: string,
    private _EMPLOYEECHANGEGROUPS: EmployeeChangeGroup[]
  ) {}

  static fromJSON(json: EmployeeJson): Employee {
    if (json !== undefined){
      const user = new Employee(
        json.organizationParts,
        json.firstName,
        json.lastName,
        json.email,
        // tslint:disable-next-line:max-line-length
        json.employeeChangeGroups === null || json.employeeChangeGroups === undefined ? null : json.employeeChangeGroups.map(EmployeeChangeGroup.fromJSON)
      );
      user._ID = json.id;
      return user;
    }
    return null;
  }

  toJSON(): EmployeeJson {
    // @ts-ignore
    return {
      organizationParts: this._ORGANIZATIONPARTS,
      firstName: this._FIRSTNAME,
      lastName: this._LASTNAME,
      email: this._EMAIL,
      // tslint:disable-next-line:max-line-length
      employeeChangeGroups: this._EMPLOYEECHANGEGROUPS === null || this._EMPLOYEECHANGEGROUPS === undefined ? null : this._EMPLOYEECHANGEGROUPS.map(obj => obj.toJson())
    } as EmployeeJson;
  }

  get ID(): number {
    return this._ID;
  }

  get ORGANIZATIONPARTS(): string {
    return this._ORGANIZATIONPARTS;
  }

  get EMPLOYEECHANGEGROUPS(): EmployeeChangeGroup[] {
    return this._EMPLOYEECHANGEGROUPS;
  }

  get FIRSTNAME(): string {
    return this._FIRSTNAME;
  }

  get LASTNAME(): string {
    return this._LASTNAME;
  }

  get EMAIL(): string {
    return this._EMAIL;
  }
  FULLNAME(): string{
    return this._FIRSTNAME + ' ' + this._LASTNAME;
  }

}


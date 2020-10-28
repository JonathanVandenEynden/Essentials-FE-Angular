import {ChangeInitiative, ChangeInitiativeJson} from './change.model';
import {EmployeeOrganizationPart} from './EmployeeOrganizationPart.model';

export interface ChangemanagerJson {
  id: number;
  firstName: string;
  lastName: string;
  employeeOrganizationParts: EmployeeOrganizationPart[];
  changeInitiatives: ChangeInitiativeJson[];
}
export class Changemanager {
  private _ID: number;
  constructor(
    private _FIRSTNAME: string,
    private _LASTNAME: string,
    private _EMPLOYEEORGANIZATIONPARTS: EmployeeOrganizationPart[],
    private _CHANGEINITIATIVES: ChangeInitiative[]
  ) {}

  static fromJSON(json: ChangemanagerJson): Changemanager {
    const changeManager = new Changemanager(
      json.firstName,
      json.lastName,
      json.employeeOrganizationParts,
      json.changeInitiatives.map(ChangeInitiative.fromJSON)
    );
    changeManager._ID = json.id;
    return changeManager;
  }

  toJSON(): ChangemanagerJson {
    // @ts-ignore
    return {
      firstName: this._FIRSTNAME,
      lastName: this._LASTNAME,
      employeeOrganizationParts: this._EMPLOYEEORGANIZATIONPARTS,
      changeInitiatives: this._CHANGEINITIATIVES
    } as ChangemanagerJson;
  }
  get ID(): number {
    return this._ID;
  }

  get FIRSTNAME(): string {
    return this._FIRSTNAME;
  }

  get LASTNAME(): string {
    return this._LASTNAME;
  }

  get EMPLOYEEORGANIZATIONPARTS(): EmployeeOrganizationPart[] {
    return this._EMPLOYEEORGANIZATIONPARTS;
  }

  get CHANGEINITIATIVES(): ChangeInitiative[] {
    return this._CHANGEINITIATIVES;
  }
}

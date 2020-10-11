import {ChangeInitiative, ChangeInitiativeJson} from './change.model';

export interface ChangemanagerJson {
  Id: number;
  firstName: string;
  lastName: string;
  country: string;
  office: string;
  factory: string;
  department: string;
  team: string;
  changeInitiatives: ChangeInitiativeJson[];
}
export class Changemanager {
  private _ID: number;
  constructor(
    private _FIRSTNAME: string,
    private _LASTNAME: string,
    private _COUNTRY: string,
    private _OFFICE: string,
    private _FACTORY: string,
    private _DEPARTMENT: string,
    private _TEAM: string,
    private _CHANGEINITIATIVES: ChangeInitiative[]
  ) {}

  static fromJSON(json: ChangemanagerJson): Changemanager {
    const changeManager = new Changemanager(
      json.firstName,
      json.lastName,
      json.country,
      json.office,
      json.factory,
      json.department,
      json.team,
      json.changeInitiatives.map(ChangeInitiative.fromJSON)
    );
    changeManager._ID = json.Id;
    return changeManager;
  }

  toJSON(): ChangemanagerJson {
    // @ts-ignore
    return {
      firstName: this._FIRSTNAME,
      lastName: this._LASTNAME,
      country: this._COUNTRY,
      office: this._OFFICE,
      factory: this._FACTORY,
      department: this._DEPARTMENT,
      team: this._TEAM,
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

  get COUNTRY(): string {
    return this._COUNTRY;
  }
  get OFFICE(): string {
    return this._OFFICE;
  }
  get FACTORY(): string {
    return this._FACTORY;
  }
  get DEPARTMENT(): string {
    return this._DEPARTMENT;
  }
  get TEAM(): string {
    return this._TEAM;
  }
  get CHANGEINITIATIVES(): ChangeInitiative[] {
    return this._CHANGEINITIATIVES;
  }
}

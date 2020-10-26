
export interface EmployeeJson{
  organizationParts: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class Employee {
  private _ID: number;
  constructor(
    private _ORGANIZATIONPARTS: string,
    private _FIRSTNAME: string,
    private _LASTNAME: string,
    private _EMAIL: string,
  ) {}

  static fromJSON(json: EmployeeJson): Employee {
    const user = new Employee(
      json.organizationParts,
      json.firstName,
      json.lastName,
      json.email
    );
    user._ID = json.id;
    return user;
  }

  toJSON(): EmployeeJson {
    // @ts-ignore
    return {
      organizationParts: this._ORGANIZATIONPARTS,
      firstName: this._FIRSTNAME,
      lastName: this._LASTNAME,
      email: this._EMAIL
    } as EmployeeJson;
  }

  get ID(): number {
    return this._ID;
  }

  get ORGANIZATIONPARTS(): string {
    return this._ORGANIZATIONPARTS;
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


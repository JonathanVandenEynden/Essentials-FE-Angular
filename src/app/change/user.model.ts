
export interface UserJson{
  organizationParts: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class User {
  private _ID: number;
  constructor(
    private _ORGANIZATIONPARTS: string,
    private _FIRSTNAME: string,
    private _LASTNAME: string,
    private _EMAIL: string,
  ) {}

  static fromJSON(json: UserJson): User {
    const user = new User(
      json.organizationParts,
      json.firstName,
      json.lastName,
      json.email
    );
    user._ID = json.id;
    return user;
  }

  toJSON(): UserJson {
    // @ts-ignore
    return {
      organizationParts: this._ORGANIZATIONPARTS,
      firstName: this._FIRSTNAME,
      lastName: this._LASTNAME,
      email: this._EMAIL
    } as UserJson;
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

}


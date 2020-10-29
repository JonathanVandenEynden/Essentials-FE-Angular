import {Employee, EmployeeJson} from './user.model';

export interface ChangeGroupJson{
  id: number;
  name: string;
  users: EmployeeJson[];
}

export class ChangeGroup {
  private ID: number;
  constructor(
    private NAME: string,
    private USERS: Employee[]
  ) {}

  static fromJSON(json: ChangeGroupJson): ChangeGroup {
    const changegroup = new ChangeGroup(
      json.name,
      json.users.map(Employee.fromJSON)
    );
    changegroup.ID = json.id;
    return changegroup;
  }

  toJSON(): ChangeGroupJson {
    // @ts-ignore
    return {
      name: this.NAME,
      users: this.USERS
    } as ChangeGroupJson;
  }
  get id(): number {
    return this.ID;
  }
  get name(): string{
    return this.NAME;
  }
  get users(): Employee[]{
    return this.USERS;
  }
}


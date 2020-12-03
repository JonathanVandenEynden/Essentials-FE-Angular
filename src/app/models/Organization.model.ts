import {Employee, EmployeeJson} from './user.model';
import {Changemanager, ChangemanagerJson} from './changemanager.model';
import {OrganizationPart, OrganizationPartJson} from './OrganizationPart.model';

export interface OrganizationJson {
  id: number;
  name: string;
  employees: EmployeeJson[];
  changeManagers: ChangemanagerJson[];
  organizationParts: OrganizationPartJson[];
  // portfolio: string; // TODO portfolio ophalen
}

export class Organization {
  private id: number;

  constructor(
    private name: string,
    private employees: Employee[],
    private changeManagers: Changemanager[],
    private organizationParts: OrganizationPart[],
    // private portfolio: string // TODO portfolio ophalen
  ) {
  }

  static fromJSON(json: OrganizationJson): Organization {
    const org = new Organization(
      json.name,
      json.employees === null ? null :  json.employees.map(Employee.fromJSON),
      json.changeManagers === null ? null :  json.changeManagers.map(Changemanager.fromJSON),
      json.organizationParts === null ? null : json.organizationParts.map(OrganizationPart.fromJSON)
    );
    org.id = json.id;
    return org;
  }

  toJson(): OrganizationJson {
    return {
      id: this.id,
      name: this.name,
      employees: this.employees.map(e => e.toJSON()),
      changeManagers: this.changeManagers.map(e => e.toJSON()),
      organizationParts: this.organizationParts.map(e => e.toJson())
    } as OrganizationJson;
  }

  get Id(): number {
    return this.id;
  }

  get Name(): string {
    return this.name;
  }

  get Employees(): Employee[] {
    return this.employees;
  }

  get ChangeManagers(): Changemanager[] {
    return this.changeManagers;
  }

  get OrganizationParts(): OrganizationPart[] {
    return this.organizationParts;
  }
}

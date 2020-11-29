import {EmployeeOrganizationPart, EmployeeOrganizationPartJson} from './EmployeeOrganizationPart.model';

export interface OrganizationPartJson{
  id: number;
  name: string;
  employeeOrganizationParts: EmployeeOrganizationPartJson[];
  type: number;
}


export class OrganizationPart {
  private id: number;
  constructor(
    private name: string,
    private employeeOrganizationParts: EmployeeOrganizationPart[],
    private type: number
  ) {}

  static fromJSON(json: OrganizationPartJson): OrganizationPart{
    const part = new OrganizationPart(
      json.name,
      json.employeeOrganizationParts === null ? null : json.employeeOrganizationParts.map(EmployeeOrganizationPart.fromJSON),
      json.type
    );
    part.id = json.id;
    return part;
  }
  toJson(): OrganizationPartJson{
    return {
      id: this.id,
      name: this.name,
      employeeOrganizationParts: this.employeeOrganizationParts.map(t => t.toJson()),
      type: this.type
    } as OrganizationPartJson;
  }
  get Id(): number{
    return this.id;
  }
  get Name(): string{
    return this.name;
  }
  get EmployeeOrganizationPart(): EmployeeOrganizationPart[]{
    return this.employeeOrganizationParts;
  }
  get Type(): number{
    return this.type;
  }
}

import {EmployeeOrganizationPart, EmployeeOrganizationPartJson} from './EmployeeOrganizationPart.model';

export interface OrganizationPartJson{
  id: number;
  name: string;
  employeeOrganizationParts: EmployeeOrganizationPartJson[];
  type: number;
}


export class OrganizationPart {
  private _organizationParts = ['Country', 'Department', 'Factory', 'Office', 'Team'];
  private _id: number;
  constructor(
    private _name: string,
    private _employeeOrganizationParts: EmployeeOrganizationPart[],
    private _type: number
  ) {}

  static fromJSON(json: OrganizationPartJson): OrganizationPart{
    const part = new OrganizationPart(
      json.name,
      json.employeeOrganizationParts === null ? null : json.employeeOrganizationParts.map(EmployeeOrganizationPart.fromJSON),
      json.type
    );
    part._id = json.id;
    return part;
  }
  toJson(): OrganizationPartJson{
    return {
      id: this._id,
      name: this._name,
      employeeOrganizationParts: this._employeeOrganizationParts.map(t => t.toJson()),
      type: this._type
    } as OrganizationPartJson;
  }
  get Id(): number{
    return this._id;
  }
  get Name(): string{
    return this._name;
  }
  get EmployeeOrganizationPart(): EmployeeOrganizationPart[]{
    return this._employeeOrganizationParts;
  }
  get Type(): number{
    return this._type;
  }
  get TypeString(): string{
    return this._organizationParts[this.Type];
  }
}

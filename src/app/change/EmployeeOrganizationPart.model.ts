import {OrganizationPart, OrganizationPartJson} from './OrganizationPart.model';
import {Employee, EmployeeJson} from './user.model';

export interface EmployeeOrganizationPartJson {
  employeeId: number;
  employee: EmployeeJson;
  organizationPartId: number;
  organizationPart: OrganizationPartJson;
}

export class EmployeeOrganizationPart {
  private employeeId: number;
  private organizationPartId: number;

  constructor(
    private employee: Employee,
    private organizationPart: OrganizationPart
  ) {}

  static fromJSON(json: EmployeeOrganizationPartJson): EmployeeOrganizationPart{
    const eop = new EmployeeOrganizationPart(
      Employee.fromJSON(json.employee),
      OrganizationPart.fromJSON(json.organizationPart));
    eop.employeeId = json.employeeId;
    eop.organizationPartId = json.organizationPartId;
    return eop;
  }
  toJson(): EmployeeOrganizationPartJson{
    return {
      employeeId: this.employeeId,
      employee: this.employee.toJSON(),
      organizationPartId: this.organizationPartId,
      organizationPart: this.organizationPart.toJson()
    } as EmployeeOrganizationPartJson;
  }
  get EmployeeId(): number{
    return this.employeeId;
  }
  get Employee(): Employee{
    return this.employee;
  }
  get OrganizationPartId(): number{
    return this.organizationPartId;
  }
  get OrganizationPart(): OrganizationPart{
    return this.organizationPart;
  }
}

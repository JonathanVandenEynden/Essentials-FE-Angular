import { OrganizationPart } from './OrganizationPart.model';
import {Employee} from './user.model';

export interface EmployeeOrganizationPartJson {
  employeeId: number;
  employee: Employee;
  organizationPartId: number;
  organizationPart: OrganizationPart;
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
      json.employee,
      json.organizationPart);
    eop.employeeId = json.employeeId;
    eop.organizationPartId = json.organizationPartId;
    return eop;
  }
  toJson(): EmployeeOrganizationPartJson{
    return {
      employeeId: this.employeeId,
      employee: this.employee,
      organizationPartId: this.organizationPartId,
      organizationPart: this.organizationPart
    };
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

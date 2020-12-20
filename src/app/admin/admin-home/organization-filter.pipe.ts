import { Pipe, PipeTransform } from '@angular/core';
import {Organization} from '../../models/Organization.model';

@Pipe({
  name: 'organizationFilter'
})
export class OrganizationFilterPipe implements PipeTransform {

  transform(organizations: Organization[], name: string): Organization[] {
    if (!name || name.length === 0) {
      return organizations;
    }
    return organizations.filter(o => o.Name.toLowerCase().startsWith(name.toLowerCase())
    );
  }

}

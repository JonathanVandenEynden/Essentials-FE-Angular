import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Organization} from '../../models/Organization.model';

@Component({
  selector: 'app-admin-organization',
  templateUrl: './admin-organization.component.html',
  styleUrls: ['./admin-organization.component.css']
})
export class AdminOrganizationComponent implements OnInit {
  public organization: Organization;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => {
      this.organization = item.organization;
      this.organization.OrganizationParts.sort((n1, n2) => {
        if (n1.Name > n2.Name) {
          return 1;
        }
        if (n1.Name < n2.Name) {
          return -1;
        }
        return 0;
      }).sort((n1, n2) => {
        if (n1.Type > n2.Type) {
          return 1;
        }
        if (n1.Type < n2.Type) {
          return -1;
        }
        return 0;
      });

      this.organization.ChangeManagers.sort((n1, n2) => {
        if (n1.FIRSTNAME > n2.FIRSTNAME) {
          return 1;
        }
        if (n1.FIRSTNAME < n2.FIRSTNAME) {
          return -1;
        }
        return 0;
      }).sort((n1, n2) => {
        if (n1.LASTNAME > n2.LASTNAME) {
          return 1;
        }
        if (n1.LASTNAME < n2.LASTNAME) {
          return -1;
        }
        return 0;
      });

      this.organization.Employees.sort((n1, n2) => {
        if (n1.FIRSTNAME > n2.FIRSTNAME) {
          return 1;
        }
        if (n1.FIRSTNAME < n2.FIRSTNAME) {
          return -1;
        }
        return 0;
      });
    });
  }

}

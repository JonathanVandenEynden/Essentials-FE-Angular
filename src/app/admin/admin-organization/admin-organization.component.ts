import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faHome, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Organization} from '../../models/Organization.model';


@Component({
  selector: 'app-admin-organization',
  templateUrl: './admin-organization.component.html',
  styleUrls: ['./admin-organization.component.css']
})
export class AdminOrganizationComponent implements OnInit {
  faHome = faHome;
  faArrowLeft = faArrowLeft;
  public organization: Organization;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => {
      this.organization = item.organization;
      this.organization.OrganizationParts.sort((n1, n2) => {
        if (n1.Name.toLocaleLowerCase() > n2.Name.toLocaleLowerCase()) {
          return 1;
        }
        if (n1.Name.toLocaleLowerCase() < n2.Name.toLocaleLowerCase()) {
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
        if (n1.FIRSTNAME.toLocaleLowerCase() > n2.FIRSTNAME.toLocaleLowerCase()) {
          return 1;
        }
        if (n1.FIRSTNAME.toLocaleLowerCase() < n2.FIRSTNAME.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      }).sort((n1, n2) => {
        if (n1.LASTNAME.toLocaleLowerCase() > n2.LASTNAME.toLocaleLowerCase()) {
          return 1;
        }
        if (n1.LASTNAME.toLocaleLowerCase() < n2.LASTNAME.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      });

      this.organization.Employees.sort((n1, n2) => {
        if (n1.FIRSTNAME.toLocaleLowerCase() > n2.FIRSTNAME.toLocaleLowerCase()) {
          return 1;
        }
        if (n1.FIRSTNAME.toLocaleLowerCase() < n2.FIRSTNAME.toLocaleLowerCase()) {
          return -1;
        }
        return 0;
      });
    });
  }

  NavigateToAdminHome(): void {
    this.router.navigate(['admin/home']);
  }

}

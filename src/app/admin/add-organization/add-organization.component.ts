import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
  public organizationName: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createOrganization(): void {
    // TODO
  }
}

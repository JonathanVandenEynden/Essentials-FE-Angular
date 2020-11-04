import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMessage = '';

  constructor(private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if(true){
      this.router.navigate(['dashboard/project']);
    } else{
      this.errorMessage = `Could not login`;
    }

  }

}

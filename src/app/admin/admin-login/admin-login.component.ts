import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public user: FormGroup;
  public errorMessage = '';
  public faArrowRight = faArrowRight;

  constructor(private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (true){
      this.router.navigate(['admin/home']);
    } else{
      this.errorMessage = `Could not login`;
    }

  }

}

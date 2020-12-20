import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../../user/authentication.service';

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
              private fb: FormBuilder,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.authenticationService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        (val) => {
          if (val && this.authenticationService.role === 'admin') {
            if (this.authenticationService.redirectUrl) {
              this.router.navigateByUrl(this.authenticationService.redirectUrl);
              this.authenticationService.redirectUrl = undefined;
            } else {
              this.router.navigate(['admin/home']);
            }
          } else {
            this.errorMessage = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `Error while trying to login user ${this.user.value.username}: ${err.error.message}`;
          } else {
            this.errorMessage = `Error ${err.status} while trying to login user ${this.user.value.username}: ${err.error}`;
          }
        }
      );

  }

}

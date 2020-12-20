import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {faChartLine, faInfoCircle, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  faUser = faUser;
  faInfo = faInfoCircle;
  faSignOut = faSignOutAlt;
  faActivity = faChartLine;
  public loggedInUser$ = this._authenticationService.user$;

  // tslint:disable-next-line:variable-name
  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this._authenticationService.logout();
    this._router.navigate(['../../user/login']);
  }
}

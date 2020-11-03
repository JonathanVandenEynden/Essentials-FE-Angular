import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Changemanager} from '../../change/changemanager.model';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  faSignInAlt = faSignInAlt;
  faUser = faUser;
  loggedInUser$ = 'Sukrit';


  // tslint:disable-next-line:variable-name
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  routeAccount(): void {
    this._router.navigate(['../../account']);
  }

  routeSignOut(): void {
    this._router.navigate(['../../user/logIn']);
  }

}

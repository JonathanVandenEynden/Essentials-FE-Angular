import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {faInfoCircle, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../../user/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  enteredButton = false;
  isMatMenuOpen = false;
  prevButtonTrigger;
  faInfo = faInfoCircle;
  faSignInAlt = faSignInAlt;
  faUser = faUser;
  loggedInUser$ = this._authenticationService.user$;

  // tslint:disable-next-line:variable-name
  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  routeAccount(): void {
    this._router.navigate(['/user/account']);
  }

  routeSignOut(): void {
    this._authenticationService.logout();
    this._router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  buttonEnter(trigger) {
    trigger.openMenu();
    /*setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger != trigger){
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        trigger.openMenu();
        this.ren.removeClass(trigger.menu.items.first._elementRef.nativeElement, 'cdk-focused');
        this.ren.removeClass(trigger.menu.items.first._elementRef.nativeElement, 'cdk-program-focused');
      }
      else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
        this.ren.removeClass(trigger.menu.items.first._elementRef.nativeElement, 'cdk-focused');
        this.ren.removeClass(trigger.menu.items.first._elementRef.nativeElement, 'cdk-program-focused');
      }
      else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });*/
  }
}

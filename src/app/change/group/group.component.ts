import { Component, OnInit } from '@angular/core';
import {AnimationItem} from 'lottie-web';
import {AnimationOptions, BMCompleteEvent} from 'ngx-lottie';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animations/add_Done.json',
  };
  // tslint:disable-next-line:variable-name
  constructor(public _router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onAnimationCreated(animation: AnimationItem) {
    animation.loop = false;
  }

  // tslint:disable-next-line:typedef
  onAnimationComplete($event: BMCompleteEvent) {
    this._router.navigate(['/home']);
  }
}

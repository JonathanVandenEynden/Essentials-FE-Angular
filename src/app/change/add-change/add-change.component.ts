import { Component, OnInit } from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {Changemanager} from '../changemanager.model';
import mockChange from '../mockChange.json';

@Component({
  selector: 'app-add-change',
  templateUrl: './add-change.component.html',
  styleUrls: ['./add-change.component.css']
})
export class AddChangeComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/animations/animation.json',
  };
  faPen = faPen;
  public changeManager: Changemanager = Changemanager.fromJSON(mockChange);

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onAnimationCreated(animation: AnimationItem) {
    animation.loop = false;
  }

}

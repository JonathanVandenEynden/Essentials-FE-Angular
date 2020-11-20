import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeInitiative} from '../change.model';
import {faClipboard, faPen, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ChangeDataService} from '../change-data.service';
import {UserDataService} from '../user-data.service';
import {EMPTY, empty, Observable} from 'rxjs';
import {Employee} from '../user.model';
import {catchError} from 'rxjs/operators';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-update-change',
  templateUrl: './update-change.component.html',
  styleUrls: ['./update-change.component.css']
})
export class UpdateChangeComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  options_E: AnimationOptions = {
    path: '/assets/animations/update_E.json',
  };
  // tslint:disable-next-line:variable-name
  options_S: AnimationOptions = {
    path: '/assets/animations/update_S.json',
  };
  public change: ChangeInitiative;
  faClip = faClipboard;
  faGroup = faUsers;
  faRoad = faRoute;
  faPen = faPen;
  // tslint:disable-next-line:variable-name
  update_S = false;
  // tslint:disable-next-line:variable-name
  update_E = false;
  public changeForm: FormGroup;
  // tslint:disable-next-line:variable-name
  private _fetchUsers$: Observable<Employee[]>;
  public errorMessage = '';
  public confirmationMessage = '';
  public changeTypes = ['Economical', 'Organizational', 'Personal', 'Technological'];
  private animationItem: AnimationItem;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private changeDataService: ChangeDataService, private userDataService: UserDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.change = item.change);
    this._fetchUsers$ = this.userDataService.users$.pipe(catchError(err => { this.errorMessage = err;  return empty; }));
    // tslint:disable-next-line:max-line-length
    this.changeForm = this.fb.group({name: [this.change.name], description: [this.change.description], startDate: [this.change.startDate], endDate: [this.change.endDate], changetype: [this.changeTypes[0]], changesponsor: [this.change.sponsor]});
  }


  get users$(): Observable<Employee[]>
  {
    return this._fetchUsers$;
  }
  onSubmit(): void {
    let difference = false;
    if (this.change.name !== this.changeForm.value.name)
    {
      this.change.NAME(this.changeForm.value.name);
      difference = true;
    }
    if (this.change.description !== this.changeForm.value.description)
    {
      this.change.DESCRIPTION(this.changeForm.value.description);
      difference = true;
    }
    if (this.change.startDate !== this.changeForm.value.startDate)
    {
      this.change.STARTDATE(this.changeForm.value.startDate);
      difference = true;
    }
    if (this.change.endDate !== this.changeForm.value.endDate)
    {
      this.change.ENDDATE(this.changeForm.value.endDate);
      difference = true;
    }
    if (this.change.sponsor !== this.changeForm.value.changesponsor)
    {
      this.change.CHANGESPONSOR(this.changeForm.value.sponsor);
      difference = true;
    }

    if (difference)
    {
      // tslint:disable-next-line:max-line-length
      this.changeDataService.updateChange(this.change).pipe(catchError((err) => { this.update_E = true; this.errorMessage = err; return EMPTY; })).subscribe((change: ChangeInitiative) => {
        this.update_S = true;
        this.confirmationMessage = `The change initiative ${change.name} was successfully updated`;
      });
    }
  }
  // tslint:disable-next-line:typedef
  onAnimationCreated(animation: AnimationItem) {
    this.animationItem = animation;
    this.animationItem.setSpeed(2);
    animation.loop = false;
  }
  // tslint:disable-next-line:typedef
  getErrorMessage(errors: any)
  {
    if (errors.required)
    {
      return 'is required';
    }
  }
  // tslint:disable-next-line:typedef
  updateRoadmap(){
    this.router.navigate(['roadmap', this.change.id]);
  }
  // // tslint:disable-next-line:typedef
  // updateSurvey(){
  //   this.router.navigate(['roadmapView/update']);
  // }
  // tslint:disable-next-line:typedef
  updateGroup(){
    this.router.navigate(['group/update']);
  }
}

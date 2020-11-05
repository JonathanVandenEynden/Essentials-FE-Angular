import { Component, OnInit } from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {faCheck, faPen} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {catchError} from 'rxjs/operators';
import {ChangeDataService} from '../change-data.service';
import {empty, Observable} from 'rxjs';
import {ChangeInitiative} from '../change.model';
import {UserDataService} from '../user-data.service';
import {Employee} from '../user.model';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';


function validateDates(control: FormGroup): { [key: string]: any } {
  if (control.get('endDate').value < control.get('startDate').value)
  {
    return { endBeforeStart: true };
  }
  return null;
}

function validateStartDate(control: FormControl): { [key: string]: any } {
  const now = new Date(Date.now());
  if (control.value < now.toISOString().split('T')[0]) {
    return { dateNotInFuture: true };
  }
  return null;
}
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
  faCheck = faCheck;
  public changeForm: FormGroup;
  // tslint:disable-next-line:variable-name
  private _fetchChanges$: Observable<ChangeInitiative[]>;
  // tslint:disable-next-line:variable-name
  private _fetchUsers$: Observable<Employee[]>;
  public errorMessage = '';
  public changeTypes = ['Economical', 'Organizational', 'Personal', 'Technological'];
  public added = false;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public router: Router, public dialog: MatDialog, private changeDataService: ChangeDataService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this._fetchChanges$ = this.changeDataService.changes$.pipe(catchError(err => { this.errorMessage = err;  return empty; }));
    this._fetchUsers$ = this.userDataService.users$.pipe(catchError(err => { this.errorMessage = err;  return empty; }));
    // tslint:disable-next-line:max-line-length
    this.changeForm = this.fb.group({name: [''], description: [''], startDate: ['', validateStartDate], endDate: [''], changetype: [''], changesponsor: ['']}, {validator: validateDates});
  }

  get changes$(): Observable<ChangeInitiative[]>
  {
    return this._fetchChanges$;
  }

  get users$(): Observable<Employee[]>
  {
    return this._fetchUsers$;
  }

  // tslint:disable-next-line:typedef
  onAnimationCreated(animation: AnimationItem) {
    animation.loop = false;
  }
  onSubmit(): void {
    // tslint:disable-next-line:max-line-length
    this.changeDataService.addNewChange(new ChangeInitiative(this.changeForm.value.name, this.changeForm.value.description, this.changeForm.value.startDate, this.changeForm.value.endDate, null, this.changeForm.value.changesponsor, []));
    this.added = true;
    window.scrollTo(0, 0);
  }
  // tslint:disable-next-line:typedef
  addRoadmap(){
    this.router.navigate(['/home']);
  }
  // tslint:disable-next-line:typedef
  getErrorMessage(errors: any)
  {
    if (errors.required)
    {
      return 'is required';
    }
    else if (errors.dateNotInFuture)
    {
      return 'The start date should be in the future';
    }
    else if (errors.endBeforeStart)
    {
      return 'The end date should be after the start date';
    }
  }

}

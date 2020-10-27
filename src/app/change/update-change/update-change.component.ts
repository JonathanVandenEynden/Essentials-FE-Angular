import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeInitiative} from '../change.model';
import {faClipboard, faPen, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ChangeDataService} from '../change-data.service';
import {UserDataService} from '../user-data.service';
import {empty, Observable} from 'rxjs';
import {Employee} from '../user.model';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-update-change',
  templateUrl: './update-change.component.html',
  styleUrls: ['./update-change.component.css']
})
export class UpdateChangeComponent implements OnInit {
  public change: ChangeInitiative;
  faClip = faClipboard;
  faGroup = faUsers;
  faRoad = faRoute;
  faPen = faPen;
  public changeForm: FormGroup;
  // tslint:disable-next-line:variable-name
  private _fetchUsers$: Observable<Employee[]>;
  public errorMessage = '';
  public changeTypes = ['Economical', 'Organizational', 'Personal', 'Technological'];

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
    // tslint:disable-next-line:max-line-length
    this.changeDataService.addNewChange(new ChangeInitiative(this.changeForm.value.name, this.changeForm.value.description, this.changeForm.value.startDate, this.changeForm.value.endDate, this.changeForm.value.changesponsor, []));
    this.changeForm = this.fb.group({name: [''], description: [''], startDate: [''], endDate: [''], changetype: [''], changesponsor: ['']});
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
    this.router.navigate(['roadmap/update']);
  }
  // tslint:disable-next-line:typedef
  updateSurvey(){
    this.router.navigate(['survey/update']);
  }
  // tslint:disable-next-line:typedef
  updateGroup(){
    this.router.navigate(['group/update']);
  }

}

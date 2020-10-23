import { Component, OnInit } from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {catchError} from 'rxjs/operators';
import {ChangeDataService} from '../change-data.service';
import {empty, Observable} from 'rxjs';
import {ChangeInitiative} from '../change.model';

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
  public changeForm: FormGroup;
  // tslint:disable-next-line:variable-name
  private _fetchChanges$: Observable<ChangeInitiative[]>;
  public errorMessage = '';
  public changeTypes = ['Economical', 'Organizational', 'Personal', 'Technological'];

  constructor(private fb: FormBuilder, private changeDataService: ChangeDataService) { }
  get roadMap(): FormArray {
    return this.changeForm.get('roadMap') as FormArray;
  }
  ngOnInit(): void {
    this._fetchChanges$ = this.changeDataService.changes$.pipe(catchError(err => { this.errorMessage = err;  return empty; }));
    this.changeForm = this.fb.group({name: [''], description: [''], startDate: [''], endDate: [''], changetype: [''], changesponsor: ['']});
  }

  get changes$(): Observable<ChangeInitiative[]>
  {
    return this._fetchChanges$;
  }

  // tslint:disable-next-line:typedef
  onAnimationCreated(animation: AnimationItem) {
    animation.loop = false;
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

}

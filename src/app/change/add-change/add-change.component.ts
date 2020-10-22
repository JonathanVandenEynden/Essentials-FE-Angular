import { Component, OnInit } from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {Changemanager} from '../changemanager.model';
import mockChange from '../mockChange.json';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged} from 'rxjs/operators';
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
  public changeManager: Changemanager = Changemanager.fromJSON(mockChange);
  public changeForm: FormGroup;
  // tslint:disable-next-line:variable-name
  private _fetchChanges$: Observable<ChangeInitiative[]>;
  public errorMessage = '';

  constructor(private fb: FormBuilder, private changeDataService: ChangeDataService) { }
  get roadMap(): FormArray {
    return this.changeForm.get('roadMap') as FormArray;
  }
  ngOnInit(): void {
    this._fetchChanges$ = this.changeDataService.changes$.pipe(catchError(err => { this.errorMessage = err;  return empty; }));
    this.changeForm = this.fb.group({title: [''], startDate: [''], endDate: [''], roadMap: this.fb.array([this.createRoadmap()])
    });
    this.roadMap.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((list) => {
        // if the last entry's name is typed, add a new empty one
        // if we're removing an entry's name, and there is an empty one after that one, remove the empty one
        const lastElement = list[list.length - 1];

        if (lastElement.name && lastElement.name.length > 2) {
          this.roadMap.push(this.createRoadmap());
        } else if (list.length >= 2) {
          const secondToLast = list[list.length - 2];
          if (
            !lastElement.name &&
            !lastElement.amount &&
            !lastElement.unit &&
            (!secondToLast.name || secondToLast.name.length < 2)
          ) {
            this.roadMap.removeAt(this.roadMap.length - 1);
          }
        }
      });
  }

  get changes$(): Observable<ChangeInitiative[]>
  {
    return this._fetchChanges$;
  }

  createRoadmap(): FormGroup {
    return this.fb.group(
      {
        itemName: [''],
        startDate: [''],
        endDate: [''],
      }
    );
  }

  // tslint:disable-next-line:typedef
  onAnimationCreated(animation: AnimationItem) {
    animation.loop = false;
  }

}

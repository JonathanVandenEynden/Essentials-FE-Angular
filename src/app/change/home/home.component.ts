import { Component, OnInit } from '@angular/core';
import {faEdit, faFilter, faPlus, faSyncAlt, faTachometerAlt, faTrash, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from 'rxjs';
import {ChangeInitiative} from '../change.model';
import {ChangeDataService} from '../change-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faTachometer = faTachometerAlt;
  faSync = faSyncAlt;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faUsers = faUsers;
  faFilter = faFilter;
  filter: any;
  value = 0;
  checked1 = false;
  public filterChangesNames = {group: '', progress: 0};
  // tslint:disable-next-line:variable-name
  private _fetchChanges$: Observable<ChangeInitiative[]>;
  // tslint:disable-next-line:variable-name
  public _filterChanges$ = new Subject<any>();
  public errorMessage = '';
  public added = true;


  // tslint:disable-next-line:variable-name
  constructor(private _router: Router, private changeDataService: ChangeDataService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._filterChanges$
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe((val) => {
        let params;
        if (this.checked1 && this.value !== 0)
        {
          if (this.filterChangesNames.group === '')
          {
            // tslint:disable-next-line:max-line-length
            params = val ? { queryParams: { group: val, progress: this.filterChangesNames.progress } } : undefined; // Aparte naam voor group en progress
          }
          else
          {
            // tslint:disable-next-line:max-line-length
            params = val ? { queryParams: { group: this.filterChangesNames.group, progress: this.value } } : undefined; // Aparte naam voor group en progress
          }
        }
        else
        {
          if (this.checked1)
          {
            params = val ? { queryParams: { group: val, progress: null } } : undefined; // Aparte naam voor group en progress
          }
          else
          {
            params = val ? { queryParams: { group: null, progress: val } } : undefined; // Aparte naam voor group en progress
          }
        }
        this._router.navigate(['/change/home'], params);
      });

    this._fetchChanges$ = this._route.queryParams
      .pipe(
        switchMap((newParams) => {
          if (newParams.group || newParams.progress) {
            this.filterChangesNames.group = newParams.group == null ? this.filterChangesNames.group : newParams.group;
            // tslint:disable-next-line:max-line-length
            this.filterChangesNames.progress = newParams.progress == null ? this.filterChangesNames.progress : newParams.progress;
          }
          return this.changeDataService.getChanges$(newParams.group, newParams.progress);
          // Alle twee => return this.changeDataService.getChanges$({progress: , group: },newParams.filter);
        })
      )
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
    /*this._filterChanges$.pipe(distinctUntilChanged(), debounceTime(250)).subscribe(
      val => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(['/change/home'], params);
      }
    );
    this._fetchChanges$ = this._route.queryParams.pipe(switchMap(params => {
      if (params.filter) {
        if (typeof params.filter === 'number')
        {
          this.value = params.filter;
        }
        this.filter = params.filter;
        this.checked1 = true;
      }
      return this.changeDataService.getChangesWithProgress$(params.filter);
    })).pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );*/
  }

  routeDashboard(): void {
    this._router.navigate(['dashboard/roadmapitem']);
  }

  addChangeEvent(): void {
    this._router.navigate(['add']);
  }

  get changes$(): Observable<ChangeInitiative[]>
  {
    return this._fetchChanges$;
  }

  // tslint:disable-next-line:typedef
  onCheckBoxClick() {
    if (this.checked1)
    {
      this._filterChanges$.next('All employees');
    }
    else
    {
      this._filterChanges$.next(this.filterChangesNames.progress);
    }
  }
}

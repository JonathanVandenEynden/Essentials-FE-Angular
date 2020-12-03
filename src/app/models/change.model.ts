import {RoadmapItem, RoadmapItemJson} from './roadmapitem.model';
import {ChangeGroup, ChangeGroupJson} from './changegroup.model';
import {Employee, EmployeeJson} from './user.model';

export interface ChangeInitiativeJson{
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  changeGroup: ChangeGroupJson;
  changeSponsor: EmployeeJson;
  changeType: string;
  roadMap: RoadmapItemJson[];
  progress: number;
}

export class ChangeInitiative {
  private ID: number;
  constructor(
    private _NAME: string,
    private _DESCRIPTION: string,
    private _STARTDATE: string,
    private _ENDDATE: string,
    private _CHANGEGROUP: ChangeGroup,
    private _CHANGESPONSOR: Employee,
    private ROADMAP: RoadmapItem[],
    private _PROGRESS: number
  ) {}

  static fromJSON(json: any): ChangeInitiative {
    const change = new ChangeInitiative(
      json.name,
      json.description,
      json.startDate,
      json.endDate,
      ChangeGroup.fromJSON(json.changeGroup),
      Employee.fromJSON(json.changeSponsor),
      json.roadMap.map(RoadmapItem.fromJSON),
      json.progress
    );
    change.ID = json.id;
    return change;
  }

  toJSON(): ChangeInitiativeJson {
    // @ts-ignore
    return {
      name: this._NAME,
      description: this._DESCRIPTION,
      startDate: this._STARTDATE,
      endDate: this._ENDDATE,
      changeGroup: this._CHANGEGROUP,
      sponsor: this._CHANGESPONSOR,
      roadMap: this.ROADMAP,
      progress: this._PROGRESS
    } as ChangeInitiativeJson;
  }
  get id(): number {
    return this.ID;
  }
  get name(): string{
    return this._NAME;
  }
  // tslint:disable-next-line:typedef
  public NAME(value: string) {
    this._NAME = value;
  }
  get description(): string {
    return this._DESCRIPTION;
  }

  // tslint:disable-next-line:typedef
  public DESCRIPTION(value: string) {
    this._DESCRIPTION = value;
  }

  // tslint:disable-next-line:typedef
  public STARTDATE(value: string) {
    this._STARTDATE = value;
  }

  // tslint:disable-next-line:typedef
  public ENDDATE(value: string) {
    this._ENDDATE = value;
  }

  // tslint:disable-next-line:typedef
  public CHANGESPONSOR(value: Employee) {
    this._CHANGESPONSOR = value;
  }
  get CHANGEGROUP(): ChangeGroup {
    return this._CHANGEGROUP;
  }

  set CHANGEGROUP(value: ChangeGroup) {
    this._CHANGEGROUP = value;
  }

  get startDate(): string {
    return this._STARTDATE.split('T')[0];
  }
  get endDate(): string{
    return this._ENDDATE.split('T')[0];
  }
  get sponsor(): Employee{
    return this._CHANGESPONSOR;
  }
  get roadMap(): RoadmapItem[]{
    return this.ROADMAP;
  }

  get PROGRESS(): number {
    return this._PROGRESS;
  }

  set PROGRESS(value: number) {
    this._PROGRESS = value;
  }
}


import {RoadmapItem, RoadmapItemJson} from './roadmap/roadmapitem.model';
import {ChangeGroupJson} from './changegroup.model';
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
}

export class ChangeInitiative {
  private ID: number;
  constructor(
    private _NAME: string,
    private _DESCRIPTION: string,
    private _STARTDATE: string,
    private _ENDDATE: string,
    private _CHANGESPONSOR: Employee,
    private ROADMAP: RoadmapItem[]
  ) {}

  static fromJSON(json: any): ChangeInitiative {
    const change = new ChangeInitiative(
      json.name,
      json.description,
      json.startDate,
      json.endDate,
      Employee.fromJSON(json.changeSponsor),
      json.roadMap.map(RoadmapItem.fromJSON)
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
      sponsor: this._CHANGESPONSOR,
      roadMap: this.ROADMAP
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
  get progress(): number{
    let progress = 0;
    this.ROADMAP.forEach(e => e.done ? progress++ : progress);
    progress = (progress / this.ROADMAP.length) * 100;
    return progress;
  }
}


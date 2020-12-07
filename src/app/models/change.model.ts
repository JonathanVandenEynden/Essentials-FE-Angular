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
  private _ID: number;
  private _STARTDATE: Date;
  private _ENDDATE: Date;
  constructor(
    private _NAME: string,
    private _DESCRIPTION: string,
    private _STARTDATESTRING: string,
    private _ENDDATESTRING: string,
    private _CHANGEGROUP: ChangeGroup,
    private _CHANGESPONSOR: Employee,
    private _ROADMAP: RoadmapItem[],
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
    change.id = json.id;
    change.startDate = new Date(json.startDate);
    change.endDate = new Date(json.endDate);
    return change;
  }

  toJSON(): ChangeInitiativeJson {
    // @ts-ignore
    return {
      name: this._NAME,
      description: this._DESCRIPTION,
      startDate: this._STARTDATESTRING,
      endDate: this._ENDDATESTRING,
      changeGroup: this._CHANGEGROUP,
      sponsor: this._CHANGESPONSOR,
      roadMap: this._ROADMAP,
      progress: this._PROGRESS
    } as ChangeInitiativeJson;
  }

  get id(): number {
    return this._ID;
  }
  set id(value: number) {
    this._ID = value;
  }
  get name(): string{
    return this._NAME;
  }
  set name(value: string) {
    this._NAME = value;
  }
  get description(): string {
    return this._DESCRIPTION;
  }
  set description(value: string) {
    this._DESCRIPTION = value;
  }
  get startDateString(): string {
    return this._STARTDATESTRING.split('T')[0];
  }
  set startDateString(value: string) {
    this._STARTDATESTRING = value;
  }
  get endDateString(): string{
    return this._ENDDATESTRING.split('T')[0];
  }
  set endDateString(value: string) {
    this._ENDDATESTRING = value;
  }
  get sponsor(): Employee{
    return this._CHANGESPONSOR;
  }
  set sponsor(value: Employee) {
    this._CHANGESPONSOR = value;
  }
  get changegroup(): ChangeGroup {
    return this._CHANGEGROUP;
  }
  set changegroup(value: ChangeGroup) {
    this._CHANGEGROUP = value;
  }
  get roadMap(): RoadmapItem[]{
    return this._ROADMAP;
  }
  set roadMap(value: RoadmapItem[]){
    this._ROADMAP = value;
  }
  get progress(): number {
    return this._PROGRESS;
  }
  set progress(value: number) {
    this._PROGRESS = value;
  }

  get startDate(): Date {
    return this._STARTDATE;
  }
  set startDate(value: Date) {
    this._STARTDATE = value;
  }
  get endDate(): Date{
    return this._ENDDATE;
  }
  set endDate(value: Date) {
    this._ENDDATE = value;
  }
}


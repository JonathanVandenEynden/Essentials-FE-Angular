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
  private _id: number;
  private _startdate: Date;
  private _enddate: Date;
  constructor(
    private _name: string,
    private _description: string,
    private _startdatestring: string,
    private _enddatestring: string,
    private _changegroup: ChangeGroup,
    private _changesponsor: Employee,
    private _roadmap: RoadmapItem[],
    private _progress: number
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
      name: this._name,
      description: this._description,
      startDate: this._startdatestring,
      endDate: this._enddatestring,
      changeGroup: this._changegroup,
      sponsor: this._changesponsor,
      roadMap: this._roadmap,
      progress: this._progress
    } as ChangeInitiativeJson;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string{
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }
  get startDateString(): string {
    return this._startdatestring.split('T')[0];
  }
  set startDateString(value: string) {
    this._startdatestring = value;
  }
  get endDateString(): string{
    return this._enddatestring.split('T')[0];
  }
  set endDateString(value: string) {
    this._enddatestring = value;
  }
  get sponsor(): Employee{
    return this._changesponsor;
  }
  set sponsor(value: Employee) {
    this._changesponsor = value;
  }
  get changegroup(): ChangeGroup {
    return this._changegroup;
  }
  set changegroup(value: ChangeGroup) {
    this._changegroup = value;
  }
  get roadMap(): RoadmapItem[]{
    return this._roadmap;
  }
  set roadMap(value: RoadmapItem[]){
    this._roadmap = value;
  }
  get progress(): number {
    return this._progress;
  }
  set progress(value: number) {
    this._progress = value;
  }

  get startDate(): Date {
    return this._startdate;
  }
  set startDate(value: Date) {
    this._startdate = value;
  }
  get endDate(): Date{
    return this._enddate;
  }
  set endDate(value: Date) {
    this._enddate = value;
  }
}


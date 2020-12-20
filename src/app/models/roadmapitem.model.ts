import {Survey, SurveyJson} from './survey.model';

export interface RoadmapItemJson{
  id: number;
  title: string;
  assessment: SurveyJson;
  done: boolean;
  startDate: string;
  endDate: string;
  phase: number;
}

export class RoadmapItem {
  private _startDate: Date;
  private _endDate: Date;
  private _id: number;
  private _phase: number;
  constructor(
    private _title: string,
    private _survey: Survey,
    private _startDateString: string,
    private _endDateString: string,
    private _done: boolean
  ) {}

  static fromJSON(json: RoadmapItemJson): RoadmapItem {
    const roadmapItem = new RoadmapItem(
      json.title,
      Survey.fromJSON(json.assessment),
      json.startDate,
      json.endDate,
      json.done
    );
    roadmapItem._id = json.id;
    roadmapItem._phase = json.phase;
    roadmapItem.startDate = new Date(json.startDate);
    roadmapItem.endDate = new Date(json.endDate);
    return roadmapItem;
  }

  toJSON(): RoadmapItemJson {
    return {
      title: this.title,
      assessment: this._survey.toJSON(),
      startDate: this.startDateString,
      endDate: this.endDateString,
      done: this.done,
      phase: this.phase
    } as RoadmapItemJson;
  }
  get id(): number {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get survey(): Survey{
    return this._survey;
  }
  set survey(s){
    this._survey = s;
  }
  get done(): boolean{
    return this._done;
  }
  get startDateString(): string {
    return this._startDateString.split('T')[0];
  }
  get endDateString(): string {
    return this._endDateString.split('T')[0];
  }
  get phase(): number{
    return this._phase;
  }
  set phase(p){
    this._phase = p;
  }

  get startDate(): Date{
    return this._startDate;
  }
  set startDate(value: Date){
    this._startDate = value;
  }
  get endDate(): Date{
    return this._endDate;
  }
  set endDate(value: Date){
    this._endDate = value;
  }
}


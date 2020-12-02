import {Survey, SurveyJson} from './survey.model';

export interface RoadmapItemJson{
  id: number;
  title: string;
  assessment: SurveyJson;
  done: boolean;
  startDate: string;
  endDate: string;

}

export class RoadmapItem {
  // tslint:disable-next-line:variable-name
  private _startDate: Date;
  // tslint:disable-next-line:variable-name
  private _endDate: Date;
  private ID: number;
  constructor(
    private TITLE: string,
    private _SURVEY: Survey,
    private _STARTDATE: string,
    private _ENDDATE: string,
    private DONE: boolean
  ) {}

  static fromJSON(json: RoadmapItemJson): RoadmapItem {
    const roadmapItem = new RoadmapItem(
      json.title,
      Survey.fromJSON(json.assessment),
      json.startDate,
      json.endDate,
      json.done
    );
    roadmapItem.ID = json.id;
    roadmapItem.startDate = new Date(json.startDate);
    roadmapItem.endDate = new Date(json.endDate);
    return roadmapItem;
  }

  toJSON(): RoadmapItemJson {
    // @ts-ignore
    return {
      title: this.TITLE,
      assessment: this._SURVEY.toJSON(),
      startDate: this._STARTDATE,
      endDate: this._ENDDATE,
      done: this.DONE
    } as RoadmapItemJson;
  }
  get id(): number {
    return this.ID;
  }
  get title(): string {
    return this.TITLE;
  }
  get survey(): Survey{
    return this._SURVEY;
  }
  set survey(s){
    this._SURVEY = s;
  }
  get done(): boolean{
    return this.DONE;
  }
  get STARTDATE(): string {
    return this._STARTDATE.split('T')[0];
  }
  get ENDDATE(): string {
    return this._ENDDATE.split('T')[0];
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


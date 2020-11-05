import {Survey, SurveyJson} from './survey.model';

export interface RoadmapitemJSON{
  id: number;
  title: string;
  assessment: SurveyJson;
  done: boolean;
  startDate: string;
  endDate: string;
}

export class Roadmapitem {
  private _id: number;

  constructor(
    private _title: string,
    private _assessment: Survey,
    private _done: boolean,
    private _startDate: Date,
    private _endDate: Date) {}

  static fromJSON(json: RoadmapitemJSON): Roadmapitem {
    const roadmapitem = new Roadmapitem(
      json.title,
      Survey.fromJSON(json.assessment),
      json.done,
      new Date(json.startDate),
      new Date(json.endDate),
    );
    roadmapitem._id = json.id;
    return roadmapitem;
  }

  toJSON(): RoadmapitemJSON {
    return {
      id: this.id,
      title: this.title,
      assessment: this.survey.toJSON(),
      done: this.done,
      startDate: this.startDate.toString(),
      endDate: this.endDate.toString(),
    } as RoadmapitemJSON;
  }
  get id(): number {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get survey(): Survey{
    return this._assessment;
  }
  get done(): boolean{
    return this._done;
  }
  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }
}

import {Assesment, AssesmentJson} from './assesment.model';

export interface RoadmapItemJson{
  Id: number;
  title: string;
  assesment: AssesmentJson;
  startDate: string;
  endDate: string;
  done: boolean;
}

export class RoadmapItem {

  private ID: number;
  constructor(
    private TITLE: string,
    private _ASSESMENT: Assesment,
    private _STARTDATE: string,
    private _ENDDATE: string,
    private DONE: boolean
  ) {}

  static fromJSON(json: RoadmapItemJson): RoadmapItem {
    const roadmapItem = new RoadmapItem(
      json.title,
      Assesment.fromJSON(json.assesment),
      json.startDate,
      json.endDate,
      json.done
    );
    roadmapItem.ID = json.Id;
    return roadmapItem;
  }

  toJSON(): RoadmapItemJson {
    // @ts-ignore
    return {
      title: this.TITLE,
      assesment: this._ASSESMENT,
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
  get assesment(): Assesment{
    return this._ASSESMENT;
  }
  get done(): boolean{
    return this.DONE;
  }
  get STARTDATE(): string {
    return this._STARTDATE;
  }

  get ENDDATE(): string {
    return this._ENDDATE;
  }
}


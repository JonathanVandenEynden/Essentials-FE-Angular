
export interface RoadmapItemJson{
  id: number;
  title: string;
  assesment: string;
  done: boolean;
  startDate: string;
  endDate: string;

}

export class RoadmapItem {

  private ID: number;
  constructor(
    private TITLE: string,
    private _ASSESMENT: string,
    private _STARTDATE: string,
    private _ENDDATE: string,
    private DONE: boolean
  ) {}

  static fromJSON(json: RoadmapItemJson): RoadmapItem {
    const roadmapItem = new RoadmapItem(
      json.title,
      json.assesment,
      json.startDate,
      json.endDate,
      json.done
    );
    roadmapItem.ID = json.id;
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
  get assessment(): string{
    return this._ASSESMENT;
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
}


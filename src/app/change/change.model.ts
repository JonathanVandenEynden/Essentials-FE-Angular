import {RoadmapItem, RoadmapItemJson} from './roadmapitem.model';

export interface ChangeInitiativeJson{
  Id: number;
  description: string;
  startDate: string;
  endDate: string;
  roadMap: RoadmapItemJson[];
}

export class ChangeInitiative {
  private ID: number;
  constructor(
    private DESCRIPTION: string,
    private STARTDATE: string,
    private ENDDATE: string,
    private ROADMAP: RoadmapItem[]
  ) {}

  static fromJSON(json: ChangeInitiativeJson): ChangeInitiative {
    const change = new ChangeInitiative(
      json.description,
      json.startDate,
      json.endDate,
      json.roadMap.map(RoadmapItem.fromJSON)
    );
    change.ID = json.Id;
    return change;
  }

  toJSON(): ChangeInitiativeJson {
    // @ts-ignore
    return {
      description: this.DESCRIPTION,
      startDate: this.STARTDATE,
      endDate: this.ENDDATE,
      roadMap: this.ROADMAP
    } as ChangeInitiativeJson;
  }
  get id(): number {
    return this.ID;
  }
  get description(): string {
    return this.DESCRIPTION;
  }
  get startDate(): string {
    return this.STARTDATE;
  }
  get endDate(): string{
    return this.ENDDATE;
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


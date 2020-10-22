import {RoadmapItem, RoadmapItemJson} from './roadmapitem.model';
import {ChangeGroupJson} from './changegroup.model';
import {UserJson} from './user.model';

export interface ChangeInitiativeJson{
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  changeGroup: ChangeGroupJson;
  changeSponsor: UserJson;
  changeType: string;
  roadMap: RoadmapItemJson[];

}

export class ChangeInitiative {
  private ID: number;
  constructor(
    private NAME: string,
    private DESCRIPTION: string,
    private STARTDATE: string,
    private ENDDATE: string,
    private ROADMAP: RoadmapItem[]
  ) {}

  static fromJSON(json: ChangeInitiativeJson): ChangeInitiative {
    const change = new ChangeInitiative(
      json.name,
      json.description,
      json.startDate,
      json.endDate,
      json.roadMap.map(RoadmapItem.fromJSON)
    );
    change.ID = json.id;
    return change;
  }

  toJSON(): ChangeInitiativeJson {
    // @ts-ignore
    return {
      name: this.NAME,
      description: this.DESCRIPTION,
      startDate: this.STARTDATE,
      endDate: this.ENDDATE,
      roadMap: this.ROADMAP
    } as ChangeInitiativeJson;
  }
  get id(): number {
    return this.ID;
  }
  get name(): string{
    return this.NAME;
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


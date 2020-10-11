
export interface RoadmapItemJson{
  Id: number;
  title: string;
  done: boolean;
}

export class RoadmapItem {
  private ID: number;
  constructor(
    private TITLE: string,
    private DONE: boolean
  ) {}

  static fromJSON(json: RoadmapItemJson): RoadmapItem {
    const roadmapItem = new RoadmapItem(
      json.title,
      json.done
    );
    roadmapItem.ID = json.Id;
    return roadmapItem;
  }

  toJSON(): RoadmapItemJson {
    // @ts-ignore
    return {
      title: this.TITLE,
      done: this.DONE
    } as RoadmapItemJson;
  }
  get id(): number {
    return this.ID;
  }
  get title(): string {
    return this.TITLE;
  }
  get done(): boolean{
    return this.DONE;
  }
}


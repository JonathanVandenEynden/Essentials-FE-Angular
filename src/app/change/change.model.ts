
export interface ChangeInitiativeJson{
  Id: number;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
}

export class ChangeInitiative {
  private ID: number;
  constructor(
    private DESCRIPTION: string,
    private STARTDATE: string,
    private ENDDATE: string,
    private PROGRESS: number
  ) {}

  static fromJSON(json: ChangeInitiativeJson): ChangeInitiative {
    const change = new ChangeInitiative(
      json.description,
      json.startDate,
      json.endDate,
      json.progress
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
      progress: this.PROGRESS
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
  get progress(): number{
    return this.PROGRESS;
  }
}


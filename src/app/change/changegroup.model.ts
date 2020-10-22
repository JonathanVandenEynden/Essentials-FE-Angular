
export interface ChangeGroupJson{
  id: number;
  name: string;
}

export class ChangeGroup {
  private ID: number;
  constructor(
    private NAME: string,
  ) {}

  static fromJSON(json: ChangeGroupJson): ChangeGroup {
    const changegroup = new ChangeGroup(
      json.name,
    );
    changegroup.ID = json.id;
    return changegroup;
  }

  toJSON(): ChangeGroupJson {
    // @ts-ignore
    return {
      name: this.NAME,
    } as ChangeGroupJson;
  }
  get id(): number {
    return this.ID;
  }
  get name(): string{
    return this.NAME;
  }
}


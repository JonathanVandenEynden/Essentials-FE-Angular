import {ChangeInitiative, ChangeInitiativeJson} from './change.model';

export interface ProjectJson{
  id: number;
  name: string;
  changeInitiatives: ChangeInitiativeJson[];
  progress: number;
}

export class Project {
  private id: number;
  constructor(
    private name: string,
    private changeInitiatives: ChangeInitiative[],
    private progress: number
  ) {}

  static fromJSON(json: ProjectJson): Project {
    if (json != null){
      const project = new Project(
        json.name,
        json.changeInitiatives != null ? json.changeInitiatives.map(ChangeInitiative.fromJSON) : null as ChangeInitiative[],
        json.progress
      );
      project.id = json.id;
      return project;
    }
    return null as Project;
  }

  toJSON(): ProjectJson {
    return {
      id: this.id,
      name: this.name,
      changeInitiatives: this.changeInitiatives.map(q => q.toJSON()),
      progress: this.progress
    } as ProjectJson;
  }

  get Id(): number {
    return this.id;
  }
  get Name(): string {
    return this.name;
  }
  get ChangeInitiatives(): ChangeInitiative[] {
    return this.changeInitiatives;
  }
  get Progress(): number {
    return this.progress;
  }
}


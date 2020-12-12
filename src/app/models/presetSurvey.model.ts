import {Question, QuestionJson} from './Question.model';

export interface PresetSurveyJson{
  theme: string;
  presetQuestions: QuestionJson;
}

// json: { theme: string; presetQuestion: { type: number; questionString: string }}

export class PresetSurvey{
  constructor(
    private theme: string,
    private presetQuestions: Question
  ) {
  }

  static fromJson(json: PresetSurveyJson): PresetSurvey {
    console.log('fromjson presetsurvey');
    console.log(json);
    console.log('question.fromJson');
    console.log(json.presetQuestions);
    if (json != null){
      const ps = new PresetSurvey(
        json.theme,
        Question.fromJson(json.presetQuestions)
      );
      console.log('ps');
      console.log(ps);
      return ps;
    }
    return null as PresetSurvey;
  }

  toJson(): PresetSurveyJson {
    return {
      theme: this.theme,
      presetQuestions: this.presetQuestions.toJson()
    } as PresetSurveyJson;
  }

  get Theme(): string {
    return this.theme;
  }

  get PresetQuestion(): Question {
    return this.presetQuestions;
  }
}

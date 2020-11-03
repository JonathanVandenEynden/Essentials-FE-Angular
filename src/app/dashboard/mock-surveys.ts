import { Survey } from './survey.model';

const JsonSurvey = [
  {
    "id": 1,
    "questions": [
      {
        "possibleAnswers":
          {
            "Good": 0,
            "Okay": 0,
            "Bad": 0,
          },
        "id":1,
        "questionString": "What was your opinion about the old size of the restaurant?"
      },
      {
        "possibleAnswers":
          {
            "True": 0,
            "False": 0,
          },
        "id":2,
        "questionString": "Do you think the change is good?"
      },
      {
        "possibleAnswers": {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "6": 0,
          "7": 0,
          "8": 0,
          "9": 0,
          "10": 0,
        },
        "id":3,
        "questionString": "How good do you think the change is?"
      }
    ],
    "feedback": ""
  },


  {
    "id": 2,
    "questions": [
      {
        "possibleAnswers": {
          "Good": 0,
          "Okay": 0,
          "Bad": 0,
        },
        "id":4,
        "questionString": "What was your opinion about the old size of the restaurant?"
      },
      {
        "possibleAnswers": {
          "True": 0,
          "False": 0,
        },
        "id":5,
        "questionString": "Do you think the change is good?"
      },
      {
        "possibleAnswers": {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "6": 0,
          "7": 0,
          "8": 0,
          "9": 0,
          "10": 0,
        },
        "id":6,
        "questionString": "How good do you think the change is?"
      }
    ],
    "feedback": ""
  }
];

//export const SURVEY: Survey[] = JsonSurvey.map(Survey.fromJSON);

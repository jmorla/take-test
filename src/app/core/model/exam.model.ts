import { Exam, Question } from './exam.model';
export interface Exam {
  id: string;
  title: string;
  numberOfQuestions: number;
  durationInMinutes: number;
  passingScore: number;
  questions: Array<Question>;
}

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  snippet: string;
  options: Array<Option>;
}

export enum QuestionType {
  Multiple = 'multiple'
}

export class Option {
  id: number;
  title: string;
  correct: boolean;
  type: string;
}


export const textSample: Exam = {
  id: '1Z0-816',
  title: 'OCP Java 8',
  numberOfQuestions: 80,
  durationInMinutes: 180,
  passingScore: 66,
  questions: [
    {
      id: 1,
      title: 'What is true about the following code?',
      type: QuestionType.Multiple,
      snippet: 'public class List<E> {\n}',
      options: [
        {
          id: 1,
          title: 'The code does not compile',
          correct: false,
          type: 'text'
        },
        {
          id: 2,
          title: 'The code does not do anything',
          correct: true,
          type: 'text'
        },
        {
          id: 3,
          title: 'The code throws and exception',
          correct: false,
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      title: 'What is true about the following code?',
      type: QuestionType.Multiple,
      snippet: 'throws new IllegalArgumentException()',
      options: [
        {
          id: 1,
          title: 'The code does not compile',
          correct: false,
          type: 'text'
        },
        {
          id: 2,
          title: 'The code does not do anything',
          correct: true,
          type: 'text'
        },
        {
          id: 3,
          title: 'The code throws and exception',
          correct: false,
          type: 'text'
        }
      ]
    },
    {
      id: 3,
      title: 'What is true about the following code?',
      type: QuestionType.Multiple,
      snippet: 'public class List<E> {\n}',
      options: [
        {
          id: 1,
          title: 'The code does not compile',
          correct: false,
          type: 'text'
        },
        {
          id: 2,
          title: 'The code does not do anything',
          correct: true,
          type: 'text'
        },
        {
          id: 3,
          title: 'The code throws and exception',
          correct: false,
          type: 'text'
        }
      ]
    }
  ]
};



export class ExamStatus {
  currentTime: number;
  nextQuestion: number;
  selections: Array<{ questionId: number, optionId: number}> = [];
}

export class Selection {
  optionId: number;
  questionId: number;
}

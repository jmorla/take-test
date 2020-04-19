import { Exam, textSample, ExamStatus } from './../model/exam.model';
import { Injectable } from '@angular/core';

@Injectable( { providedIn: 'root'})
export class ExamService {

  EXAM_STATUS_KEY = 'examStatus';

  loadExam(): Exam {
    return JSON.parse(localStorage.getItem('exam'));
  }

  putSelection(selection: {questionId: number, optionId: number}) {
    const status = this.getOrCreateExamStatus();

    let found = false;
    const selections = status.selections;
    for (let i = 0; i < selections.length; i ++) {
      if (selections[i].questionId === selection.questionId) {
        selections[i] = {...selection};
        found = true;
        break;
      }
    }

    if (!found) {
      selections.push({...selection});
    }
    this.persistStatus(status);

  }

  setNextQuestion(next: number) {
    const status = this.getOrCreateExamStatus();
    status.nextQuestion = next;
    this.persistStatus(status);
  }

  getSelectionByQuestionId(id: number): {questionId: number, optionId: number} {
    const status = this.getOrCreateExamStatus();
    const selections = status.selections;
    for (const selection of selections) {
      if (selection.questionId === id) {
        return {...selection};
      }
    }
    return {questionId: id, optionId: -1} ;
  }

  getLastQuestionId() {
    const status = JSON.parse(localStorage.getItem(this.EXAM_STATUS_KEY));
    if (status) {
      return status.nextQuestion;
    }
    return -1;
  }

  private persistStatus(status: ExamStatus) {
    localStorage.setItem(this.EXAM_STATUS_KEY, JSON.stringify(status));
  }

  getOrCreateExamStatus(): ExamStatus {
    const status = JSON.parse(localStorage.getItem(this.EXAM_STATUS_KEY));
    if (!status) {
      this.persistStatus(new ExamStatus());
    }
    return JSON.parse(localStorage.getItem(this.EXAM_STATUS_KEY));
  }

  storeExam(exam: Exam) {
    localStorage.setItem('exam', JSON.stringify(exam));
  }

}

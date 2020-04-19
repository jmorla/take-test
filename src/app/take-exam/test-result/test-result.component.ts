import { ExamService } from './../../core/services/exam.service';
import { Exam, ExamStatus, Question, Selection, Option } from './../../core/model/exam.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  exam: Exam;
  status: ExamStatus;
  showResult = false;
  message: string;
  redirectTo: string;
  buttonMessage: string;
  stats: {
    succeded: number,
    failed: number,
    score: number
  };

  constructor(private examService: ExamService) {

  }

  ngOnInit() {
    this.exam = this.examService.loadExam();
    this.status = this.examService.getOrCreateExamStatus();

    if (this.status.selections.length === 0) {
      this.showResult = false;
      this.message = 'You haven\'t take and exam yet';
      this.redirectTo = '/take-test/upload';
      this.buttonMessage = 'Go and take one';

    } else if (this.status.selections.length < this.exam.questions.length) {
      this.showResult = false;
      this.message = 'You haven finish to take the exam';
      this.redirectTo = '/take-test/test';
      this.buttonMessage = 'Go to my previous exam';
    } else {
      this.showResult = true;
      this.generateStats();
    }
  }

  isValidAnswer(selection: Selection, option: Option): boolean {
    return option.correct;
  }

  generateStats() {
    const questions = this.exam.questions;
    const selections = this.status.selections;
    let succeded = 0;
    let failed = 0;
    for (let i = 0; i < questions.length; i++) {
      const options = questions[i].options;
      for (const option of options) {
        if (selections[i].optionId === option.id) {
          option.correct ? succeded++ : failed++;
        }
      }
    }
    this.stats = {
      succeded,
      failed,
      score: (succeded / questions.length) * 100
    };
  }
}

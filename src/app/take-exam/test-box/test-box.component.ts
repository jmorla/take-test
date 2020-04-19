import { Exam, ExamStatus, Question } from './../../core/model/exam.model';
import { ExamService } from './../../core/services/exam.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-box-component',
  templateUrl: './test-box.component.html'
})
export class TestBoxComponent implements OnInit {

  exam: Exam;
  status: ExamStatus;
  currentQuestion: Question;
  timer: any;
  timeout: any;
  counter = 0;
  optionId: number;
  nextText = 'Next';

  constructor(private examService: ExamService, private router: Router) {
  }

  ngOnInit() {
    this.exam = this.examService.loadExam();
    this.init();
  }

  updateStatus(op: number) {
    if (this.currentQuestion) {
      const selection = {optionId: +op || -1, questionId: this.currentQuestion.id};
      this.examService.putSelection(selection);
    }
  }

  nextQuestion() {
    if (this.counter < this.exam.questions.length) {
      this.counter ++;
      this.currentQuestion = this.exam.questions[this.counter - 1]; // setting the first question
      const selection = this.examService.getSelectionByQuestionId(this.currentQuestion.id);
      this.examService.setNextQuestion(this.counter);
      this.optionId = selection.optionId;
      this.setNextButtonText();
    } else {
      this.router.navigate(['/take-test', 'result']);
    }
  }

  setNextButtonText() {
    this.nextText = this.counter === this.exam.questions.length ? 'Finish' : 'Next';
  }

  init() {
    const currentId = this.examService.getLastQuestionId();
    this.currentQuestion = this.exam.questions[currentId > -1 ? currentId - 1 : 0];
    this.counter = currentId > -1 ? currentId : 1;
    const selection = this.examService.getSelectionByQuestionId(this.currentQuestion.id);
    this.optionId = selection.optionId;
    this.setNextButtonText();
  }


  previousQuestion() {
    if (this.counter > 1) {
      this.counter --;
      this.currentQuestion = this.exam.questions[this.counter - 1];
      const selection = this.examService.getSelectionByQuestionId(this.currentQuestion.id);
      this.optionId = selection.optionId;
      this.examService.setNextQuestion(this.counter);
      this.setNextButtonText();
    }
  }

}

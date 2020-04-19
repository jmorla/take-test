import { ExamService } from './../../core/services/exam.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Exam } from 'src/app/core/model/exam.model';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.scss']
})
export class TestUploadComponent {

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  exam: Exam;
  message = '';
  loaded: boolean;

  constructor(private examService: ExamService) {}

  loadExam() {
    const file = (this.fileInput.nativeElement as HTMLInputElement).files[0];
    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        try {
          this.exam = this.examValidator(JSON.parse(reader.result as string));
          this.loaded = true;
          this.examService.storeExam(this.exam);
        } catch (err) {
          this.message = 'Error due: ' + err;
        }
      };
    }
  }

  examValidator(exam: any): Exam {
    if (!exam.hasOwnProperty('title') || !(typeof exam.title === 'string')) {
      this.message += ('Invalid field ' + 'title');
    }
    if (!exam.hasOwnProperty('numberOfQuestions') || !(typeof exam.numberOfQuestions === 'number') ) {
      this.message += 'Invalid field ' + 'numberOfQuestions\n';
    }
    if (!exam.hasOwnProperty('durationInMinutes') || !(typeof exam.durationInMinutes === 'number') ) {
      this.message +=  ('Invalid field ' + 'durationInMinutes\n');
    }
    if (!exam.hasOwnProperty('passingScore') || !(typeof exam.passingScore === 'number') ) {
      this.message += ('Invalid field ' + 'passingScore\n');
     }
    if (!exam.hasOwnProperty('questions') || !(exam.questions instanceof Array)) {
      this.message += ('Invalid field ' + 'questions\n');
    } else {
      const questions = exam.questions;
      for (let i = 0; i < questions.length; i ++) {
        this.validateQuestion(questions[i], i);
      }
    }

    return exam as Exam;
  }


  private validateQuestion(question, index: number) {
    if (!(question.title)) {
      this.message += '\t Invalid Question title: array Index: ' + index + '\n';
    }
    if (!(question.type)) {
      this.message += '\t Invalid Question type: array Index: ' + index + '\n';
    }
    if (!(question.options)) {
      this.message += '\t Invalid Question options: array Index: ' + index + '\n';
    } else {
      const options = question.options;
      for (let i = 0; i < options.length; i++) {
        this.validateOption(options[i], i);
      }
    }
  }

  private validateOption(option, index: number) {
    if (!(option.title)) {
      this.message += '\t\t Invalid Option title: array Index: ' + index + '\n';
    }
    if (!(option.correct !== undefined)) {
      this.message += '\t\t Invalid Option boolean: array Index: ' + index + '\n';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  templateUrl: './build-exam.component.html',
  styleUrls: ['./build-exam.component.scss']
})
export class BuildExamComponent implements OnInit {

  examForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.examForm = this.fb.group({
      title: this.fb.control(''),
      numberOfQuestions: this.fb.control(0),
      durationInMinutes: this.fb.control(0),
      passingScore: this.fb.control(0),
      questions: this.fb.array([])
    });
  }

  get questions() {
    return this.examForm.get('questions') as FormArray;
  }

  addQuestion() {
    const group = new FormGroup({
      id: this.fb.control(this.questions.length + 1),
      title: this.fb.control(''),
      type: this.fb.control('multiple'),
      snippet: this.fb.control(''),
      options: this.fb.array([]),
      hasSnippet: this.fb.control(false)
    });
    this.questions.push(group);
  }

  getOptions(question: FormGroup): FormArray {
    if (question) {
      return (question.get('options') as FormArray);
    }
    return null;
  }

  addOption(question: FormGroup) {
    const options = this.getOptions(question);
    const group = new FormGroup({
      id: this.fb.control(options.length + 1),
      title: this.fb.control(''),
      correct: this.fb.control(false),
      type: this.fb.control('text')
    });
    this.getOptions(question).push(group);
  }

  removeQuestion(i: number) {
    this.questions.removeAt(i);
  }

  removeOption(question, j: number) {
    this.getOptions(question).removeAt(j);
  }


  exportExam() {
    const content = JSON.stringify(this.examForm.value);
    this.download(this.examForm.get('title').value, content);
  }

  download(filename, text) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
  }
}


import { TestResultComponent } from './test-result/test-result.component';
import { FormsModule } from '@angular/forms';
import { TestUploadComponent } from './test-upload/test-upload.component';
import { TestBoxComponent } from './test-box/test-box.component';
import { TakeExamComponent } from './take-exam.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TakeExamComponent,
        children: [
          {
            path: 'test',
            component: TestBoxComponent
          },
          {
            path: 'upload',
            component: TestUploadComponent
          },
          {
            path: 'result',
            component: TestResultComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    TakeExamComponent,
    TestBoxComponent,
    TestUploadComponent,
    TestResultComponent
  ],
  exports: [
    RouterModule
  ]
})
export class TakeExamModule {

}

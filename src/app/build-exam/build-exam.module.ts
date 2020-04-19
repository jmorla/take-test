import { BuildExamComponent } from './build-exam.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuildExamComponent
      }
    ])
  ],
  declarations: [
    BuildExamComponent
  ],
})
export class BuildExamModule {

}

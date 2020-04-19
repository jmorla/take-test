import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/take-test'
  },
  {
    path: 'take-test',
    loadChildren: () => import('./take-exam/take-exam.module').then(m => m.TakeExamModule)
  },
  {
    path: 'build-test',
    loadChildren: () => import('./build-exam/build-exam.module').then(m => m.BuildExamModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

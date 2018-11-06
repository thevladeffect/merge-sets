import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MergeListsComponent} from './merge-lists/merge-lists.component';

const routes: Routes = [
  {
    path: '',
    component: MergeListsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

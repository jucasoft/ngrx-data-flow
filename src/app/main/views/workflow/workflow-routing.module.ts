import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkflowMainComponent} from './workflow-main/workflow-main.component';
import {WorkflowEditComponent} from '@views/workflow/workflow-edit/workflow-edit.component';

const routes: Routes = [
  {
    path: 'main',
    component: WorkflowMainComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: WorkflowEditComponent,
    outlet: 'popUp',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
      path: '**',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WorkflowRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'workflow', pathMatch: 'full'},
  {path: 'workflow', loadChildren: () => import('./main/views/workflow/workflow.module').then(m => m.WorkflowModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // {enableTracing: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

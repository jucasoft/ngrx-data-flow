import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkflowEditComponent} from './workflow-edit/workflow-edit.component';
import {WorkflowMainComponent} from './workflow-main/workflow-main.component';
import {WorkflowListComponent} from './workflow-list/workflow-list.component';
import {WorkflowRoutingModule} from './workflow-routing.module';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PipesModule} from '@core/pipe/pipes.module';
import {DiagramComponent} from '@components/diagram/diagram.component';
import {SearchModule} from '@components/search/search.module';
import {NgLetModule} from '@core/directive/ng-let.directive';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    WorkflowEditComponent,
    WorkflowMainComponent,
    WorkflowListComponent,
    DiagramComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkflowRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    PipesModule,
    SearchModule,
    NgLetModule,
    ToolbarModule,
    TooltipModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  entryComponents: []
})
export class WorkflowModule {
}

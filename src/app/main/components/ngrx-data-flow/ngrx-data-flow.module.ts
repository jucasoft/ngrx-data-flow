import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgrxDataFlowComponent} from '@components/ngrx-data-flow/ngrx-data-flow.component';
import {DiagramModule} from '@components/diagram/diagram.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [NgrxDataFlowComponent],
  imports: [
    CommonModule,
    DiagramModule,
    NgSelectModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NgrxDataFlowComponent],
})
export class NgrxDataFlowModule {
}

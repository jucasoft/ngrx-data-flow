import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgrxDataFlowComponent} from '@components/ngrx-data-flow/ngrx-data-flow.component';
import {DiagramModule} from '@components/diagram/diagram.module';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [NgrxDataFlowComponent],
  imports: [
    CommonModule, DiagramModule, NgSelectModule,

  ],
  exports: [NgrxDataFlowComponent],
})
export class NgrxDataFlowModule {
}

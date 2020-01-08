import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiagramComponent} from '@components/diagram/diagram.component';


@NgModule({
  declarations: [DiagramComponent],
  exports: [DiagramComponent],
  imports: [
    CommonModule
  ]
})
export class DiagramModule {
}

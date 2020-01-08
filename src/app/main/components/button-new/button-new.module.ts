import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonNewComponent} from '@components/button-new/button-new.component';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [ButtonNewComponent],
  exports: [ButtonNewComponent],
  imports: [
    CommonModule, ButtonModule, TooltipModule
  ]
})
export class ButtonNewModule { }

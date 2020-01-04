import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {HamburgerButtonModule} from '@components/hamburger-button/hamburger-button.module';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {BreadcrumbModule} from '@components/breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [HeaderComponent],
    imports: [CommonModule, HamburgerButtonModule, OverlayPanelModule, BreadcrumbModule],
  exports: [HeaderComponent]
})
export class HeaderModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoinEditComponent} from './coin-edit/coin-edit.component';
import {CoinMainComponent} from './coin-main/coin-main.component';
import {CoinListComponent} from './coin-list/coin-list.component';
import {CoinRoutingModule} from './coin-routing.module';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SearchModule} from '@components/search/search.module';
import {PipesModule} from '@core/pipe/pipes.module';
import {ButtonNewCoinComponent} from '@views/coin/components/button-new-coin.component';
import {TooltipModule} from 'primeng/tooltip';
import {NgrxDataFlowModule} from '@components/ngrx-data-flow/ngrx-data-flow.module';

@NgModule({
  declarations: [
    CoinEditComponent,
    CoinMainComponent,
    CoinListComponent,
    ButtonNewCoinComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoinRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    PipesModule,
    SearchModule,
    TooltipModule,
    NgrxDataFlowModule
  ],
  providers: [],
  entryComponents: []
})
export class CoinModule {
}

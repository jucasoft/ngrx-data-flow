import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {RouterStoreActions} from '@root-store/router-store/index';
import {PopUpData} from '@root-store/router-store/pop-up-base.component';
import {RootStoreState} from '@root-store/index';
import {Coin} from '@models/vo/coin';

@Component({
  selector: 'app-button-new-coin',
  template: `
    <div pTooltip="{{'New coin' + ((disabled$ | async) ? ' disabled' : '')}}" tooltipPosition="left">
      <button type="button" pButton icon="fa fa-fw fa-plus"
              label="New" (click)="onCreate()"
              [disabled]="(disabled$ |async)"
              class="ui-button-success"></button>
    </div>`,
  styles: []
})
export class ButtonNewCoinComponent implements OnInit {

  public disabled$: Observable<boolean>;


  constructor(private readonly store$: Store<RootStoreState.State>) {
  }

  ngOnInit() {
    this.disabled$ = of(false);
  }

  onCreate() {

    const item = new Coin();
    const state: PopUpData<Coin> = {
      item,
      props: {title: 'Create coin', route: 'coin'}
    };

    // apro la popUP
    this.store$.dispatch(RouterStoreActions.RouterGo({
      path: ['coin', {outlets: {popUp: ['edit']}}],
      extras: {state}
    }));

    // const state: PopUpData<Coin> = {
    //   item: new Coin(),
    //   props: {title: 'Create coin', route: 'coin'}
    // };
    //
    // // apro la popUP
    // this.store$.dispatch(RouterStoreActions.RouterGo({
    //   path: ['coin', {outlets: {popUp: ['data-flow']}}],
    //   extras: {state}
    // }));
  }
}

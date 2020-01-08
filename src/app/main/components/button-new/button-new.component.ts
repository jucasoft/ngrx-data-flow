import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {RouterStoreActions} from '@root-store/router-store/index';
import {PopUpData} from '@root-store/router-store/pop-up-base.component';
import {RootStoreState} from '@root-store/index';

@Component({
  selector: 'app-button-new',
  template: `
    <div pTooltip="{{'New filter' + ((disabled$ | async) ? ' disabled' : '')}}" tooltipPosition="left">
      <button type="button" pButton icon="fa fa-fw fa-plus"
              label="New" (click)="onCreate()"
              [disabled]="(disabled$ |async)"
              class="ui-button-success"></button>
    </div>`,
  styles: []
})
export class ButtonNewComponent<T> implements OnInit {

  public disabled$: Observable<boolean>;

  @Input()
  public item: T;

  @Input()
  public name: string;

  constructor(private readonly store$: Store<RootStoreState.State>) {
  }

  ngOnInit() {
    this.disabled$ = of(false);
  }

  onCreate() {

    const state: PopUpData<T> = {
      item: this.item,
      props: {title: 'Create ' + this.name}
    };

    // apro la popUP
    this.store$.dispatch(RouterStoreActions.RouterGo({
      path: [this.name, {outlets: {popUp: ['edit']}}],
      extras: {state}
    }));

  }
}

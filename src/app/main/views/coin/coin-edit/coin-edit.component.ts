import {Component} from '@angular/core';
import {PopUpBaseComponent, PopUpData} from '@root-store/router-store/pop-up-base.component';
import {Coin} from '@models/vo/coin';
import {FormGroup} from '@angular/forms';
import {RouterStoreActions} from '@root-store/router-store/index';


@Component({
  selector: 'app-coin-edit',
  templateUrl: './coin-edit.component.html',
  styles: [``]
})
export class CoinEditComponent extends PopUpBaseComponent<Coin> {

  form: FormGroup;
  keys: string[];

  setItemPerform(value: Coin): void {
    const group = this.fb.group({});
    this.keys = Object.keys(value);
    this.keys.forEach(key => group.addControl(key, this.fb.control({value: value[key], disabled: key === 'id'})));
    this.form = group;
  }

  acceptPerform(item: Coin): void {
    if (item.id) {

      // this.store$.dispatch(CoinStoreActions.EditRequest({
      //   item
      // }));


      const state: PopUpData<Coin> = {
        item: new Coin(),
        props: {title: 'Create coin', route: 'coin'}
      };

      // apro la popUP
      this.store$.dispatch(RouterStoreActions.RouterGo({
        path: ['coin', {outlets: {popUp: ['data-flow']}}],
        extras: {state}
      }));


    } else {
      const state: PopUpData<Coin> = {
        item: new Coin(),
        props: {title: 'Create coin', route: 'coin'}
      };

      // apro la popUP
      this.store$.dispatch(RouterStoreActions.RouterGo({
        path: ['coin', {outlets: {popUp: ['data-flow']}}],
        extras: {state}
      }));
    }
  }

}

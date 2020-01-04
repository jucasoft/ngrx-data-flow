import {Component} from '@angular/core';
import {closePopUpAction, PopUpBaseComponent} from '@root-store/router-store/pop-up-base.component';
import {Workflow} from '@models/vo/workflow';
import {FormGroup} from '@angular/forms';
import {WorkflowStoreActions} from '@root-store/workflow-store';


@Component({
  selector: 'app-workflow-edit',
  templateUrl: './workflow-edit.component.html',
  styles: [``]
})
export class WorkflowEditComponent extends PopUpBaseComponent<Workflow> {

  form: FormGroup;
  keys: string[];

  setItemPerform(value: Workflow): void {
    const group = this.fb.group({});
    this.keys = Object.keys(value);
    this.keys.forEach(key => group.addControl(key, this.fb.control({value: value[key], disabled: key === 'id'})));
    this.form = group;
  }

  acceptPerform(item: Workflow): void {
    if (item.id) {
      this.store$.dispatch(WorkflowStoreActions.EditRequest({
        item, onResult: [
          // azione che verrà invocata al result della chiamata all'interno dell'effect.
          // chiude la popUP.
          // closePopUpAction: metodo per la creazione dell'azione di chiusura della popUP
          closePopUpAction(this.route)
        ]
      }));
    } else {
      this.store$.dispatch(WorkflowStoreActions.CreateRequest({
        item, onResult: [
          // azione che verrà invocata al result della chiamata all'interno dell'effect.
          // chiude la popUP.
          // closePopUpAction: metodo per la creazione dell'azione di chiusura della popUP
          closePopUpAction(this.route)
        ]
      }));
    }
  }

  // cancel(): void {
  //   this.store$.dispatch(closePopUpAction(this.route));
  // }
}

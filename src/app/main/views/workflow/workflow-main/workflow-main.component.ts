import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootStoreState} from '@root-store/index';

@Component({
  selector: 'app-workflow-main',
  templateUrl: 'workflow-main.component.html',
  styles: []
})
export class WorkflowMainComponent implements OnInit {

  constructor(private readonly store$: Store<RootStoreState.State>) {
  }

  ngOnInit() {
    // this.ruleTables$ = this.store$.pipe(
    //   select(RuleTableStoreSelectors.selectFilteredItems),
    //   tap(values => this.updateRowGroupMetaData(values))
    // );
  }
}

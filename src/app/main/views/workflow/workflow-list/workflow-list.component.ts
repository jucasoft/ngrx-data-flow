import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootStoreState} from '@root-store/index';
import {Observable} from 'rxjs';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-workflow-list',
  templateUrl: `workflow-list.component.html`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowListComponent implements OnInit, AfterViewInit {

  collection$: Observable<string>;

  constructor(private store$: Store<RootStoreState.State>,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    console.log('WorkflowListComponent.ngOnInit()');
  }

  ngAfterViewInit(): void {
  }


}

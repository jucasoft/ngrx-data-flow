import {WorkflowStoreState} from '@root-store/workflow-store';
import {SlideMenuStoreState} from '@root-store/slide-menu-store';

export interface State {
  workflow: WorkflowStoreState.State;
  slide_menu: SlideMenuStoreState.State;
}

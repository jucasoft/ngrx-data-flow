import {createCrudEntityAdapter, EntityCrudAdapter, EntityCrudState} from 'ngrx-entity-crud';
import {Workflow} from '@models/vo/workflow';

export const adapter: EntityCrudAdapter<Workflow> = createCrudEntityAdapter<Workflow>({
	selectId: model => Workflow.selectId(model),
});

export interface State extends EntityCrudState<Workflow> {
};

export const initialState: State = adapter.getInitialCrudState();

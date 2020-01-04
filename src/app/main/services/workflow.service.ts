import {Injectable} from '@angular/core';
import {Workflow} from '@models/vo/workflow';
import {environment} from '../../../environments/environment';
import {BaseCrudService} from 'ngrx-entity-crud';

@Injectable({
	providedIn: 'root'
})
export class WorkflowService extends BaseCrudService<Workflow> {
	protected service = environment.webServiceUri + 'workflow';
}

import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {DiagramComponent} from '@components/diagram/diagram.component';
import {concatAll, delay} from 'rxjs/operators';
import {ngrxArchitectureOverview} from '@components/ngrx-data-flow/ngrx-data-flow-data';
import {PopUpBaseComponent} from '@root-store/router-store/pop-up-base.component';
import {Coin} from '@models/vo/coin';

@Component({
  selector: 'app-ngrx-data-flow',
  templateUrl: './ngrx-data-flow.component.html',
  styleUrls: ['./ngrx-data-flow.component.css']
})
export class NgrxDataFlowComponent implements OnInit, AfterViewInit {

  collection$: Observable<string>;
  lastHighlights = [];


  @ViewChild('diagram', {static: true})
  private diagram: DiagramComponent;
  actions: { label: string, value: string }[] = [
    {label: 'SearchRequest', value: 'async'},
    {label: 'DeleteRequest', value: 'async'},
    {label: 'CreateRequest', value: 'async'},
    {label: 'EditRequest', value: 'async'},
    {label: 'SelectRequest', value: 'async'},
    {label: 'Reset', value: 'sync'},
    {label: 'Filters', value: 'sync'},
    {label: 'Create', value: 'sync'},
    {label: 'Delete', value: 'sync'},
    {label: 'Edit', value: 'sync'},
    {label: 'SelectItem', value: 'sync'},
    {label: 'SelectItems', value: 'sync'}
  ];

  ngOnInit() {
    console.log('NgrxDataFlowComponent.ngOnInit()');
    this.collection$ = of(ngrxArchitectureOverview);
    // this.store$.dispatch(WorkflowStoreActions.SearchRequest({queryParams: {}}));
  }

  ngAfterViewInit(): void {
  }

  onChangeSelectedAction($event) {
    this.lastHighlights.forEach(fn => fn());
    this.lastHighlights = [];

    this.diagram.perform(
      (graph, model) => {
        const array$ = getObservables(stepsMap[$event.value]);
        array$.subscribe(id => {
          const cells = getCellsFromIds([id], graph, model);
          this.lastHighlights.push(highlights(graph, cells));
        });
      }
    );
  }

  onSelect($event: any[]) {

  }

  cancel(): void {
    console.log('NgrxDataFlowComponent.cancel()');
  }

}


export const EdgeConstants: any = mxConstants;

export const highlights: (graph, cells: mxCell[]) => () => void = (graph, cells: mxCell[]) => {
  if (cells[0].edge) {
    const state = graph.view.getState(cells[0]);
    state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'flow');
    return ((stateA) => () => {
      stateA.shape.node.getElementsByTagName('path')[1].removeAttribute('class');
    })(state);
  } else {
    // graph.setCellStyles(EdgeConstants.STYLE_DASHED, 1, cells);
    const highlight = new (window as any).mxCellHighlight(graph, '#22ff00', 2);
    highlight.highlight(graph.view.getState(cells[0]));
    // return highlight;
    return ((highlightA) => () => {
      highlightA.destroy();
    })(highlight);
  }

};

export const getCells = (items: any[], graph, model) => {
  const result = [];
  items.forEach((item, index, array) => {
    result.push(model.getCell(item.id));
  });
  return result;
};

export const getCellsFromIds = (ids, graph, model) => {
  const result = [];
  ids.forEach((id, index, array) => {
    result.push(model.getCell(id));
  });
  return result;
};

export const addMargin: (margin, bound) => { x, y, width, height } = (margin, bound: { x, y, width, height }) => {

  const marginBottom = !!margin.marginBottom ? margin.marginBottom : margin;
  const marginLeft = !!margin.marginLeft ? margin.marginLeft : margin;
  const marginTop = !!margin.marginTop ? margin.marginTop : margin / 2;
  const marginRight = !!margin.marginRight ? margin.marginRight : margin / 2;

  const x = bound.x - marginLeft;
  const y = bound.y - marginTop;
  const width = bound.width + marginRight + marginLeft;
  const height = bound.height + marginBottom + marginTop;
  return {x, y, width, height};
};

export const getMin: (minW, minH, bound) => { x, y, width, height } = (minW, minH, bound: { x, y, width, height }) => {
  const width = bound.width < minW ? minW : bound.width;
  const y = bound.width < minW ? ((bound.width - minW) / 2) + bound.y : bound.y;
  const height = bound.height < minH ? minH : bound.height;
  const x = bound.height < minH ? ((bound.height - minH) / 2) + bound.x : bound.x;
  return {x, y, width, height};
};

export const debugVertex = (bound, graph, parent) => {
  return graph.insertVertex(parent, 'aa', 'Hello,', bound.x, bound.y, bound.width, bound.height, 'opacity=30', false);
};

/**
 * Creates an overlay object using the given tooltip and text for the alert window
 * which is being displayed on click.
 */
export const createOverlay = (image, tooltip) => {
  const overlay = new (window as any).mxCellOverlay(image, tooltip);

  // Installs a handler for clicks on the overlay
  overlay.addListener((window as any).mxEvent.CLICK, (sender, evt) => {
    (window as any).mxUtils.alert(tooltip + '\nLast update: ' + new Date());
  });

  return overlay;
};

export interface IStep {
  refId: number;
  time: number;
}

export const ref = {
  ACTION: 2,
  REDUCER: 3,
  STATE: 4,
  EFFECT: 5,
  SERVICE: 6,
  SERVER: 7,
  COMPONENT: 8,
  ACTION_RES: 9,

  REDUCER_STATE: 23,
  ACTION_EFFECT: 12,
  STATE_COMPONENT: 24,
  EFFECT_ACTION_RES: 16,
  EFFECT_SERVICE: 18,
  SERVICE_EFFECT: 20,
  SERVICE_SERVER: 21,
  SERVER_SERVICE: 22,
  ACTION_RES_REDUCER: 14,
  COMPONENT_ACTION: 10,
  ACTION_REDUCER: 13
};

export const stepsMap: { [actionName: string]: IStep[] } = {
  async: [
    {refId: ref.COMPONENT, time: 500},
    {refId: ref.COMPONENT_ACTION, time: 500},

    {refId: ref.ACTION, time: 500},
    {refId: ref.ACTION_EFFECT, time: 500},

    {refId: ref.EFFECT, time: 500},
    {refId: ref.EFFECT_SERVICE, time: 500},

    {refId: ref.SERVICE, time: 500},
    {refId: ref.SERVICE_SERVER, time: 500},

    {refId: ref.SERVER, time: 500},
    {refId: ref.SERVER_SERVICE, time: 500},
    {refId: ref.SERVICE_EFFECT, time: 500},

    {refId: ref.EFFECT_ACTION_RES, time: 500},
    {refId: ref.ACTION_RES, time: 500},

    {refId: ref.ACTION_RES_REDUCER, time: 500},
    {refId: ref.REDUCER, time: 500},

    {refId: ref.REDUCER_STATE, time: 500},
    {refId: ref.STATE, time: 500},

    {refId: ref.STATE_COMPONENT, time: 500},
  ],
  sync: [
    {refId: ref.COMPONENT, time: 500},
    {refId: ref.COMPONENT_ACTION, time: 500},

    {refId: ref.ACTION, time: 500},
    {refId: ref.ACTION_REDUCER, time: 500},

    {refId: ref.REDUCER, time: 500},

    {refId: ref.REDUCER_STATE, time: 500},
    {refId: ref.STATE, time: 500},

    {refId: ref.STATE_COMPONENT, time: 500},
  ]
};

export const getObservable = ({refId, time}) => {
  return of(refId).pipe(delay(time));
};

export const getObservables = (steps: IStep[]) => {
  const result: Observable<string>[] = [];
  steps.forEach((step) => {
    result.push(getObservable(step));
  });
  return from(result).pipe(concatAll());
};

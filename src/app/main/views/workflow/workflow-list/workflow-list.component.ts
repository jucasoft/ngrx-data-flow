import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootStoreState} from '@root-store/index';
import {from, Observable, of} from 'rxjs';
import {Workflow} from '@models/vo/workflow';
import {RouterStoreActions} from '@root-store/router-store/index';
import {ConfirmationService} from 'primeng/api';
import {PopUpData} from '@root-store/router-store/pop-up-base.component';
import {DiagramComponent} from '@components/diagram/diagram.component';
import {evalData, getFlattenInObject} from '@core/utils/j-utils';
import {concatAll, delay} from 'rxjs/operators';

export const getNode = (items) => items.filter(value => value.type === 'node');


@Component({
  selector: 'app-workflow-list',
  templateUrl: `workflow-list.component.html`,
  styles: [`.toolbar {
    border-radius: 5px;
    background-color: #eeeeee;
    padding-left: 0.5em;
    padding-right: 0.5em;
    height: 42px;
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowListComponent implements OnInit, AfterViewInit {

  collection$: Observable<string>;
  prevHighlighted: { cells: mxCell[], style: any };
  lastHighlights = [];

  constructor(private store$: Store<RootStoreState.State>,
              private confirmationService: ConfirmationService) {
    console.log('WorkflowListComponent.constructor()');
  }

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
    this.collection$ = of(ngrxArchitectureOverview);
  }

  ngAfterViewInit(): void {

  }

  onEdit(item) {
    console.log('WorkflowListComponent.onEdit()');

    const state: PopUpData<Workflow> = {
      item,
      props: {title: 'Edit Workflow', route: 'workflow'}
    };

    // apro la popUP
    this.store$.dispatch(RouterStoreActions.RouterGo({
      path: ['workflow', {outlets: {popUp: ['edit']}}],
      extras: {state}
    }));

  }


  onSelect(ev) {
    console.log('onSelect(ev)');
    console.log('ev: ', ev);
    // if (!!ev && ev.length === 1) {
    //   this.store$.pipe(
    //     select(WorkflowStoreSelectors.selectEntities),
    //     map(values => values[ev[0].id]),
    //     first()
    //   ).subscribe(
    //     value => {
    //       console.log('WorkflowListComponent.()');
    //       console.log('value', value);
    //       this.onEdit(value);
    //     }
    //   );
    // }
  }

  onZoom(value: number) {
    console.log('WorkflowListComponent.onZoom()');
    console.log('value', value);
    this.diagram.perform(
      (graph, model) => {
        graph.zoomTo(value, true);
      }
    );
  }

  showSelected(selected: Workflow[]) {
    console.log('WorkflowListComponent.showSelected()');
    console.log('selected', selected.length);

    const minWidth = 800;
    const minHeight = 600;
    const margin = 50;
    if (selected && selected.length > 0) {
      console.log('ev[0].value:', selected[0].value);
    }
    if (!selected) {
      return;
    }
    this.diagram.perform(
      (graph: mxGraph, model) => {
        graph.zoomActual();

        // ricavo la lista di celle selezionate
        const cells = getCells(selected, graph, model);
        const cellsIds = getFlattenInObject('id', cells, true);
        // tolgo dalle celle selezionate precedentemente, le celle selezionate attualmente.
        const prevCells = evalData(() => this.prevHighlighted.cells.filter(({id}) => cellsIds.indexOf(id) === -1), []);
        if (prevCells > 0) {
          graph.setCellStyle(this.prevHighlighted.style, prevCells);
        }

        const style = graph.getStylesheet().getDefaultEdgeStyle();
        this.prevHighlighted = {cells, style};


        const bound = graph.getBoundingBoxFromGeometry(cells, false);

        const parent = graph.getDefaultParent();

        const boundZoom = getMin(minWidth, minHeight, bound);

        highlights(graph, cells);
        const boundZoomB = addMargin({
          marginBottom: 50,
          marginLeft: 200,
          marginTop: 50,
          marginRight: 400
        }, boundZoom);
        // debugVertex(boundZoomB, graph, graph.getDefaultParent());
        // debugVertex(boundZoom, graph, graph.getDefaultParent());
        graph.zoomToRect(boundZoomB);
        // debugger;
      }
    );
  }

  onChangeSelectedAction($event) {
    console.log('WorkflowListComponent.onChangeSelectedAction($event)');
    console.log('$event', $event);
    this.lastHighlights.forEach(item => item.destroy());
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
}

export const EdgeConstants: any = mxConstants;

export const highlights = (graph, cells: mxCell[]) => {
  // graph.setCellStyles(EdgeConstants.STYLE_FILLCOLOR, 'red', cells);

  const highlight = new (window as any).mxCellHighlight(graph, '#22ff00', 2);
  highlight.highlight(graph.view.getState(cells[0]));
  return highlight;

  // graph.setCellStyles(EdgeConstants.STYLE_STROKECOLOR, 'red', cells);
};

export const getCells = (items: Workflow[], graph, model) => {
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
  console.log('margin, bound', margin, bound);

  const marginBottom = !!margin.marginBottom ? margin.marginBottom : margin;
  const marginLeft = !!margin.marginLeft ? margin.marginLeft : margin;
  const marginTop = !!margin.marginTop ? margin.marginTop : margin / 2;
  const marginRight = !!margin.marginRight ? margin.marginRight : margin / 2;

  const x = bound.x - marginLeft;
  const y = bound.y - marginTop;
  const width = bound.width + marginRight + marginLeft;
  const height = bound.height + marginBottom + marginTop;
  console.log('{x, y, width, height}', {x, y, width, height});
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
  console.log('AppComponent.createOverlay()');
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

export const ngrxArchitectureOverview = `
<mxGraphModel dx="946" dy="610" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <mxCell id="30" value="" style="rounded=1;whiteSpace=wrap;html=1;shadow=0;glass=0;strokeColor=#4A5262;strokeWidth=2;fillColor=none;fontSize=14;fontColor=#63C59E;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="610" y="20" width="200" height="460" as="geometry"/>
    </mxCell>
    <mxCell id="29" value="" style="rounded=1;whiteSpace=wrap;html=1;shadow=0;glass=0;strokeColor=#63C59E;strokeWidth=2;fillColor=none;fontSize=14;fontColor=#63C59E;dashed=1;" vertex="1" parent="1">
      <mxGeometry x="160" y="20" width="390" height="460" as="geometry"/>
    </mxCell>
    <mxCell id="12" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="2" target="5">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="710" y="110" as="targetPoint"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="2" value="ACTION" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#C65B6A;strokeColor=#FFFFFF;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="200" y="60" width="80" height="80" as="geometry"/>
    </mxCell>
    <mxCell id="23" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;" edge="1" parent="1" source="3" target="4">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="34" value="New State" style="text;html=1;resizable=0;points=[];align=center;verticalAlign=middle;labelBackgroundColor=#ffffff;fontSize=12;fontColor=#4A5262;" vertex="1" connectable="0" parent="23">
      <mxGeometry x="0.1375" y="-1" relative="1" as="geometry">
        <mxPoint x="1" y="-41" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="3" value="REDUCER" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#EAB660;strokeColor=#FFFFFF;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="300" y="200" width="80" height="80" as="geometry"/>
    </mxCell>
    <mxCell id="24" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;" edge="1" parent="1" source="4" target="8">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="31" value="Render" style="text;html=1;resizable=0;points=[];align=center;verticalAlign=middle;labelBackgroundColor=#ffffff;fontSize=12;fontColor=#4A5262;fontStyle=0" vertex="1" connectable="0" parent="24">
      <mxGeometry x="-0.1364" y="-1" relative="1" as="geometry">
        <mxPoint x="-15" y="-29" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="4" value="STATE" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#8166AD;strokeColor=#FFFFFF;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="200" y="340" width="80" height="80" as="geometry"/>
    </mxCell>
    <mxCell id="16" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;" edge="1" parent="1" source="5" target="9">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="18" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=1;exitDx=0;exitDy=0;entryX=0.733;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;" edge="1" parent="1" source="5" target="6">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="5" value="EFFECT" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#4A5262;strokeColor=#FFFFFF;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="670" y="200" width="80" height="80" as="geometry"/>
    </mxCell>
    <mxCell id="20" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.25;exitY=0;exitDx=0;exitDy=0;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;" edge="1" parent="1" source="6">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="680" y="270" as="targetPoint"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="21" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.75;exitY=1;exitDx=0;exitDy=0;entryX=0.75;entryY=0;entryDx=0;entryDy=0;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;" edge="1" parent="1" source="6" target="7">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="6" value="SERVICE" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#FFFFFF;fillColor=#63C59E;fontSize=12;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="650" y="330" width="120" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="22" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.25;exitY=0;exitDx=0;exitDy=0;entryX=0.25;entryY=1;entryDx=0;entryDy=0;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;" edge="1" parent="1" source="7" target="6">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="7" value="SERVER" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#FFFFFF;fillColor=#657EC7;fontSize=12;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="650" y="420" width="120" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="8" value="COMPONENT" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#FFFFFF;fillColor=#657EC7;fontSize=12;fontColor=#FFFFFF;" vertex="1" parent="1">
      <mxGeometry x="30" y="210" width="120" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="14" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;strokeWidth=2;fontSize=12;fontColor=#FFFFFF;" edge="1" parent="1" source="9" target="3">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="9" value="ACTION" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#C65B6A;strokeColor=#FFFFFF;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="430" y="200" width="80" height="80" as="geometry"/>
    </mxCell>
    <mxCell id="10" value="" style="endArrow=classic;html=1;fontSize=12;fontColor=#FFFFFF;exitX=0.5;exitY=0;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;strokeWidth=2;" edge="1" parent="1" source="8" target="2">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="30" y="490" as="sourcePoint"/>
        <mxPoint x="80" y="440" as="targetPoint"/>
        <Array as="points">
          <mxPoint x="90" y="100"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="32" value="Dispatch" style="text;html=1;resizable=0;points=[];align=center;verticalAlign=middle;labelBackgroundColor=#ffffff;fontSize=12;fontColor=#4A5262;" vertex="1" connectable="0" parent="10">
      <mxGeometry y="-23" relative="1" as="geometry">
        <mxPoint y="17" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="13" value="" style="endArrow=classic;html=1;fontSize=12;fontColor=#FFFFFF;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;strokeWidth=2;" edge="1" parent="1" source="2" target="3">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="60" y="220" as="sourcePoint"/>
        <mxPoint x="210" y="110" as="targetPoint"/>
        <Array as="points">
          <mxPoint x="340" y="100"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="33" value=" Send to " style="text;html=1;resizable=0;points=[];align=center;verticalAlign=middle;labelBackgroundColor=#ffffff;fontSize=12;fontColor=#4A5262;spacingTop=-2;" vertex="1" connectable="0" parent="13">
      <mxGeometry x="-0.25" y="-32" relative="1" as="geometry">
        <mxPoint x="32" as="offset"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="28" value="STORE " style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;shadow=0;glass=0;fontSize=14;fontColor=#63C59E;fontStyle=1" vertex="1" parent="1">
      <mxGeometry x="320" y="40" width="40" height="20" as="geometry"/>
    </mxCell>
    <mxCell id="36" value="EFFECT" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;shadow=0;glass=0;fontSize=14;fontColor=#4A5262;fontStyle=1" vertex="1" parent="1">
      <mxGeometry x="690" y="40" width="40" height="20" as="geometry"/>
    </mxCell>
  </root>
</mxGraphModel>

`;

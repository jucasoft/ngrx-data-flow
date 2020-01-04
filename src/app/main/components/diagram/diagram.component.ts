/* tslint:disable:triple-equals max-line-length variable-name */
import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {WindowRef} from '@core/components/window-ref';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {

  constructor(private readonly winRef: WindowRef) {
  }

  @Input()
  set xmldDoc(value: string) {
    this._xmldDoc = value;
    if (this.graph) {
      this.updateData();
    }
  }

  private _window = window;

  private _xmldDoc: string;

  private graph: mxGraph;

  @ViewChild('graphContainer', {static: true})
  graphContainer: ElementRef;

  @ViewChild('overlay', {static: true})
  outline: ElementRef;

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  //
  @Input()
  showOutline = false;

  @Output() selectedItems = new EventEmitter<any[]>();

  public getGraph = () => this.graph;

  public perform(command: (graph: any, model: any) => void): void {
    const graph = this.getGraph();
    const model = graph.getModel();
    model.beginUpdate();
    command(graph, model);
    model.endUpdate();
  }

  private updateData() {
    console.log('DiagramComponent.updateData()');
    const doc = this.winRef.nativeWindow.mxUtils.parseXml(this._xmldDoc);
    const codec = new this.winRef.nativeWindow.mxCodec(doc);
    const model = this.graph.getModel();
    model.beginUpdate();
    codec.decode(doc.documentElement, model);
    // const layout = new this.winRef.nativeWindow.mxHierarchicalLayout(this.graph, this.winRef.nativeWindow.mxConstants.DIRECTION_WEST);
    // layout.intraCellSpacing = 500;
    // layout.interRankCellSpacing = 100;
    // layout.interHierarchySpacing = 500;
    // layout.parallelEdgeSpacing = 500;
    // layout.execute(this.graph.getDefaultParent());
    model.endUpdate();
  }

  ngAfterViewInit() {

    const graph = new mxGraph(this.graphContainer.nativeElement);

    // Creates the outline (navigator, overview) for moving
    // around the graph in the top, right corner of the window.
    if (this.showOutline) {
      const outln = new this.winRef.nativeWindow.mxOutline(graph, this.outline.nativeElement);
    }


    graph.getSelectionModel().addListener(this.winRef.nativeWindow.mxEvent.CHANGE, (sender, evt) => {
      const cells: any[] = evt.getProperty('removed');
      console.log('evt', evt);
      // cells.forEach(item => console.log(item));
      this.selectedItems.emit(cells);
    });


    graph.setAutoSizeCells(true);
    graph.setPanning(true);
    graph.setCellsMovable(false);

    graph.setConnectableEdges(false);
    graph.setDisconnectOnMove(false);
    graph.setConnectable(true);
    graph.setMultigraph(false);
    graph.setBorder(0);
    graph.centerZoom = true;
    (graph as any).panningHandler.useLeftButtonForPanning = true;
    (graph as any).panningHandler.popupMenuHandler = false;

    graph.view.scale = 1;
    graph.gridEnabled = true;
    graph.graphHandler.guidesEnabled = true;
    graph.centerZoom = false;
    const mxRubberband = new this.winRef.nativeWindow.mxRubberband(graph);

    // graph.maximumGraphBounds = new mxRectangle(0, 0, this.width, this.height);
    graph.border = 50;

    // stile freccie
    const Edgestyle = graph.getStylesheet().getDefaultEdgeStyle();
    const EdgeConstants: any = mxConstants;
    Edgestyle[EdgeConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
    Edgestyle[EdgeConstants.STYLE_ROUNDED] = true;
    // delete Edgestyle['endArrow'];

    // graph.putDefaultVertexStyle(graph.createDefaultVertexStyle());
    // graph.putDefaultEdgeStyle(graph.createDefaultEdgeStyle());

    this.graph = graph;
    this.updateData();
  }

  @HostListener('mousewheel', ['$event'])
  private onMousewheel(event) {
    if (!event.ctrlKey) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    if (event.wheelDelta > 0) {
      this.graph.zoomIn();
    }
    if (event.wheelDelta < 0) {
      this.graph.zoomOut();
    }
  }

  @HostListener('dblclick', ['$event'])
  private onDblclick(event) {
    event.stopPropagation();
    event.preventDefault();
    if (event.altKey) {
      this.graph.zoomOut();
      return;
    }
    this.graph.zoomIn();
  }

  moveTopLeft() {
    const scale = this.graph.view.scale;
    console.log('scale', scale);
    const bounds = this.graph.getGraphBounds();
    console.log('bounds', bounds);
    const tx = -bounds.x / scale;
    const ty = -bounds.y / scale;
    console.log('tx: ' + tx);
    console.log('ty: ' + ty);
    // this.graph.view.setTranslate(tx / 2, ty / 2);

    this.graph.view.setSkewX(0);
    this.graph.view.setSkewY(0);
  }

  getSize() {
    console.log('DiagramComponent.getSize()');
    return window.innerHeight - 200;
  }
}

export const grid = (graph, canvas) => {
  const bounds = graph.getGraphBounds();

  const tr = graph.view.translate.clone();
  const s = graph.view.scale;
  const gs = graph.gridSize;
  const w = Math.max(bounds.width);
  const h = Math.max(bounds.height);

  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.right = '0px';
  canvas.style.bottom = '0px';
  canvas.style.zIndex = '-1';
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  graph.container.appendChild(canvas);

  if (!!ctx) {

    const tx = tr.x * s;
    const ty = tr.y * s;

    // Sets the distance of the grid lines in pixels
    const minStepping = graph.gridSize;
    let stepping = minStepping * s;

    if (stepping < minStepping) {
      const count = Math.round(Math.ceil(minStepping / stepping) / 2) * 2;
      stepping = count * stepping;
    }

    const xs = Math.floor((0 - tx) / stepping) * stepping + tx;
    let xe = Math.ceil(w / stepping) * stepping;
    const ys = Math.floor((0 - ty) / stepping) * stepping + ty;
    let ye = Math.ceil(h / stepping) * stepping;

    xe += Math.ceil(stepping);
    ye += Math.ceil(stepping);

    const ixs = Math.round(xs);
    const ixe = Math.round(xe);
    const iys = Math.round(ys);
    const iye = Math.round(ye);

    // Draws the actual grid
    ctx.strokeStyle = '#f6f6f6';
    ctx.beginPath();

    for (let x = xs; x <= xe; x += stepping) {
      x = Math.round((x - tx) / stepping) * stepping + tx;
      const ix = Math.round(x);

      ctx.moveTo(ix + 0.5, iys + 0.5);
      ctx.lineTo(ix + 0.5, iye + 0.5);
    }

    for (let y = ys; y <= ye; y += stepping) {
      y = Math.round((y - ty) / stepping) * stepping + ty;
      const iy = Math.round(y);

      ctx.moveTo(ixs + 0.5, iy + 0.5);
      ctx.lineTo(ixe + 0.5, iy + 0.5);
    }

    ctx.closePath();
    ctx.stroke();
  }

};

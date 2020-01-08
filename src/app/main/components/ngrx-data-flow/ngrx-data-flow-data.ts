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

import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
// import { Aggregate, AggregatesDirective, AggregateDirective, AggregateColumnsDirective , AggregateColumnDirective , ColumnDirective, ColumnsDirective, TreeGridComponent, Sort, Inject, Page  } from '@syncfusion/ej2-react-treegrid';
// import { GridComponent , ColumnsDirective, ColumnDirective, Sort, Inject, Page, Aggregate, Group, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Page, Aggregate, Group, AggregateColumnsDirective, AggregateColumnDirective, AggregateDirective, AggregatesDirective } from '@syncfusion/ej2-react-grids';
import { categoryData } from './data';
import {
  RichTextEditorComponent,
  Toolbar,
  Image,
  Link,
  HtmlEditor,
  QuickToolbar,
} from '@syncfusion/ej2-react-richtexteditor';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';


function RichPostContent(props) {
  const editorRef = React.useRef(null);

  const updateHtmlContent = (newHtml) => {
    editorRef.current.setHtml(newHtml);
  };

  const getHtmlContent = () => {
    return editorRef.current.getHtml();
  };
  let inlineMode = {
    enable: true,
    onSelection: true
  };
  let toolbarSettings = {
    items: [
      'Bold', 'Italic', 'Underline', 'Formats', '-',
      'Alignments', 'OrderedList', 'UnorderedList', 'CreateLink'
    ]
  };
  return (
    <RichTextEditorComponent inlineMode={inlineMode} toolbarSettings={toolbarSettings} value={props.PostContent}>
      <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p>
      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
    </RichTextEditorComponent>
  );
}


function AggregateGroup() {
  const pageSettings = { pageCount: 5 };
  const groupSettings = { showDropArea: false, columns: ['PostName'] };
  function groupFooterSum(props) {
    return (<span>Total units: {props.Sum}</span>);
  }
  function groupFootertCount(props) {
    return (<span>Validated: {props.TrueCount}</span>);
  }
  function groupcFootertAvg(props) {
    return (<span>Average: <RatingComponent value={props.Average} /></span>);
  }
  function rating(props) {
    return (<span><RatingComponent value={props.Rating} /></span>);
  }
  return (<div className='control-pane'>
    <div className='control-section'>
      <GridComponent dataSource={categoryData} allowPaging={true} pageSettings={pageSettings} allowGrouping={true} groupSettings={groupSettings} allowSorting={true}>

        {/* <TreeGridComponent dataSource={categoryData} treeColumnIndex={0} childMapping='children' height='260'>         */}
        <ColumnsDirective>
          <ColumnDirective field='PostName' headerText='Post Name' width='70'></ColumnDirective>
          <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
          <ColumnDirective field='Comment' headerText='Comment' width='180' textAlign='Right'></ColumnDirective>
          <ColumnDirective field='Rating' headerText='Rating' width='150' textAlign='Right' template={rating} >
          </ColumnDirective>
          <ColumnDirective field='Content' headerText='Content' width='400' textAlign='Right' template={RichPostContent} >
          </ColumnDirective>

          <ColumnDirective field='Validated' headerText='Validated Comments' displayAsCheckBox={false} width='20' textAlign='Center'></ColumnDirective>
        </ColumnsDirective>
        <AggregatesDirective>
          <AggregateDirective>
            <AggregateColumnsDirective>
              <AggregateColumnDirective field='Validated' type='TrueCount' groupFooterTemplate={groupFootertCount}> </AggregateColumnDirective>
            </AggregateColumnsDirective>
          </AggregateDirective>
          <AggregateDirective>
            <AggregateColumnsDirective>
              <AggregateColumnDirective field='Rating' type='Average' template={rating} groupCaptionTemplate={groupcFootertAvg}> </AggregateColumnDirective>
            </AggregateColumnsDirective>
          </AggregateDirective>
        </AggregatesDirective>
        <Inject services={[Page, Aggregate, Sort]} />

      </GridComponent>
    </div>
  </div>);
}
export default AggregateGroup;

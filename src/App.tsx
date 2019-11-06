import * as React from 'react';
import './App.css';
import FormContainer, { childData}  from './Component/FormContainer';

// import logo from './logo.svg';

class App extends React.Component {
  /* tslint:disable */ 
  public state = {
    columnDefs: [],
    data_dict: [
      {
        "username": "core_admin",
        "had_horizontal_learning": "02",
        "reporting_month": "2019-10-01",
        "had_demons_crops": "02",
        "had_tech_adopt_wmg": "01"
      },
      {
        "username": "unicef_admin",
        "had_horizontal_learning": "03",
        "reporting_month": "2019-10-01",
        "had_demons_crops": "02",
        "had_tech_adopt_wmg": "01"
      }
      ,{
        "username": "core_admin",
        "had_horizontal_learning": "04",
        "reporting_month": "2019-10-01",
        "had_demons_crops": "02",
        "had_tech_adopt_wmg": "01"
      }
    ],
    filter_dict:[
      {"filter_type":"single_select","label_name":"Submitted By", "field_name":"username", "element_name":"username", "width":"50%" ,"align":"left", "properties":""},
      {"filter_type":"multi_select","label_name":"Submitted By multi Select", "field_name":"username", "element_name":"submitted_by", "width":"50%" ,"align":"left", "properties":""}
      ],
    list_def: [
        { "table_header": "WMG Tracker",
          "list_name": "wmg_tracker",
          "datasource": "bahis_wmg_tracker_v2_table",
          "column_definition": [
             {"field_name": "username",
              "is_sortable": true,
              "filter": true,
              "header_name": "Submitted By"
            },
             { "field_name": "had_horizontal_learning",
              "is_exportable": false,
              // "is_hidden": true,
              "header_name": "Horizontal Learning"
            },
             {
              "field_name": "reporting_month",
              "is_sortable": true,
              "filter": true,
              "header_name": "Reporting Month"
            },
           {
              "field_name": "had_demons_crops",
              "is_hidden": true,
              "header_name": "Demon Crops"
            },
            {
              "field_name": "had_tech_adopt_wmg",
              "is_exportable": false,
              "header_name": "Tech Adopt Wmg"
            }
          ]
        }
      ],
  }

  private formatListDef = () => { 
    //statements 
    let list_def = this.state.list_def;
    let column_def:childData[] = [];
    // console.loeg(list_def);
    let col_def = list_def[0]['column_definition'];
    console.log("First Column Data")
    console.log(col_def);
    
    for (let col of col_def){
        let dict = {};
        let is_sortable,is_hidden,filter = false;

        if ('is_hidden' in col)
            is_hidden = col['is_hidden'];
        if (is_hidden)
            continue;
        if ('filter' in col && col['filter'])
            filter = col['filter'];
        if ('is_sortable' in col)
            is_sortable = col["is_sortable"]

        dict['filter'] = filter;
        dict['headerName'] = col["header_name"];
        dict['field'] = col['field_name'];
        dict['sortable'] = is_sortable;
       
        column_def.push(dict);
    
    }
    console.log(column_def);
    return column_def;
 }

  /* tslint:enable */

  public render() {
    
    const {  data_dict,filter_dict,list_def} = this.state;
    const column_def = this.formatListDef();
    const table_header = list_def[0]['table_header'];


    return (
      <div className="App">
        <div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <FormContainer  list_def={column_def} data_dict={data_dict} filter_dict={filter_dict} select_key={table_header}/>
        </div>
      </div>
    );
  }
}

export default App;

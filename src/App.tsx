import * as React from 'react';
import './App.css';
import FormContainer, { childData}  from './Component/FormContainer';

// import logo from './logo.svg';

class App extends React.Component {
  /* tslint:disable */ 
  public state = {
    columnDefs: [],
    data_dict: [
      // {
      //   "username": "core_admin",
      //   "had_horizontal_learning": "02",
      //   "reporting_month": "2019-10-01",
      //   "had_demons_crops": "02",
      //   "had_tech_adopt_wmg": "01"
      // },
      // {
      //   "username": "unicef_admin",
      //   "had_horizontal_learning": "03",
      //   "reporting_month": "2019-10-01",
      //   "had_demons_crops": "02",
      //   "had_tech_adopt_wmg": "01"
      // }
      // ,{
      //   "username": "core_admin",
      //   "had_horizontal_learning": "04",
      //   "reporting_month": "2019-10-01",
      //   "had_demons_crops": "02",
      //   "had_tech_adopt_wmg": "01"
      // }
    ],
    filter_dict:[
      {"filter_type":"text","label_name":"Branch Name", "field_name":"Branch Name", "element_name":"branch_name", "width":"50%" ,"align":"left", "properties":"", "dependency":"district_name","appearance":{"type":"date-picker"}},

      {"filter_type":"date","label_name":"Last Visit Date", "field_name":"Last Visit Date", "element_name":"submitted_by", "width":"50%" ,"align":"left", "properties":"", "dependency":"district_name","appearance":{"type":"date-picker"}},
      {"filter_type":"multi_select","label_name":"Enterrpise Name", "field_name":"Enterrpise Name", "element_name":"enterprise_name", "width":"50%" ,"align":"left", "properties":"", "appearance":{"searchable":false,"type":"checkbox"}, "dependency":[] },
      {"filter_type":"single_select","label_name":"District", "field_name":"district_name", "element_name":"district_name", "width":"50%" ,"align":"left", "properties":"", "appearance":{"searchable":false,"type":""}, "dependency":[] },
      {"filter_type":"single_select","label_name":"Upazila", "field_name":"upazila_name", "element_name":"upazila_name", "width":"50%" ,"align":"left", "properties":"", "appearance":{"searchable":"true"}, "dependency":["district_name"] },
      {"filter_type":"single_select","label_name":"Union", "field_name":"union_name", "element_name":"union_name", "width":"50%" ,"align":"left", "properties":"", "appearance":{"searchable":"true"}, "dependency":["district_name","upazila_name"] },
      {"filter_type":"single_select","label_name":"Village", "field_name":"village_name", "element_name":"village_name", "width":"50%" ,"align":"left", "properties":"", "appearance":{"searchable":"true"}, "dependency":["district_name","union_name","upazila_name"] },
      {"filter_type":"single_select","label_name":"Spot", "field_name":"pra_name", "element_name":"pra_name", "width":"50%" ,"align":"left", "properties":"", "appearance":{"searchable":"true"}, "dependency":["district_name","union_name","upazila_name","village_name"] },
    ],
    list_def: [
        { "table_header": "Household Table",
          "list_name": "wmg_tracker",
          "datasource": "bahis_wmg_tracker_v2_table", 
          "column_definition": [
            {
                "field_name": "HH SI",
                "is_sortable": true,
                "filter": true,
                "header_name": "HH SI",
                "data_type":"numeric",
                "align":""
              },
             {
                "field_name": "Household ID",
                "is_hidden": false,
                "header_name": "Household ID"
              },
               {"field_name": "Enterrpise Name",
                "is_sortable": true,
                "filter": true,
                "header_name": "Enterrpise Name"
              },
               { "field_name": "branch_name",
                "is_exportable": false,
               
                "header_name": "Branch Name"
              },
              {
                "field_name": "NAME",
                "is_exportable": false,
                "header_name": "NAME"
              } 
              ,{
                "field_name": "district_name",
                  "is_exportable": false,
                  "header_name": "District Name"
                },
                {
                "field_name": "upazila_name",
                  "is_exportable": false,
                  "header_name": "Upazila Name"
                },
                {
                  "field_name": "union_name",
                    "is_exportable": false,
                    "header_name": "Union Name"
                  },
                  {
                    "field_name": "village_name",
                      "is_exportable": false,
                      "header_name": "Village Name"
                    },
                    {
                      "field_name": "pra_name",
                        "is_exportable": false,
                        "header_name": "PRA"
                      },
                      {
                        "field_name": "Last Visit Date",
                          "is_exportable": false,
                          "header_name": "Last Visit Date"
                        },
            ]
        }
      ],
      
    contacts: []
  }

  componentDidMount = () => {
    fetch('http://35.201.192.78:6001/tupmodule/get/test_data/3/')
    .then(res => res.json())
    .then((data) => {
      this.formatListDef();
      // console.log(data.data_dict);
      this.setState({ data_dict: data.data_dict
       })
    }).catch(
      error => this.setState({ 
      loading: false, 
      error: true 
    }));
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
        // let is_align = 'left';

        if ('is_hidden' in col)
            is_hidden = col['is_hidden'];
        if (is_hidden)
            continue;
        if ('filter' in col && col['filter'])
            filter = col['filter'];
        if ('is_sortable' in col)
            is_sortable = col["is_sortable"]

        // if ('align' in col )
        //     is_align= col['align']

        dict['filter'] = filter;
        dict['headerName'] = col["header_name"];
        dict['field'] = col['field_name'];
        dict['sortable'] = is_sortable;
        // dict['pinned'] = "left";
       
        column_def.push(dict);
    
    }
    // console.log(column_def);
    return column_def;
 }

  /* tslint:enable */

  public render() {
    
    const {  data_dict,filter_dict,list_def} = this.state;
    console.log(data_dict);
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
        {data_dict && data_dict.length>0 && <FormContainer  list_def={column_def} data_dict={data_dict} filter_dict={filter_dict} select_key={table_header}/>}
        </div>
      </div>
    );
  }
}

export default App;

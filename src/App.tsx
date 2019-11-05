import * as React from 'react';
import './App.css';
import FormContainer from './Component/FormContainer';

// import logo from './logo.svg';

class App extends React.Component {
  /* tslint:disable */ 
  public state = {
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
      {"filter_type":"multi_select","label_name":"Submitted By multi Select", "field_name":"username", "element_name":"username", "width":"50%" ,"align":"left", "properties":""}
      ]
  }
  /* tslint:enable */

  public render() {
    
    const {  data_dict,filter_dict } = this.state;
    

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
        <FormContainer  data_dict={data_dict} filter_dict={filter_dict} select_key="had_horizontal_learning"/>
        </div>
      </div>
    );
  }
}

export default App;

import * as React from "react";
import Select from 'react-select';
import {childData} from './FormContainer';
import 'react-widgets/dist/css/react-widgets.css';

// ...Or if you prefer to use the Less or Sass files directly
// import 'react-widgets/lib/less/react-widgets.less';
// import 'react-widgets/lib/scss/react-widgets.scss';

// import { Multiselect } from 'react-widgets';
// import  MultiSelectReact  from 'multi-select-react';


/* tslint:disable */ 
export interface MultiSelectOption {
  name: string
}
//backspaceRemoves={this.state.backspaceRemoves}
interface MultiselectDropDownProps{
  name: any;
  title: String;
  placeholder: String;
  options: childData[];
  handleChange: any;
  value:any;
  isMulti:boolean;
  isSearchable:boolean

}


export interface MultiselectDropDownState {
  
}
 
class MultiselectDropDown extends React.Component<MultiselectDropDownProps, MultiselectDropDownState> {
  


  constructor(props){
    super(props);
    this.state = { 
      condition: null,
     
    }
   
  
  }


  private getValue=()=>{
    const {value,isMulti} = this.props;
    let valueList:childData[] = [];
    if (isMulti){
      if (value){
        for (let val of value){
          valueList.push({id:name,value:val, label:val})
               }
      }
     
    }
    else{
      console.log("Select Value");
      console.log(value);
      if (value)
      valueList.push({id:name,value:value, label:value})
    }
           return valueList;
  }


  render() { 

    let valueList = this.getValue();
    return ( 
        <div className="form-group">
            <label htmlFor={this.props.name}> {this.props.title} </label>
            {/* <Multiselect 
      data={props.options}
       /> */}
       <Select style={{ width: "50%", marginBottom: "20px" }}
        value={valueList}
       
        /* tslint:disable */ 
         onChange={this.props.handleChange}

        /* tslint:enable */ 
        isSearchable = {this.props.isSearchable}
        options={this.props.options}
        isMulti={this.props.isMulti}
      />
      </div>
     );
  }
}
 
export default MultiselectDropDown;
/* tslint:enable */ 
// const MultiselectDropDown: React.FunctionComponent<MultiselectDropDownProps> = props => (
//   <div className="form-group">
//             <label htmlFor={props.name}> {props.title} </label>
//             {/* <Multiselect 
//       data={props.options}
//        /> */}
//        <Select style={{ width: "50%", marginBottom: "20px" }}
//         value={{id:props.name,value:props.value, label:props.value}}
       
//         /* tslint:disable */ 
//          onChange={props.handleChange}

//         /* tslint:enable */ 
//         isSearchable = {props.isSearchable}
//         options={props.options}
//         isMulti={props.isMulti}
//       />
//       </div>
// );

// export default  MultiselectDropDown;

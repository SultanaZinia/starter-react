import * as React from "react";
// import {childData} from './FormContainer';
import 'react-widgets/dist/css/react-widgets.css';
import { SelectList } from 'react-widgets';

// ...Or if you prefer to use the Less or Sass files directly
// import 'react-widgets/lib/less/react-widgets.less';
// import 'react-widgets/lib/scss/react-widgets.scss';

// import { Multiselect } from 'react-widgets';
// import  MultiSelectReact  from 'multi-select-react';


/* tslint:disable */ 
export interface MultiSelectOption {
  name: string
}

interface CheckBoxProps{
  name: any;
  title: String;
  options: string[];
  handleChange: any;
  value:string;
  type:string;
  multiple: boolean;
}
/* tslint:enable */ 
const CheckBox: React.FunctionComponent<CheckBoxProps> = props => (
  <div className="radio-buttons">
        <label htmlFor={props.name}> {props.title} </label>
       
        <SelectList
        data={props.options}
        value={props.value}
        multiple={props.multiple}
        onChange={props.handleChange}
      />
      
      </div>
);

export default  CheckBox;
  
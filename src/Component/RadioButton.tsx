import * as React from "react";
// import {childData} from './FormContainer';
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

interface RadioButtonProps{
  name: any;
  title: String;
  options: string[];
  handleChange: any;
  value:string;
  type:string;
}
/* tslint:enable */ 
const RadioButton: React.FunctionComponent<RadioButtonProps> = props => (
  <div className="radio-buttons">
        <label htmlFor={props.name}> {props.title} </label>
       
      { props.options.map((elm: string, index) => (
                          <fieldset>
                              
                                <input
                                
                                value={elm}
                                name={props.name}
                                type={props.type}
                                onChange={props.handleChange}
                              />
                              <label>{elm}</label>
                          </fieldset>
                              
                                ))}
      
      </div>
);

export default  RadioButton;
  
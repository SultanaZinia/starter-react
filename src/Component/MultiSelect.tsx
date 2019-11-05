import * as React from "react";

import 'react-widgets/dist/css/react-widgets.css';

// ...Or if you prefer to use the Less or Sass files directly
// import 'react-widgets/lib/less/react-widgets.less';
// import 'react-widgets/lib/scss/react-widgets.scss';

import { Multiselect } from 'react-widgets';
// import  MultiSelectReact  from 'multi-select-react';


/* tslint:disable */ 
export interface MultiSelectOption {
  name: string
}

interface MultiselectDropDownProps{
  name: any,
  title: String,
  placeholder: String,
  options: string[],

}
/* tslint:enable */ 
const MultiselectDropDown: React.FunctionComponent<MultiselectDropDownProps> = props => (
  <div className="form-group">
            <label htmlFor={props.name}> {props.title} </label>
            <Multiselect 
      data={props.options}
       />
      </div>
);

export default  MultiselectDropDown;

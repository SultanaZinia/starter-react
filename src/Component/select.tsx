import * as React from "react";
import { DropdownList } from 'react-widgets'

/* tslint:disable */ 
export interface SelectOption {
  name: string
}

interface SelectProps {
  name: any,
  title: String,
  placeholder: String,
  options: string[]

}
/* tslint:enable */ 
const Select: React.FunctionComponent<SelectProps> = props => (
  <div className="form-group">
            <label htmlFor={props.name}> {props.title} </label>
            <DropdownList 
   
    data={props.options}
  />
      </div>
);

export default Select;

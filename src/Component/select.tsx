import * as React from "react";
// import { DropdownList } from 'react-widgets'

/* tslint:disable */ 
export interface SelectOption {
  name: string
}

interface SelectProps {
  name: any,
  title: String,
  placeholder: String,
  options: string[],
  handleChange: any,
  id: string
 
 

}
/* tslint:enable */ 
const Select: React.FunctionComponent<SelectProps> = props => (
  <div className="form-group">
            {/* <label htmlFor={props.name}> {props.title} </label> */}
            {/* <DropdownList 
    data={props.options}
    onChange={props.handleChange}
  /> */}
  <div className="form-group">
            <label htmlFor={props.name}> {props.title} </label>
            <select
              name={props.name}
              
              onChange={props.handleChange}
              >
              <option value="%" >{props.placeholder}</option>
              {props.options.map(option => {
                return (
                  <option
                    key={option}
                    value={option}
                    label={option}>{option}
                  </option>
                );
              })}
            </select>
      </div>
      </div>
);

export default Select;

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
  options: SelectOption[],

}
/* tslint:enable */ 
const Select: React.FunctionComponent<SelectProps> = props => (
  <div className="form-group">
            <label htmlFor={props.name}> {props.title} </label>
            <select name={props.name}
              // value={props.value}
              // onChange={props.handleChange}
              >
              <option value="" disabled={true}>{props.placeholder}</option>
              {props.options.map(option => {
                return (
                  <option
                    key={option.name}
                    value={option.name}
                    label={option.name}>
                      {option.name}
                  </option>
                );
              })}
            </select>
      </div>
);

export default Select;

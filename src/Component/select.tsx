import * as React from "react";
// import { DropdownList } from 'react-widgets'


/* tslint:disable */ 
export interface SelectOption {
  name: string
}

interface SelectProps {
  name: any;
  title: String;
  type:string;
  handleChange: any;
  id: string;
  options: any;
 
 

}

export interface SelectState {
  condition: any;
  options: string[];
  value1:any;
  value2:any;
}
 
class Select extends React.Component<SelectProps, SelectState> {




constructor(props){
  super(props);
  this.state = { 
    condition: null,
    options:  ['Contains','Not Contains','Equals','Not Equals','Starts'],
    value1:null,
    value2:null,
  }
 

}

public renderAvailable=()=> {
  const {options,condition} = this.state;
  return (
    <select value={condition} 
     /* tslint:disable */
    onChange={e =>this.setState({ condition: e.target.value })}>
      {options.map(this.renderField.bind(this))}
    </select>
  );
}

 

public renderField = ({name, displayName})=>{
  return <option key={name} value={name}>{displayName}</option>;
}




private makeTextInput = () => {
  const {condition} = this.state;
  if (condition){
    switch (condition.toLowerCase()) {
      case 'between':
        return (<div><input                  
          value={this.state.value1}
          name={this.props.name}
          type={this.props.type}
          onChange={e=>{this.passingProps(e,"value1")}}
        /><input                  
        value={this.state.value2}
        name={this.props.name}
        type={this.props.type}
        onChange={e=>{this.passingProps(e,"value2")}}
      /></div>)
        break;
      case 'not between':
          return (<div><input                  
            value={this.state.value1}
            name={this.props.name}
            type={this.props.type}
            onChange={e=>{this.passingProps(e,"value1")}}
          /><input                  
          value={this.state.value2}
          name={this.props.name}
          type={this.props.type}
          onChange={e=>{this.passingProps(e,"value2")}}
        /></div>)
          break;
      default:
        return (<input                  
          value={this.state.value1}
          name={this.props.name}
          type={this.props.type}
          onChange={e=>{this.passingProps(e,"value1")}}
        />);
    }
  }
  return (<input                  
    value={this.state.value1}
    name={this.props.name}
    type={this.props.type}
    onChange={e=>{this.passingProps(e,"value1")}}
  />);
     
};

private reset = (selected) => {
  console.log(selected);
  this.setState({
   condition:selected.target.value
  });
};

passingProps(e,keyName){


  console.log("mPower");
  console.log(e);
  //alert(newInput);
  /*
 this.setState({
   text:newInput
  });
  this.props.getInput(newInput));
  */
//setSTate is asynchronous and we cant expect setState in one line and get it's value in the next line
//because most probably it hasnt been set yet.
// that is why we are using this.props.getInput(newInput) instead of using this.props.getInput(this.state.text) 
// because the state of text is still not set.
  
//instead we can also use the callback function of setstate to call the parent function
//and then we can use this.state.text
// see how it's done below:
  
  this.setState({...this.state,
    [keyName]:e.target.value
  },()=>this.props.handleChange([this.state.value1,this.state.value2],this.state.condition,this.props.id) );
  
}


render() { 

    const {options} = this.props;
    let sortedList = options.sort()
  .map((location, index) => <option key={index}>{location}</option>);

    return ( <div>
       <label htmlFor={this.props.name}>{this.props.title} </label>
       
       <select
       /* tslint:disable */
       onChange={selected => this.reset(selected)}
        /* tslint:enable */ > {sortedList}</select>
        {this.makeTextInput()}
   
    </div> );
  }
}
 
export default Select;
// /* tslint:enable */ 
// const Select: React.Component<SelectProps> = props => (
//   <div className="form-group">
//             {/* <label htmlFor={props.name}> {props.title} </label> */}
//             {/* <DropdownList 
//     data={props.options}
//     onChange={props.handleChange}
//   /> */}
//   <div className="form-group">
//             <label htmlFor={props.name}> {props.title} </label>
//             <select
//               name={props.name}
//               value={props.value}
//               onChange={props.handleChange}
//               >
//               <option value="%" >{props.placeholder}</option>
//               {props.options.map(option => {
//                 return (
//                   <option
//                     key={option}
//                     value={option}
//                     label={option}>{option}
//                   </option>
//                 );
//               })}
//             </select>
//       </div>
//       </div>
// );

// export default Select;

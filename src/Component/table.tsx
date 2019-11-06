import * as React from 'react';
import './pokemon.css';
import {childData} from './FormContainer';
// import { Button } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


export interface TableProps {
    title: string,
    // element_name: string,
    // contacts: Object,
    list_def: childData[],
    // data_df: [],
    data_dict: childData[],
}
 
export interface TableSearchState {
    
}
 
class Table extends React.Component<TableProps, TableSearchState> {

    
    state = { count : 0,
        
    }
    
    multiply = () => {
        this.setState({count:(this.state.count*this.state.count)})
    }

    increment = (value:number) => {
        this.setState({
          count: (this.state.count + value)
        });
      };
    
    decrement = () => {
        this.setState({
          count: (this.state.count - 1)
        });
      };

      


    //   renderTableHeader =() =>{
    //     // this.componentDidMount();
    //       console.log(this.props.contacts);
    //     let header = Object.keys(this.state.students[0])
    //     return header.map((key, index) => {
    //        return <th key={index}>{key.toUpperCase()}</th>
    //     })
    //  }
     
    //  renderTableData = () =>{
    //     return this.state.students.map((student, index) => {
    //        const { id, name, age, email } = student //destructuring
    //        return (
    //           <tr key={id}>
    //              <td>{id}</td>
    //              <td>{name}</td>
    //              <td>{age}</td>
    //              <td>{email}</td>
    //           </tr>
    //        )
    //     })
    //  }

     renderContactTableHeader = ()=>{
        let header = Object.keys(this.props.data_dict[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
     

     

     createCol = (child:childData) => {
        let keys = Object.keys(child);
          for (let key of keys) {
              let childData = child[key];
            if (typeof (childData) == 'object'){
                childData = '';
            }
            return (<td key={key}>{childData}</td>)
          }
          
          //Create the parent and add the children
         return (<td>Nothing</td>)
    }

    render() { 

        const {data_dict,list_def,title} = this.props;
        console.log(list_def);

        return ( <div>   
                        <div className="portlet-title"><p>{title}</p></div>
                        <div className="ag-theme-balham" style={{ height: '400px'}}>
                            <AgGridReact columnDefs={list_def} rowData={data_dict} pagination={true}/>
        
            
                        </div>
                        <div>
           
                            {/* <h2>Table part</h2>
                            <table id = "">
                                <tbody>
                                    <tr>{this.renderContactTableHeader()}</tr>
                                        { data_dict.map((elm: childData, index) => (
                                    <tr key={index}>{this.createCol(elm)}<br /></tr>
                                    ))}
                                </tbody>
                            </table> */}


            
                        </div>
                </div>  
            );
    }
}
 
export default Table;
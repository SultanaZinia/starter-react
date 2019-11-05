import * as React from 'react';

import Select, { SelectOption } from './select';
import MultiselectDropDown from './MultiSelect';
import Table from './table';

export interface childData{
    [key: string]: string;
}
/* tslint:disable */ 
export interface FormContainerProps {
    data_dict: childData[],
    filter_dict: childData[],
    select_key : string,
    list_def: childData[]
    

}
 
export interface FormContainerState {
    
}
/* tslint:enable */
class FormContainer extends React.Component<FormContainerProps,any> {
    constructor(props){
        super(props);
        this.state = { optionList: [], optionLoaded: false,
            multipleList:[],
        }
    }
    

    public componentDidMount() {
        const { select_key, data_dict } = this.props;
        const optionsList: SelectOption[] = [];
        const multipleList: String[] = [];
        /* tslint:disable */
        console.log(data_dict);
        /* tslint:enable */
        data_dict.forEach((item, key) => {
            multipleList.push(item[select_key]);
            optionsList.push({name: item[select_key]});
            this.setState({...this.state, optionsList,multipleList});
            /* tslint:disable */
            console.log(item,select_key, item[select_key], optionsList);
            /* tslint:enable */  
        });
        
     }

    private getDataList(select_key:string){
        const {data_dict} = this.props;
        const multipleList: string[] = [];
        data_dict.forEach((item:childData, key) => {
            multipleList.push(item[select_key]);
            // multipleList.push({"name": item[select_key]});
            /* tslint:enable */  
        })
        // let uniquelist = [...new Set(multipleList)];
        // let unique = [...new Set(multipleList))]; 
        let unique = Array.from(new Set(multipleList).values());
        console.log(unique);
        return unique;
    }

    // private getDataDict(select_key:string){
    //     const {data_dict} = this.props;
    //     const optionsList: SelectOption[] = [];
    //     data_dict.forEach((item:childData, key) => {
    //         // multipleList.push(item[select_key]);
    //         optionsList.push({"name": item[select_key]});
    //         /* tslint:enable */  
    //     })
    //     let unique = Array.from(new Set(optionsList).values());
    //     console.log(unique);
    //     return unique;
    // }

    private createFilterElement = (element:childData) => {
        
        // const {optionsList,multipleList} = this.state;
        let filter_type,label_name,field_name;
        // , properties, align,element_id, width
        if ("filter_type" in element){
            filter_type = element["filter_type"]
         }
         if ("field_name" in element){
            field_name = element["field_name"]
        }

        // let optionsList = this.getdataList(field_name);
        //  if ("properties" in element){
        //    properties = element["properties"]
        // }
        // if ("align" in element){
        //    align = element["align"]
        // }
        // if ("element_name" in element){
        //    element_id = element["element_name"]
        // }

        // if ("width" in element){
        //    width = element["width"]
        // }
        if ("label_name" in element){
            label_name = element["label_name"]
        }
         //Create the parent and add the children


        if (filter_type=="single_select"){
            let optionsList = this.getDataList(field_name);
             return (<Select title={label_name}
             name={label_name}
             options = {optionsList} 
             placeholder = {'--Select--'}/>)
            }
        if (filter_type =="multi_select")
        {   
            let optionsList = this.getDataList(field_name);
            return (<MultiselectDropDown  title={label_name}
            name={label_name}
            options = {optionsList} 
            placeholder = {'--Select--'}/>)
        }
         return (<p>Nothing</p>)
        }


    public render() { 
        const {optionsList,multipleList} = this.state;
        const {filter_dict,data_dict,list_def} = this.props;
        /* tslint:disable */ 
        console.log(optionsList);
        console.log(multipleList);
        /* tslint:enable */ 
        return (<div className="col-md-6"> 
        { filter_dict.map((elm: childData, index) => (
          <div key={index}>
            {this.createFilterElement(elm)}
            <br />
          </div>
        ))}
        <Table data_dict={data_dict} list_def={list_def}/>

        

        </div>);
    }
}
 
export default FormContainer;


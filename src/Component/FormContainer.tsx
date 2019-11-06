import * as React from 'react';

import Select from './select';
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
    list_def: childData[],
    // column_def: [[]]

}
 
export interface FormContainerState {
    optionsList: string[]; 
    data_list: childData[];
    multipleList: string[];
    values: childData;
}

/* tslint:enable */
class FormContainer extends React.Component<FormContainerProps,FormContainerState> {
    constructor(props){
        super(props);
        this.state = { optionsList: [],
            data_list: [],
            multipleList:[],
            values: {}
            
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    

    public componentDidMount() {
        const {  filter_dict,data_dict } = this.props;

        for (let filter of filter_dict){
            if ("element_name" in filter){
                const element_id = filter["element_name"];
               this.setState({...this.state, [element_id]: ""});
            }
        }
        
        this.setState({...this.state, data_list:data_dict})
        /* tslint:disable */
        // console.log(data_dict);
        /* tslint:enable */
        // filter_dict.map((elm: childData, index) => (
           
        //      this.setState({...this.state, optionsList,multipleList})
        //     ));
        // // data_dict.forEach((item, key) => {
        // //     multipleList.push(item[select_key]);
        // //     optionsList.push({name: item[select_key]});
        // //     this.setState({...this.state, optionsList,multipleList});
        // //     /* tslint:disable */
        // //     console.log(item,select_key, item[select_key], optionsList);
        // //     /* tslint:enable */  
        // // });
        
     }

    private getDataList(select_key:string){
        const {data_dict} = this.props;
        const multipleList: string[] = ["Select"];
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
        let filter_type,label_name,field_name, element_id;
        // , properties, align, width
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
        if ("element_name" in element){
             element_id = element["element_name"];
        
        }

        // if ("width" in element){
        //    width = element["width"]
        // }
        if ("label_name" in element){
            label_name = element["label_name"]
        }
         //Create the parent and add the children
         

        if (filter_type=="single_select"){
             let optionsList = this.getDataList(field_name);
            
             return (<div className="col-md-3"><Select  id={element_id} title={label_name}
             name={element_id}
             options = {optionsList} 
             placeholder = {'--Select--'}
             handleChange = {this.handleInput}/></div>)
        }
        if (filter_type =="multi_select")
        {   
            let optionsList = this.getDataList(field_name);
            return (<div className="col-md-3"><MultiselectDropDown  title={label_name}
            name={label_name}
            options = {optionsList} 
            placeholder = {'--Select--'}/></div>)
        }
         return (<p>Nothing</p>)
        }


    private  handleFormSubmit (e) {
            const {values,data_list} = this.state;
            const filtered_data: childData[] = [];
            console.log(filtered_data);

            for (let data of data_list){
                let flag=false;
                console.log(data);
                let keys = Object(values).keys;
                for (let key of keys){
                    if (values[key] === data[key]){
                        flag=true;
                    }
                }
                if (flag){
                    filtered_data.push(data);
                }
                

            }
            this.setState({...this.state, data_list:filtered_data})
          }

    

    private handleInput(e) {
        
        let value = e.target.value;
        let name = e.target.name;
        console.log(value);
        console.log(name);
        
        // console.log(this.state);

        this.setState( prevState => ({ values : 
            {...prevState.values,  [name]: value
            }
          }), () => console.log(this.state.values))
    }     
          

    public render() { 
        // const {optionsList,multipleList} = this.state;
        const {filter_dict,list_def,select_key} = this.props;
        const {data_list} = this.state
        console.log(this.state);
        /* tslint:disable */ 
        /* tslint:enable */ 
        return (<div className="row">
                    <div className="col-md-6">
                        <Table title={select_key} data_dict={data_list} list_def={list_def}/>
                    </div>
                    <div className="col-md-6"> 
                        <form onSubmit={this.handleFormSubmit }>
                        
            
                            
                                { filter_dict.map((elm: childData, index) => (
                                <div key={index}>
                                    {this.createFilterElement(elm)}
                                    <br />
                                </div>
                                ))}
                                <input type="submit" value="Submit" />
            
                            

                        </form>
                    </div>

                    
                </div>);
    }
}
 
export default FormContainer;


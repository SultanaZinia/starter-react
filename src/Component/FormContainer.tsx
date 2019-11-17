import * as React from 'react';
const dataForge = require('data-forge');

// import Select from './select';
import MultiselectDropDown from './MultiSelect';
import CheckBox from './CheckBox';
import Select from './select';
import {DateRangePicker} from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';


import Table from './table';
// import { fileURLToPath } from 'url';
// import { type } from 'os';

export interface childData{
    [key: string]: string;
}

export interface nestedJson{
    [key:string]:string|childData|boolean|string[]|any;
}

/* tslint:disable */ 
export interface FormContainerProps {
    data_dict: childData[],
    filter_dict: nestedJson[],
    select_key : string,
    list_def: childData[],
    // column_def: [[]]
}
 
export interface FormContainerState {
    optionsList: string[]; 
    data_list: childData[];
    multipleList: string[];
    filterList: string[];
    textOptions:string[];
    numberOptions:string[];
  
}

/* tslint:enable */
class FormContainer extends React.Component<FormContainerProps,FormContainerState> {

    constructor(props){
        super(props);
        this.state = { optionsList: [],
            data_list: this.props.data_dict,
            multipleList:[],
            filterList:[],
            textOptions:['Contains','Not Contains','Equals','Not Equals','Starts'],
            numberOptions: ['=','!=','>','<','Between','Not Between']
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }
    

    public componentDidMount() {
        const {  filter_dict,data_dict} = this.props;
        for (let filter of filter_dict){
            if ("element_name" in filter){
                let element_id = filter["element_name"];
                const field_name = filter["field_name"];
                element_id = element_id+"_list";
                if (typeof(element_id)==='string' && typeof(field_name)==='string'){
                    this.setState({...this.state, [field_name]: null});
                    let filterList = this.state.filterList;
                    filterList.push(field_name);
                    this.setState({...this.state, filterList : filterList});   
            }
            }
        }
        
        this.setState({...this.state, data_list:data_dict});
    }


    // private getDataList(select_key:string){
    //     const {data_dict} = this.props;
    //     const multipleList: string[] = ["Select"];
    //     data_dict.forEach((item:childData, key) => {
    //         multipleList.push(item[select_key]);
    //         // multipleList.push({"name": item[select_key]});
    //         /* tslint:enable */  
    //     })
    //     // let uniquelist = [...new Set(multipleList)];
    //     // let unique = [...new Set(multipleList))]; 
    //     let unique = Array.from(new Set(multipleList).values());
    //     console.log(unique);
    //     return unique;
    // }

    private getDataDict(select_key:string,data_dict){
        const optionsList: childData[] = [];
        let unique:string[] = []

        data_dict.forEach((item:childData, key) => {
            unique.push(item[select_key]);
        })
        unique = Array.from(new Set(unique).values());
        unique.forEach((data:string,key) =>{
            optionsList.push({id:select_key,"value": data,"label":data});
        })
        return optionsList;
    }


    private createFilterElement = (element:childData) => {
        
        // const {optionsList,multipleList} = this.state;
        let filter_type,label_name,field_name,appearance,type;
        let searchable = false;
        // , properties, align, width, element_id
        if ("filter_type" in element){
            filter_type = element["filter_type"]
         }
         if ("field_name" in element){
            field_name = element["field_name"]
        }
        if ("appearance" in element){
            appearance = element["appearance"];
        }
        if (appearance && "type" in appearance){
           type = appearance["type"]
        } 

        if (appearance && "searchable" in appearance){
            searchable = appearance["searchable"];
        }

        // let optionsList = this.getdataList(field_name);
        //  if ("properties" in element){
        //    properties = element["properties"]
        // }
        // if ("align" in element){
        //    align = element["align"]
        // }
        // if ("element_name" in element){
        //      element_id = element["element_name"];
        
        // }

        // if ("width" in element){
        //    width = element["width"]
        // }
        if ("label_name" in element){
            label_name = element["label_name"]
        }
        let dependency = element["dependency"];
        console.log(dependency);

         //Create the parent and add the children
         
        if (filter_type=="single_select"){
            
            let optionsList = this.filter_child(field_name,dependency);
            
            if(type==="radio"){
                let optionList:any = [];
                for (let option of optionsList){
                    if (option){
                        if (option["value"] && typeof(option["value"])==='string'){
                            optionList.push(option["value"])
                        }
                    } 
                }
                return(<div> <CheckBox multiple={false} type={type} name={field_name} title={label_name} options ={optionList} value={this.state[field_name]}
                    /* tslint:disable */
                    handleChange = {e => this.handleCheck(e,field_name)} 
                    /* tslint:enable */   /></div>)
            }
            else{
            // let value = this.state[field_name];
            console.log(typeof(this.state[field_name]));
            // let value_dict = {"label":value,"value":value}
            /* tslint:disable */
            return (<div><MultiselectDropDown value={this.state[field_name]} title={label_name}
            name={label_name}
            options = {optionsList}
            isSearchable = {searchable} 
            /* tslint:disable */
            handleChange = {e => this.handleSelect(e,field_name,filter_type)}
            /* tslint:enable */ 
            isMulti = {false}
            placeholder = {'--Select--'}/></div>)
            }
            
        }
        else if (filter_type =="multi_select")
        {   
            let optionsList = this.filter_child(field_name,dependency);
            if (type==="checkbox"){
                let optionList:any = [];
                for (let option of optionsList){
                    if (option){
                        if (option["value"] && typeof(option["value"])==='string'){
                            optionList.push(option["value"])
                        }
                    } 
                }
                 return(<div> <CheckBox multiple={true} type={type} name={field_name} title={label_name} options ={optionList} value={this.state[field_name]}
                    /* tslint:disable */
                    handleChange = {e => this.handleCheck(e,field_name)} 
                    /* tslint:enable */   /></div>)
            }
            else {
                return (<div ><MultiselectDropDown value={this.state[field_name]} title={label_name}
                    name={label_name}
                    options = {optionsList} 
                    isSearchable = {searchable} 
                    /* tslint:disable */
                    handleChange = {e => this.handleSelect(e,field_name,filter_type)}
                    /* tslint:enable */ 
                    isMulti = {true}
                    placeholder = {'--Select--'}/></div>)
            }

            
        }
        else if (filter_type=="date"){

            if (type =='date-range'){
                return(<div><DateRangePicker  /* tslint:disable */
                    onEvent={(e,picker) => this.handleDate(e,picker,field_name,filter_type)}
                    showDropdowns
                    /* tslint:enable */ >
                       <button>
                       {label_name}
                       </button>
                       
                       </DateRangePicker >
                    </div>)
            }
            else if (type==='date-picker'){
                return(<div><DateRangePicker singleDatePicker={true} /* tslint:disable */
                    onEvent={(e,picker) => this.handleDate(e,picker,field_name,filter_type)}
                   
                    showDropdowns
                    /* tslint:enable */ >
                       <button>
                       {label_name}
                       </button>
                       
                       </DateRangePicker >
                    </div>)
            }
            
        }
        else if (filter_type=="text"){
            const {textOptions} = this.state;
            return(<div><Select options={textOptions} handleChange={this.handleInput} id = {field_name} name={label_name} title= {label_name} type={"text"} /* tslint:disable */>
                
                   </Select>
                </div>)
        }
        else if (filter_type=="numeric"|| filter_type=="number"){
            const {numberOptions} = this.state;
            return(<div><Select options={numberOptions}  handleChange={this.handleInput} id = {field_name} name={label_name} title= {label_name} type={"number"} /* tslint:disable */>
                
                   </Select>
                </div>)
        }
        
        
        return (<p>Nothing</p>)
    }

    private handleInput=(x,condition,field_name)=>{
        let data = {"condition":condition,"value":x};
        console.log("handling Filter");
        console.log(data);
        this.setState({...this.state,
          [field_name]:data}); 
    }

    private handleCheck(e,keyname) {
        console.log("here in chekbox");
        // let value = e.target.value;
        // let name = e.target.name;
        console.log(e)
        this.setState({...this.state, [keyname]:e}) 
    } 


    private handleSelect= (e,keyname,dependency) =>{

        if (dependency=='multi_select'){
            let value_list:string[] = [];
            for (let val of e){
                if (val && "value" in val){
                    value_list.push(val["value"]);
                }
            }
            if (value_list.length>0)
            this.setState({...this.state, [keyname]:value_list}) 
        }
        else{
            this.setState({...this.state, [keyname]:e["value"]}) ; 

        }
    }


    private handleDate= (e,picker,field_name,filter_type)=>{
        console.log("Date");
        console.log(e);
        
        // let date_range =picker.startDate.format("DD/MM/YYYY")+"-"+picker.endDate.format("DD/MM/YYYY");
        this.setState({...this.state,
            [field_name]: [picker.startDate,picker.endDate]
          });

    }


    private predicate =(row, filterList)=>{
        let flag=true;
        const {filter_dict} = this.props;
        for (let filter of filter_dict){
            let related_field = filter["field_name"];
            let val = this.state[related_field];
            if (val){
                let filterType = filter['filter_type'];
                let appearance = filter["appearance"];
                let type;
                if ("type" in appearance){
                      type = appearance["type"];  
                }
                if (filterType == 'single_select'){
                    if (val!=row[related_field]){
                        flag=false;
                    }
                }
                else if (filterType == 'multi_select'){
                    if(!val.includes(row[related_field])){
                        flag=false;
                    }
                }
                else if(filterType == 'date'){

                    if (type == 'date-range'){
                        console.log( new Date(row[related_field]));
                        let d1 = new Date(val[0].format("YYYY-MM-DD"));
                        let d2 = new Date(val[1].format("YYYY-MM-DD"));
                        let data_date = new Date(row[related_field]);
                        if ( d1>data_date|| data_date>d2||!row[related_field]) {
                            console.log(d1,d2,data_date);
                            flag=false;
                            }
                    }
                    else{
                        let d1 = new Date(val[0].format("YYYY-MM-DD"));
                        let data_date = new Date(row[related_field]);
                        if ( d1.getTime()!==data_date.getTime()||!row[related_field]) {
                            flag=false;
                            }
                    }
                    

                }
                else if (filterType=='text'){
                    console.log("Inside Text");
                    // console.log(related_field);
                    // console.log(val);
                    let condition = val["condition"];
                    console.log(condition);
                    // ['Contains','Not Contains','Equals','Not Equals','Starts'],
                    let value = val["value"][0];
                    if (value!==''||condition){
                        switch(condition) {
                            case "Contains":
                              if(!row[related_field].includes(value)){
                                  flag=false;
                              }
                              break;
                            case 'Not Contains':
                              if(!row[related_field].includes(value)){
                                    flag=false;
                              }
                              break;
                            case 'Equals':
                                console.log(typeof(row[related_field]),typeof(value));
                                if(row[related_field]!==value){
                                    console.log(typeof(row[related_field]),typeof(value));
                                    console.log(row[related_field],value);
                                        flag=false;
                                    }
                            break;
                            case 'Not Equals':
                                if(!(row[related_field]!==value)){
                                    flag=false;
                                }
                            break;
                            case 'Starts':
                                console.log(row[related_field].startsWith(value), row[related_field], value);
                                if(!(row[related_field].startsWith(value))){
                                    flag=false;
                                }
                            break;
                            case 'Endswith':
                                if(!(row[related_field].endsWith(value))){
                                    flag=false;
                                }
                            break;
                            
                              // code block
                          }
                    }
                    
                }

                else if (filterType=='number'){
                    console.log("Inside Number");
                    // console.log(related_field);
                    // console.log(val);
                    let condition = val["condition"];
                    console.log(condition);
                    // ['Contains','Not Contains','Equals','Not Equals','Starts'],
                    let value1 = Number(val["value"][0]);
                    let value2 = Number(val["value"][1]);
                    let columndata = Number(row[related_field]);
                   
                    if (condition.toLowerCase()){
                        switch(condition.toLowerCase()) {
                            case "=":
                              if(value1!==columndata){
                                  flag=false;
                              }
                              break;
                            case '!=':
                              if(!(value1!==columndata)){
                                    flag=false;
                              }
                              break;
                            case '>':
                               
                                if(columndata<value1){
                                    console.log(typeof(row[related_field]),typeof(value1));
                                    console.log(row[related_field],value1);
                                        flag=false;
                                    }
                            break;
                            case '<':
                                if(columndata>value1){
                                    flag=false;
                                }
                            break;
                            case 'between':
                                    console.log(columndata,value1, value2);
                                if(value1>columndata || columndata>value2){
                                    flag=false;
                                }
                            break;
                            case 'not between':
                                    console.log(condition.toLowerCase(),columndata,value1, value2);
                                if(!(value1>columndata || columndata>value2)){
                                    flag=false;
                                }
                            break;
                            
                              // code block
                          }
                    }
                    
                }
            } 
        } 
        return flag;
    }


    private filter_child =(keyname:string,parent)=>{
        const {data_dict} = this.props;
        // let child_list:string[] = [];
        const wholeData = new dataForge.DataFrame(data_dict);
        let optionsList;
        let filtered_data = wholeData.where(row => this.predicate_parent(row,parent)); 
        filtered_data = filtered_data.toArray();
                optionsList = this.getDataDict(keyname,filtered_data);

                console.log(keyname,optionsList);
        return optionsList;
    }


    private predicate_parent =(row,parent)=>{
        let flag=true;
        for (let key of parent){
            let val = this.state[key];
            if (val){
                // if (val["value"]!=row[val["id"]]){
                //     flag=false;
                // }
                if (typeof(val) ==='string'){
                    if (val!=row[key]){
                        flag=false;
                    }
                }
                else{
                    if(!val.includes(row[key])){
                        flag=false;
                    }
                }                                                                                                                                
            }
        } 
        return flag;
    }


    private  handleFormSubmit (e) {
            const {filterList} = this.state;
            const {data_dict} = this.props;
            console.log(data_dict);
            let filtered_data: childData[] = [];
            const wholeData = new dataForge.DataFrame(data_dict);
            filtered_data = wholeData.where(row => this.predicate(row,filterList)).toArray() ;       // Apply transformation to each row.
            
            this.setState({...this.state, data_list:filtered_data})
    }


    // private handleRadio(e,keyname) {
    //     console.log(e);
    //     let value = e.target.value;
    //     let name = e.target.name;
    //     this.setState({...this.state, [name]:value}) 
    // }    
    
    
          

    public render() { 
        // const {optionsList,multipleList} = this.state;
        const {filter_dict,list_def,select_key} = this.props;
        const {data_list} = this.state;
        
        return (<div className="row">
                    <div className="col-md-3"> 
                        <div><h4>Filter</h4></div>
                        <div>
                                { filter_dict.map((elm: childData, index) => (
                                <div key={index}>
                                    {this.createFilterElement(elm)}
                                    <br />
                                </div>
                                ))}
                                {/* <input type="submit" value="Submit" /> */}
                                </div>
                        <button  onClick={this.handleFormSubmit}>Submit</button>
                    </div>
                    <div className="col-md-9">
                        <Table title={select_key} data_dict={data_list} list_def={list_def}/>
                    </div>
                    
                </div>);
    }
}
 
export default FormContainer;


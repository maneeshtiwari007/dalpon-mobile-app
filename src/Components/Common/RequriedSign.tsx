import { Component } from "react";
import { Text } from "react-native";
import Colors from "../../utilty/Colors";

export default class RequiredSign extends Component<{}>{
    constructor(props:any){
        super(props);
    }
    render(){
        return(
            <Text style={{ color:Colors.errorColor }}>*</Text>
        );
    }
}
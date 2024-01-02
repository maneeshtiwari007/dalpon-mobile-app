import { Component } from "react";
import { Text,Button } from "react-native";
export default class RegisterScreen extends Component<{}>{
    constructor(props){
        super(props);
    }
    navigateToLogin(){
        this.props.navigation.navigate("Login");
    }
    render(){
        return(
            <>
            <Text>Register</Text>
            <Button title="Click To Login" onPress={()=>{this.navigateToLogin()}}></Button>
            </>
        );
    }
}
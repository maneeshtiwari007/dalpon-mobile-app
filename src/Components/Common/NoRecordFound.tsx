import { Component } from "react";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import { Image, Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import Colors from "../../utilty/Colors";

export default class NoRecordFound extends Component<ScreenInterfcae>{
    constructor(props:any){
        super(props);
    }
    render(){
        return(
            <View style={{ alignItems:'center',width:'auto',justifyContent:'center',height:'100%' }}>
                <View style={{ alignItems:'center',justifyContent:'center',minHeight:350,width:'100%' }}>
                    <Image source={require('../../../assets/no-records.png')} style={{width:150,height:150,marginBottom:15}}></Image>
                    <Text style={[ThemeStyling.heading1,{marginBottom:5,textTransform:'none'}]}>{this.props?.data?.head}</Text>
                    <Text style={[ThemeStyling.heading5,{fontSize:14,fontWeight:'400',color:Colors.dark_color,textTransform:'none'}]}>{this.props?.data?.msg}</Text>
                </View>
            </View>
        );
    }
}
import { Component } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../utilty/Colors";
import MainLayout from "../Layout/MainLayout";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import ScreenStateInterfcae from "../Interfaces/Common/ScreenStateInterface";
import { CommonHelper } from "../utilty/CommonHelper";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import UserCard from "../Components/Common/UserCard";

export default class Team extends Component<ScreenInterfcae,ScreenStateInterfcae>{
    constructor(props:any) {
        super(props);
        this.state={
            user:null,
            loader:false
        }
    }
    async componentDidMount() {
        this.props.navigation.addListener("focus",()=>{
            this.getApiData()
        })
        this.setState({user:await CommonHelper.getUserData()});
        this.setState({loader:true});
        this.getApiData()
    }
    async getApiData(){
        await CommonApiRequest.getTeamsList({}).then((response:any)=>{
            this.setState({loader:false});
            this.setState({dataObj:response?.results})
        }).catch(()=>{
            this.setState({loader:false});
        });
    }
    async refreshData(){
        this.getApiData()
    }
    render() {
        return (
            <MainLayout isTopLogo={true} loader={this.state?.loader} onRefresh={()=>{this.refreshData()}}>
                <View style={{ paddingBottom: 40 }}>
                    <View style={ThemeStyling.container}>
                        {/* Card Blue */}
                        <View style={ThemeStyling.card}>
                            <View style={ThemeStyling.cardBody}>
                                <View style={ThemeStyling.twoColumnLayout}>
                                    <View style={[ThemeStyling.col10, { marginRight: 15 }]}>
                                        <Text style={[ThemeStyling.heading3, ThemeStyling.textOrange, { fontWeight: '700', marginBottom: 0 }]}>{this.state?.user?.name}</Text>
                                        <Text style={[ThemeStyling.text2, ThemeStyling.textPrimary]}>{this.state?.user?.role_name}</Text>
                                    </View>
                                    <View style={ThemeStyling.col2}>
                                        
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* End Card Blue */}
                        {/* Team Member */}
                        {this.state?.dataObj && this.state?.dataObj?.map((item:any,index:number)=>{
                            return(
                                <UserCard key={index} data={item}/>
                            )
                        })}
                    </View >
                </View>
            </MainLayout>
        );
    }
}
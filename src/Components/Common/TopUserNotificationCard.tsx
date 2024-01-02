import { Component } from "react";
import { Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import TopUserNotificationInterface from "../../Interfaces/Common/TopUserNotificationInterface";
import { CommonHelper } from "../../utilty/CommonHelper";

export default class TopUserNotification extends Component<TopUserNotificationInterface, {}>{
    constructor(props: any) {
        super(props);
        this.state = {
            objUser: {}
        }
    }
    async componentDidMount() {
        this.setState({ objUser: await CommonHelper.getUserData() });
    }
    render() {
        return (
            <>
                {this.state?.objUser &&
                    <View style={[ThemeStyling.card, ThemeStyling.bgPrimary]}>
                        <View style={ThemeStyling.cardBody}>
                            <View style={ThemeStyling.twoColumnLayout}>
                                <View style={[ThemeStyling.col10, { marginRight: 15 }]}>
                                    <Text style={ThemeStyling.heading5}>{this.state?.objUser?.name}</Text>
                                    <Text style={ThemeStyling.text2}>{this.state?.objUser?.role_name}</Text>
                                </View>
                                <View style={ThemeStyling.col2}>
                                    <View style={ThemeStyling.notification}>
                                        <AntDesign style={{ textAlign: "center" }} name="bells" size={24} color="white" />
                                        <Text style={ThemeStyling.count}></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </>
        );
    }
}
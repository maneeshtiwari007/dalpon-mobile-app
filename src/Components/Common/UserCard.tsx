import { Component } from "react";
import { Image, Text, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import Colors from "../../utilty/Colors";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";

export default class UserCard extends Component<ScreenInterfcae>{
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <View style={ThemeStyling.card}>
                <View style={ThemeStyling.cardBody}>
                    <View style={ThemeStyling.twoColumnLayout}>
                        <View style={[ThemeStyling.col10, { marginRight: 15, width: '72%' }]}>
                            <View style={ThemeStyling.profileContainer}>
                                <View style={{ marginRight: 10 }}>
                                    <Image style={ThemeStyling.profileImage} source={{uri:this.props?.data?.photo}} />
                                </View>
                                <View>
                                    <Text style={[ThemeStyling.heading5, ThemeStyling.textOrange, { marginBottom: 0, fontWeight: '500', fontSize: Colors.FontSize.p }]}>{this.props?.data?.name}</Text>
                                    <Text style={[ThemeStyling.text2, ThemeStyling.textDark]}>{this.props?.data?.role_name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[ThemeStyling.col2, { width: '25%' }]}>
                            <View>
                                <Text style={[ThemeStyling.text4, { fontWeight: '500' }]}>Working Hr.</Text>
                                <Text style={ThemeStyling.hours}>{(this.props?.data?.total_hours)?this.props?.data?.total_hours_custom:'0'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
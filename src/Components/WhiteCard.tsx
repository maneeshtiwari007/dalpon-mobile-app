import { Component } from "react";
import CardInterface from "../Interfaces/Common/CardInterface";
import { ThemeStyling } from "../utilty/styling/Styles";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from "react-native";
import Colors from "../utilty/Colors";

export default class WhiteCard extends Component<CardInterface>{
    constructor(props: any) {
        super(props);
    }
    render() {
        const { item } = this.props;
        return (
            <View style={ThemeStyling.card}>
                <View style={[ThemeStyling.cardBody, { padding: 0, paddingLeft: 0, paddingRight: 0 }]}>
                    <View style={[ThemeStyling.twoColumnLayout, ThemeStyling.divider, { paddingTop: 15, paddingLeft: 10, paddingRight: 10, borderBottomColor: Colors.grayLight }]}>
                        <View style={[ThemeStyling.col10, { marginRight: 15 }]}>
                            <Text style={[ThemeStyling.heading5, ThemeStyling.textPrimary]}>#{item?.work_order_id}</Text>
                            <Text style={[ThemeStyling.text2, ThemeStyling.textDark]}>{item?.work_order_services} </Text>
                        </View>
                        <View style={ThemeStyling.col2}>
                            <View style={ThemeStyling.workSchedule}>
                                <Text style={[ThemeStyling.date, ThemeStyling.textDark]}>{item?.work_order_day}</Text>
                                <Text style={[ThemeStyling.monthYear, ThemeStyling.textDark]}>{item?.work_order_mon_year}</Text>
                                <Text style={ThemeStyling.duration}>{item?.work_order_time}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[ThemeStyling.col10, { marginRight: 15,padding:10,paddingTop:0 }]}>
                            <Text style={[ThemeStyling.text3, ThemeStyling.textDark]}>
                                <Ionicons style={[ThemeStyling.icon, ThemeStyling.textDark]} name="location-sharp" size={24} color="black" />&nbsp;{item?.property_location}</Text>
                            <Text style={[ThemeStyling.text3, ThemeStyling.textDark]}>
                                <Feather style={[ThemeStyling.icon, ThemeStyling.textDark]} name="clock" size={24} color="black" />&nbsp;{item?.status_text}</Text>
                        </View>
                </View>
            </View>
        );
    }
}
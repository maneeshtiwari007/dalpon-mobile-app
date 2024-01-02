import { Component } from "react";
import { Pressable, Text, View, ScrollView } from 'react-native';
import MainLayout from "../Layout/MainLayout";
import { ThemeStyling } from "../utilty/styling/Styles";
import { changeLanguage } from "../localization/i18n";

export default class Home extends Component<{}> {
    constructor(props) {
        super(props);

    }
    changeLanguage() {
        changeLanguage('en')
    }
    render() {

        return (
            <MainLayout>
                <View>
                    <Text>Welcome</Text>
                </View>
            </MainLayout>
        )
    }
}
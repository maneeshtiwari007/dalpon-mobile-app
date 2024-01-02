import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { func, string, any } from 'prop-types';
import { Pressable } from "react-native";
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";
import ButtonComponentInterface from "../../Interfaces/Common/ButtonComoponentInterface";

export default class ButtonComponent extends Component<ButtonComponentInterface> {

    constructor(props:any) {
        super(props);
    }
    _handleOnPress=()=>{
        const { onPressCall } = this.props;
        onPressCall();
    }
    _isDisabledClas(){
        return (this.props.isDisabled==='false')?Theming.button.disable:''
    }
    render() {
        return (
            <View>
                <Pressable style={[Theming.button,this.props.style,(this.props?.type)?Theming?.[this.props?.type]:'']} disabled={(this.props.isDisabled==='true')?true:false} onPress={this._handleOnPress}>
                    <Text style={[Theming.button.text,this.props?.textStyle]}>{this.props.title}</Text>
                </Pressable>
            </View>
        );
    }
}
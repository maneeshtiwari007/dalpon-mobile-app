import { Component, ReactNode } from "react";
import { View, Animated, StyleSheet, TextInput, Text, TouchableWithoutFeedbackBase, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import { string, func, object, number, any } from 'prop-types';
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome5 } from '@expo/vector-icons';
import Inputinterface from "../../Interfaces/Common/InputInterface";
import FormGroupInterface from "../../Interfaces/Common/FormGroupInterface";


export default class FormGroup extends Component<FormGroupInterface> {
    position: Animated.Value;

    constructor(props) {
        super(props);
        this.state = {
            isFieldActive: false
        }
    }

    render() {
        return (
            <View style={{width:'100%',minHeight:60, marginBottom: 15,}}>
                {this.props?.title &&
                    <Text>{this.props?.title}</Text>
                }
                {this.props?.children}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 0.5,
        height: 40,
        marginVertical: 4
    },
    textInput: {
        fontSize: 15,
        paddingStart:10,
        paddingEnd:10,
        backgroundColor:'#252525',
        borderRadius:10,
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: 'Avenir-Medium',
        left: 3,
        paddingStart:10,
        paddingEnd:10,
        zIndex:1,
    },
    passwordEyesStyles: {
        position: 'absolute',
        fontFamily: 'Avenir-Medium',
        right: 3,
        paddingStart:10,
        paddingEnd:10,
        zIndex:1,
        justifyContent:'center',
        height:'100%'
    },
})
import { Component, ReactNode } from "react";
import { View, Animated, StyleSheet, TextInput, Text, TouchableWithoutFeedbackBase, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import { string, func, object, number, any } from 'prop-types';
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome5 } from '@expo/vector-icons';
import Inputinterface from "../../Interfaces/Common/InputInterface";
import { ThemeStyling } from "../../utilty/styling/Styles";



export default class InputComponent extends Component<Inputinterface> {
    position: Animated.Value;

    constructor(props) {
        super(props);
        const { value } = this.props;
        this.position = new Animated.Value(value ? 1 : 0);
        this.state = {
            isFieldActive: false,
            showPassword: (this.props.secureTextEntry)
        }
    }

    _handleFocus = () => {
        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false
            }).start();
        }
    }

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.props.value) {
            this.setState({ isFieldActive: false });
            Animated.timing(this.position, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false
            }).start();
        }
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }
    _handleSecureEntry() {
        if (this.state.showPassword) {
            this.setState({ showPassword: false });
        } else {
            this.setState({ showPassword: true });
        }
    }

    render() {
        return (
            <View style={ThemeStyling.formgroup}>
                <TextInput style={ThemeStyling.formcontrol} secureTextEntry={(this.props.secureTextEntry) ? this.props.secureTextEntry : false} placeholder={this.props?.placeholder} value={this.props?.value} onFocus={this._handleFocus}
                            onBlur={this._handleBlur}
                            onChangeText={this._onChangeText}></TextInput>
                {this.props?.icon &&
                    <View  style={[ThemeStyling.inputIcon,{marginTop:3, borderRightWidth:1, paddingRight: 8,}]}>
                        {this.props?.icon}
                    </View>
                }
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
        height: 70,
        marginVertical: 4
    },
    textInput: {
        fontSize: 15,
        fontFamily: 'Avenir-Medium',
        height: '100%',
        paddingStart: 10,
        paddingEnd: 10,
        backgroundColor: '#252525',
        borderRadius: 10,
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: 'Avenir-Medium',
        left: 3,
        paddingStart: 10,
        paddingEnd: 10,
        zIndex: 1,
    },
    passwordEyesStyles: {
        position: 'absolute',
        fontFamily: 'Avenir-Medium',
        right: 3,
        paddingStart: 10,
        paddingEnd: 10,
        zIndex: 1,
        justifyContent: 'center',
        height: '100%'
    },
})
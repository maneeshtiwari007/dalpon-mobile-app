import { Component } from "react";
import { Text, Button, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import InputComponent from "../Components/Common/InputComponent";
import FormGroup from "../Components/Common/FormGroup";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import { CommonHelper } from "../utilty/CommonHelper";
import { ConstantsVar } from "../utilty/ConstantsVar";
export default class LoginScreen extends Component<{}>{
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isDisable: false,
            loader: false
        }
    }
    navigateToRegister() {
        this.props.navigation.navigate("Register");
    }
    loginUser() {
        this.setState({ isDisable: true });
        this.setState({ loader: true });
        CommonApiRequest.loginUser(this.state).then((response: any) => {
            this.setState({ loader: false });
            this.setState({ isDisable: false });
            if (response?.status == 200) {
                CommonHelper.saveStorageData(ConstantsVar.USER_STORAGE_KEY, JSON.stringify(response?.results));
                this.props.navigation.navigate("AppContainer");
            }
        }).catch(() => {
            this.setState({ loader: false });
            this.setState({ isDisable: false });
        })
    }
    upDateMasterState(attr: any, value: any) {
        this.setState({ [attr]: value });
    }
    render() {
        return (
            <>
                {this.state?.loader &&
                    <View style={ThemeStyling.loader}>
                        <ActivityIndicator size="large" color={Colors.primary_color} />
                    </View>
                }
                <ScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ paddingTop: 45, height: '100%', zIndex: 1, position: 'relative' }}>
                    <KeyboardAwareScrollView style={{ width: '100%', height: Dimensions.get('window').height-45 }}>
                        <View style={{ height: Dimensions.get('window').height-45 }}>
                            <ScrollView contentContainerStyle={[ThemeStyling.container, { flex: 1 }]}>
                                <View style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                                    <View style={[ThemeStyling.imagecontainer,{marginBottom:80}]}>
                                        <Image style={ThemeStyling.image} source={require('../../assets/staticimages/logo.png')} />
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.heading2}>Hi, Good Day!</Text>
                                    </View>
                                    <View>
                                        <Text style={ThemeStyling.text1}>Lorem ipsum dolor sit amet conse Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet conse Lorem ipsum
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={[ThemeStyling.heading3, { textAlign: "center" }]}>sign in to continue</Text>
                                    </View>
                                    <View>
                                        <FormGroup>
                                            <InputComponent attrName={'email'} value={this.state?.email} secureTextEntry={false} placeholder={"Username or email"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }} icon={<AntDesign name="user" size={24} color="black" />}></InputComponent>
                                        </FormGroup>
                                    </View>
                                    <View>
                                        <FormGroup>
                                            <InputComponent attrName={'password'} secureTextEntry={true} value={this.state?.password} placeholder={"Security key"} updateMasterState={(attr: any, value: any) => { this.upDateMasterState(attr, value) }} icon={<MaterialCommunityIcons name="star" size={24} color="black" />}></InputComponent>
                                        </FormGroup>
                                    </View>
                                    <View style={[ThemeStyling.btnContainer,{marginBottom:80}]}>
                                        <TouchableOpacity style={[ThemeStyling.btnPrimary]} onPress={() => { this.loginUser() }} disabled={this.state?.isDisable}>
                                            <Text style={ThemeStyling.btnText}>Log In</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={[ThemeStyling.footer]}>
                                <TouchableOpacity style={ThemeStyling.btnLink}>
                                    <Text style={ThemeStyling.btnText2}>Need Help ?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>

                </ScrollView>
            </>
        );
    }
}
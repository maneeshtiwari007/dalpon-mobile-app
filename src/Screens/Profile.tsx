import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, Alert, TextInput, DeviceEventEmitter, } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import MainLayout from "../Layout/MainLayout";
import TopUserNotification from "../Components/Common/TopUserNotificationCard";
import ButtonComponent from "../Components/Common/ButtonComponent";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import { CommonHelper } from "../utilty/CommonHelper";
import { ConstantsVar } from "../utilty/ConstantsVar";
import ProfileScreenInterface from "../Interfaces/States/ProfileScreenInterface";
import * as ImagePicker from 'expo-image-picker';
import { CommonApiRequest } from "../utilty/api/commonApiRequest";

export default class Profile extends Component<ScreenInterfcae, ProfileScreenInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            phone: '',
            photo: null,
            is_photo: 'upload',
            user: null,
            email: '',
            base64Data: null,
            loader: false
        }
    }
    async componentDidMount() {
        const user = await CommonHelper.getUserData();
        this.setState({ fname: (user?.fname) ? user?.fname : user?.name });
        this.setState({ lname: (user?.lname) ? user?.lname : user?.name });
        this.setState({ phone: (user?.phone) ? user?.phone : user?.phone_no });
        this.setState({ email: user?.email });
        this.setState({ user: user });
        
        CommonApiRequest.getAnyUserDetail(user?.id).then((response: any) => {
            if (response?.status == 200) {
                const user = response?.results;
                this.setState({ fname: (user?.fname) ? user?.fname : user?.name });
                this.setState({ lname: (user?.lname) ? user?.lname : user?.name });
                this.setState({ phone: (user?.phone) ? user?.phone : user?.phone_no });
                this.setState({ photo: (user?.photo !== "") ? user?.photo : null });
                this.setState({ email: user?.email });
                this.setState({ is_photo: '' });
            }
        });
    }
    onPressLogout() {
        Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        CommonHelper.removeData(ConstantsVar.USER_STORAGE_KEY);
                        this?.props?.navigation?.navigate("Auth");
                    },
                },
            ],
            { cancelable: false },
        );
    }
    async pickImage() {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (result?.assets) {
            this.setState({ photo: result?.assets[0].uri });
            this.setState({ base64Data: result?.assets[0].base64 });
            this.setState({ is_photo: 'upload' });
        }

    }
    async removePicture() {
        Alert.alert(
            'Remove Picture',
            'Are you sure? You want to remove picture?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        this.setState({ photo: null })
                        this.setState({ base64Data: null });
                        this.setState({ is_photo: 'remove' });
                    },
                },
            ],
            { cancelable: false },
        );
    }
    async updateUserProfile() {
        const userProfileData: any = {
            fname: this.state.fname,
            lname: this.state.lname,
            photo: "image/png;base64,"+this.state.base64Data,
            phone: this.state.phone,
            is_photo: this.state.is_photo
        }
        this.setState({ loader: true });
        CommonApiRequest.upDateUserProfile(userProfileData, this.state.user.id).then((response) => {
            this.setState({ loader: false });
            if (response?.status == 200) {
                this.updateUserStorage(response?.results);
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.success_color, msgData: { head: 'Success', subject: 'Profile updated successfully!!', top: 20 } })
            } else {
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.msg, top: 20 } })
            }
        }).catch(() => {
            this.setState({ loader: false });
        })
    }
    changeText(name: any, value: any) {
        this.setState({ [name]: value });
    }
    async updateUserStorage(data:any){
        let userData:any = await CommonHelper.getUserData();
        userData.lname=data?.lname;
        userData.fname=data?.fname;
        userData.phone=data?.phone;
        if(data.photo){
            userData.photo=data?.photo;
        }
        await CommonHelper.saveStorageData(ConstantsVar.USER_STORAGE_KEY,JSON.stringify(userData));
    }
    refreshData() {
        CommonApiRequest.getAnyUserDetail(this.state.user?.id).then((response: any) => {
            if (response?.status == 200) {
                const user = response?.results;
                this.setState({ fname: (user?.fname) ? user?.fname : user?.name });
                this.setState({ lname: (user?.lname) ? user?.lname : user?.name });
                this.setState({ phone: (user?.phone) ? user?.phone : user?.phone_no });
                this.setState({ photo: (user?.photo !== "") ? user?.photo : null });
                this.setState({ email: user?.email });
                this.setState({ is_photo: '' });
                this.updateUserStorage(response?.results);
            }
        });
    }
    render() {
        return (
            <MainLayout isTopLogo={false} loader={this.state.loader} onRefresh={() => { this.refreshData() }}>
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 10 }}>


                        </View>
                        <View style={[ThemeStyling.profileContainer, { justifyContent: "flex-start", marginBottom: 20 }]}>
                            <View style={{ marginRight: 10 }}>
                                <Image style={[ThemeStyling.profileImage, { width: 100, height: 100 }]} source={(this.state.photo) ? { uri: this.state.photo } : require('../../assets/staticimages/avatar.png')} />
                            </View>
                            <View>
                                <Text style={[ThemeStyling.heading4, { marginBottom: 0, paddingBottom: 0 }]}>Update your picture</Text>
                                <Text style={[ThemeStyling.text2, { marginBottom: 5, color: Colors.gray_color }]}>Upload a photo max 2 MB</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ marginRight: 10 }}>
                                        <TouchableOpacity style={ThemeStyling.btnInfo} onPress={() => { this.pickImage() }}>
                                            <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.h6 }]}><MaterialCommunityIcons style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h5 }]} name="upload" /> Upload</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={ThemeStyling.btnLink} onPress={() => { this.removePicture() }}>
                                            <Text style={[ThemeStyling.text4, { color: Colors.errorColor }]}>Remove picture</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>First Name</Text>
                            <TextInput onChangeText={(evnt) => { this.changeText('fname', evnt) }} style={[ThemeStyling.formcontrol, { paddingLeft: 25, paddingVertical: 15 }]} secureTextEntry={false} placeholder="Arian" value={this.state?.fname}></TextInput>

                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Last Name</Text>
                            <TextInput onChangeText={(evnt) => { this.changeText('lname', evnt) }} style={[ThemeStyling.formcontrol, { paddingLeft: 25, paddingVertical: 15 }]} secureTextEntry={false} placeholder="Zesan" value={this.state?.lname}></TextInput>

                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>Phone Number</Text>
                            <TextInput keyboardType="number-pad" maxLength={13} onChangeText={(evnt) => { this.changeText('phone', evnt) }} style={[ThemeStyling.formcontrol, { paddingLeft: 25, paddingVertical: 15 }]} secureTextEntry={false} placeholder="+91 8765 4321 98" value={this.state?.phone}></TextInput>

                        </View>
                        <View style={ThemeStyling.formgroup2}>
                            <Text style={[ThemeStyling.heading5, { color: Colors.dark_color }]}>E-mail</Text>
                            <TextInput editable={false} style={[ThemeStyling.formcontrol, { paddingLeft: 25, backgroundColor: Colors.gray400, paddingVertical: 15 }]} secureTextEntry={false} placeholder="arian.zesan@gmail.com" value={this.state?.email}></TextInput>

                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => { this.updateUserProfile() }} style={[ThemeStyling.btnPrimary, { paddingHorizontal: 20, justifyContent: 'center', backgroundColor: Colors.success_color }]}>
                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16 }]}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                        <View style={{ justifyContent: 'center' }}>
                            <ButtonComponent textStyle={{ color: Colors.white }} type={'buttonDanger'} style={{ height: 50, width: '50%', marginLeft: 'auto', marginRight: 'auto' }} title="Logout" onPressCall={() => { this.onPressLogout() }}></ButtonComponent>
                        </View>
                    </View>
                </View>
            </MainLayout>
        );
    }
}
import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, DeviceEventEmitter, Alert, StyleSheet, Dimensions } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome, AntDesign, Ionicons, Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { TextInput } from "react-native-gesture-handler";
import MainLayout from "../Layout/MainLayout";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import ScreenStateInterfcae from "../Interfaces/Common/ScreenStateInterface";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import * as Location from 'expo-location';
import { ConstantsVar } from "../utilty/ConstantsVar";
import GreenCard from "../Components/GreenCard";
import OrangeCard from "../Components/OrangeCard";
import WhiteCard from "../Components/WhiteCard";
import { CommonHelper } from "../utilty/CommonHelper";
import { MultiSelect } from 'react-native-element-dropdown';
import CommonCamera from "../Components/Common/CommmonCamera";
import RequiredSign from "../Components/Common/RequriedSign";
import ImageGallery from "../Components/Common/ImageGallery";
import { orange100, red100, yellowA100 } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class MaterialDetails extends Component<ScreenInterfcae, ScreenStateInterfcae>{
    constructor(props: any) {
        super(props);
        this.state = {
            params: {},
            dataObj: null,
            isStarted: false,
            loader: false,
            currentDate: new Date(),
            rawMiliSeconds: 0,
            selected: [],
            cameraOn: false,
            isLogo: true,
            options: [],
            isFocus: false,
            capturedImage: null,
            notes: ''
        }
    }
    async componentDidMount() {
        this.setState({ cameraOn: false });
        this.setState({ user: await CommonHelper.getUserData() });
        clearInterval(this.state?.intervalId);
        let { status } = await Location.requestForegroundPermissionsAsync();
        this.setState({ params: this.props.route.params?.data });
        await this.getAPiData();
        await this.getTeams();

    }
    async getAPiData() {
        CommonApiRequest.getWorkOrderDetail(this.props.route.params?.data?.id).then(async (response: any) => {
            if (response?.status == 200) {
                this.setState({ dataObj: response?.results });
                this.setState({ isStarted: response?.results?.is_started });
                const diffTime = await CommonHelper.diffrenceBetween2date(new Date(response?.results?.work_order_start_date), new Date(this.state?.currentDate));
                this.setState({ rawMiliSeconds: diffTime });
                if (this.state.isStarted) {
                    this.setState({
                        intervalId: setInterval(() => {
                            this.setState({ rawMiliSeconds: this.state.rawMiliSeconds + 1000 });
                        }, 1000)
                    })
                }
            }
        })
    }
    async getTeams() {
        CommonApiRequest.getTeams({}).then(async (response: any) => {
            this.setState({ options: response?.results });
        });
    }
    async startTimer() {
        if (this.state.capturedImage && this.state.selected?.length > 0) {

            this.setState({ loader: true });
            let location = await Location.getCurrentPositionAsync({});
            const dataSend = {
                work_order_id: this.state?.dataObj?.id,
                work_order_start_date: new Date().toString(),
                location: location,
                photo: "image/png;base64," + this.state.capturedImage?.base64,
                teams: this.state.selected
            }
            CommonApiRequest.startWorkoutTimer(dataSend).then((response) => {
                this.setState({ loader: false });
                if (response?.status == 200) {
                    DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.theme_success_color, msgData: { head: 'Success', subject: 'Your hours log-in start successfully!', top: 20 } })
                    this.setState({ dataObj: response?.results });
                    this.setState({ isStarted: true, capturedImage: null });

                } else {
                    if (response?.msg) {
                        DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: response?.msg, top: 20 } })
                    }
                }
            }).catch(() => {
                this.setState({ loader: false });
            });
        } else {
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Please select teams and click picture before start timer", top: 20 } })
        }

    }
    async stopTimer() {
        if (this.state.capturedImage) {
            Alert.alert(
                'Stop Work',
                'Are you sure? You want to stop the work?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {
                            return null;
                        },
                    },
                    {
                        text: 'Confirm',
                        onPress: async () => {
                            await this.stopWork();
                        },
                    },
                ],
                { cancelable: false },
            );
        } else {
            DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.errorColor, msgData: { head: 'Error', subject: "Please select  click picture before end timer", top: 20 } })
        }
    }
    refreshAPiData() {
        clearInterval(this.state?.intervalId);
        this.getAPiData();
    }
    async stopWork() {
        this.setState({ loader: true });
        let location = await Location.getCurrentPositionAsync({});
        const dataSend = {
            work_order_id: this.state?.dataObj?.id,
            work_order_end_date: new Date().toString(),
            location: location,
            photo: "image/png;base64," + this.state.capturedImage?.base64,
            note: this.state.notes
        }
        CommonApiRequest.endWorkoutTimer(dataSend).then((response) => {
            if (response?.status == 200) {
                clearInterval(this.state?.intervalId);
                DeviceEventEmitter.emit(ConstantsVar.API_ERROR, { color: Colors.theme_success_color, msgData: { head: 'Success', subject: 'Your hours logged successfully!', top: 20 } })
                this.setState({ loader: false });
                this.setState({ dataObj: response?.results });
                this.setState({ isStarted: false });
            }
        }).catch((error: any) => {
            this.setState({ loader: false });
        });
    }
    setSelected(data: any) {
        this.setState({ selected: data });
    }
    openCamera() {
        this.setState({ cameraOn: true, isLogo: false });
    }
    onCaptureImageFromCamera(data: any) {
        this.setState({ capturedImage: { uri: data?.uri, base64: data?.base64 } });
    }
    render() {
        return (
            <View style={{ flex: 1, padding: 15 }}>
                <View style={{marginTop:25}}>
                    <Text style={[ThemeStyling.heading3, { marginBottom: 0 }]}>Add Material <RequiredSign /></Text>
                    <View style={{ marginBottom: 25 }}>
                        <MultiSelect
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            search
                            data={this.state.options}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Material"
                            searchPlaceholder="Search..."
                            value={this.state.selected}
                            onChange={item => {
                                this.setSelected(item);
                            }}
                            selectedStyle={styles.selectedStyle}
                            renderItem={(data: any) => {
                                return (
                                    <View>
                                        <View style={{ marginBottom: 8, paddingLeft: 6 }}>
                                            <Text>Rubbing Alcohol</Text>
                                        </View>
                                        <View style={{ marginBottom: 8, paddingLeft: 6 }}>
                                            <Text>snowblower</Text>
                                        </View>
                                        <View style={{ marginBottom: 8, paddingLeft: 6 }}>
                                            <Text>snow shovel</Text>
                                        </View>
                                        <View style={{ marginBottom: 8, paddingLeft: 6 }}>
                                            <Text>spray bottle with 70% isopropyl alcohol</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
                <View style={[ThemeStyling.twoColumnLayout, { marginBottom: 25, justifyContent: "space-between" }]}>
                    <View>
                        <Text>Rubbing Alcohol</Text>
                    </View>
                    <View style={{ width: '45%' }}>
                        <View style={ThemeStyling.twoColumnLayout}>
                            <View style={[ThemeStyling.col10, { flex: 1 }]}>
                                <TextInput style={[ThemeStyling.formcontrol, { padding: 0, fontSize: 14, minHeight: 30, paddingLeft: 10, paddingRight: 10, textAlign: "center", borderColor: Colors.secondry_color }]} secureTextEntry={false} placeholder="e.g.10"></TextInput>
                            </View>
                            <View style={ThemeStyling.col2}>
                                <Text>/kg</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.twoColumnLayout, { marginBottom: 25, justifyContent: "space-between" }]}>
                    <View>
                        <Text>Mulch</Text>
                    </View>
                    <View style={{ width: '45%' }}>
                        <View style={ThemeStyling.twoColumnLayout}>
                            <View style={ThemeStyling.col10}>
                                <TextInput style={[ThemeStyling.formcontrol, { padding: 0, fontSize: 14, minHeight: 30, paddingLeft: 10, paddingRight: 10, textAlign: "center", borderColor: Colors.secondry_color }]} secureTextEntry={false} placeholder="e.g.345"></TextInput>
                            </View>
                            <View style={ThemeStyling.col2}>
                                <Text>/sq</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.twoColumnLayout, { marginBottom: 25, justifyContent: "space-between" }]}>
                    <View>
                        <Text>Snow Shovel</Text>
                    </View>
                    <View style={{ width: '45%' }}>
                        <View style={ThemeStyling.twoColumnLayout}>
                            <View style={ThemeStyling.col10}>
                                <TextInput style={[ThemeStyling.formcontrol, { padding: 0, fontSize: 14, minHeight: 30, paddingLeft: 10, paddingRight: 10, textAlign: "center", borderColor: Colors.secondry_color }]} secureTextEntry={false} placeholder="e.g.5673"></TextInput>
                            </View>
                            <View style={ThemeStyling.col2}>
                                <Text>/gm</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[ThemeStyling.twoColumnLayout, { marginBottom: 25, justifyContent: "space-between" }]}>
                    <View>
                        <Text>Soil</Text>
                    </View>
                    <View style={{ width: '45%' }}>
                        <View style={ThemeStyling.twoColumnLayout}>
                            <View style={ThemeStyling.col10}>
                                <TextInput style={[ThemeStyling.formcontrol, { padding: 0, fontSize: 14, minHeight: 30, paddingLeft: 10, paddingRight: 10, textAlign: "center", borderColor: Colors.secondry_color }]} secureTextEntry={false} placeholder="e.g.89769"></TextInput>
                            </View>
                            <View style={ThemeStyling.col2}>
                                <Text>/mg</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: "auto" }}>
                    <TouchableOpacity style={[ThemeStyling.btnPrimary, { paddingHorizontal: 20, height: 45, justifyContent: 'center', backgroundColor: Colors.success_color, }]}>
                        <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f16 }]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: { padding: 0 },
    dropdown: {
        height: 30,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14, padding: 0,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
    marginBotton: {
        marginBottom: 20
    }
});
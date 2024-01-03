import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, DeviceEventEmitter, Alert, StyleSheet, Pressable } from "react-native";
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

export default class WorkorderDetails extends Component<ScreenInterfcae, ScreenStateInterfcae>{
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

    navigateToMaterial() {
        this.props.navigation.navigate("MaterialDetails");
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
            <MainLayout isTopLogo={this.state.isLogo} loader={this.state.loader} onRefresh={() => { this.refreshAPiData() }}>
                {this.state?.dataObj && !this.state.cameraOn &&
                    <View>
                        <View style={[ThemeStyling.container, { minHeight: 'auto' }]}>
                            <View>
                                <Text style={ThemeStyling.heading3}>Task Details</Text>
                            </View>
                            {/* Card Orange */}
                            {this.state?.dataObj && this.state?.dataObj?.status === 4 &&
                                <GreenCard item={this.state?.dataObj}></GreenCard>
                            }
                            {this.state?.dataObj && this.state?.dataObj?.status === 3 &&
                                <OrangeCard item={this.state?.dataObj}></OrangeCard>
                            }
                            {this.state?.dataObj && this.state?.dataObj?.status === 2 &&
                                <WhiteCard item={this.state?.dataObj}></WhiteCard>
                            }
                            {this.state?.dataObj && this.state?.dataObj?.status_text == 'Completed' &&
                                <>
                                    <View style={[ThemeStyling.gallery, { marginBottom: 20 }]}>
                                        {this.state.dataObj?.work_order_assets &&
                                            <>
                                                <Text style={ThemeStyling.heading3}>Uploaded Assets</Text>
                                                <ImageGallery objdata={this.state.dataObj?.work_order_assets} />
                                            </>
                                        }
                                    </View>
                                    <View style={styles.marginBotton}>
                                        <Text style={ThemeStyling.heading3}>Teams</Text>
                                        {this.state?.dataObj?.team_work_order_info &&
                                            <View style={[styles.container, { flexDirection: 'row' }]}>
                                                {this.state?.dataObj?.team_work_order_info?.map((item: any, index: number) => {
                                                    return (
                                                        <View key={index} style={{ padding: 10, borderWidth: 1, marginLeft: 5, borderRadius: 5 }}>
                                                            <Text>{item?.team_name}</Text>
                                                        </View>
                                                    )
                                                })
                                                }
                                                <View style={{ padding: 10, borderWidth: 1, marginLeft: 5, borderRadius: 5 }}>
                                                    <Text>{this.state.user?.name}</Text>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.marginBotton}>
                                        <Text style={ThemeStyling.heading3}>Note</Text>
                                        {this.state?.dataObj?.team_work_order_info &&
                                            <View style={[styles.container, { flexDirection: 'row' }]}>

                                                <View style={{ padding: 10, marginLeft: 5 }}>
                                                    <Text>{this.state?.dataObj?.note}</Text>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </>
                            }
                            {/* End Card Orange */}
                            {this.state?.dataObj && this.state?.dataObj?.status_text !== 'Completed' &&
                                <View>
                                    {!this.state.isStarted &&
                                        <View style={styles.marginBotton}>
                                            <Text style={ThemeStyling.heading3}>Teams <RequiredSign /></Text>
                                            {this.state?.options &&
                                                <View style={styles.container}>
                                                    <MultiSelect
                                                        style={styles.dropdown}
                                                        placeholderStyle={styles.placeholderStyle}
                                                        selectedTextStyle={styles.selectedTextStyle}
                                                        inputSearchStyle={styles.inputSearchStyle}
                                                        iconStyle={styles.iconStyle}
                                                        search
                                                        data={this.state.options}
                                                        labelField="label"
                                                        valueField="value"
                                                        placeholder="Select Team Member"
                                                        searchPlaceholder="Search..."
                                                        value={this.state.selected}
                                                        onChange={item => {
                                                            this.setSelected(item);
                                                        }}
                                                        renderLeftIcon={() => (
                                                            <AntDesign
                                                                style={styles.icon}
                                                                color="black"
                                                                name="Safety"
                                                                size={20}
                                                            />
                                                        )}
                                                        selectedStyle={styles.selectedStyle}
                                                        renderItem={(data: any) => {
                                                            return (
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingLeft: 6 }}>
                                                                    <Image source={data?.image} style={{ width: 25, height: 25, marginRight: 8, borderRadius: 6 }}></Image>
                                                                    <Text>{data?.label}</Text>
                                                                </View>
                                                            )
                                                        }}
                                                    />
                                                </View>
                                            }
                                        </View>
                                    }
                                    {this.state.isStarted &&
                                        <View style={styles.marginBotton}>
                                            <Text style={ThemeStyling.heading3}>Teams</Text>
                                            {this.state?.dataObj?.team_work_order_info &&
                                                <View style={[styles.container, { flexDirection: 'row' }]}>
                                                    {this.state?.dataObj?.team_work_order_info?.map((item: any, index: number) => {
                                                        return (
                                                            <View style={{ padding: 10, borderWidth: 1, marginLeft: 5, borderRadius: 5 }} key={index}>
                                                                <Text>{item?.team_name}</Text>
                                                            </View>
                                                        )
                                                    })
                                                    }
                                                    <View style={{ padding: 10, borderWidth: 1, marginLeft: 5, borderRadius: 5 }}>
                                                        <Text>{this.state.user?.name}</Text>
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    }
                                    {this.state.isStarted &&
                                        <View style={{ marginBottom: 20 }}>
                                            <View>
                                                <Text style={ThemeStyling.heading3}>Note</Text>
                                            </View>
                                            <TextInput
                                                style={[ThemeStyling.formcontrol, { minHeight: 80, paddingLeft: 10, paddingTop: 5, paddingRight: 10, borderRadius: 0 }]}
                                                multiline={true}
                                                numberOfLines={4}
                                                onChangeText={(text: any) => { this.setState({ notes: text }) }}
                                                value={this.state.notes} />
                                        </View>
                                    }
                                    <View style={{ marginBottom: 20 }}>
                                        <View>
                                            <Text style={ThemeStyling.heading3}>Upload Photo <RequiredSign /></Text>
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                            <TouchableOpacity style={ThemeStyling.btnInfo} onPress={() => { this.openCamera() }}>
                                                <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.h6 }]}><MaterialCommunityIcons style={[ThemeStyling.icon2, { fontSize: Colors.FontSize.h5 }]} name="upload" /> Capture Image</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={ThemeStyling.gallery}>
                                            {this.state.dataObj?.photo &&
                                                <View style={ThemeStyling.galleryItem}>
                                                    <Image style={[ThemeStyling.profileImage, { borderRadius: 10 }]} source={{ uri: this.state.dataObj?.photo }} />
                                                </View>
                                            }
                                            {this.state.capturedImage?.uri &&
                                                <View style={ThemeStyling.galleryItem}>
                                                    <Image style={[ThemeStyling.profileImage, { borderRadius: 10 }]} source={{ uri: this.state.capturedImage?.uri }} />
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            }
                            <View>
                                <Text style={ThemeStyling.heading3}>Services</Text>
                            </View>
                            <View style={[ThemeStyling.threeColumnLayout, { marginBottom: 20, flexWrap: 'wrap', justifyContent: 'flex-start' }]}>
                                {this.state?.dataObj?.service_work_order_info && this.state?.dataObj?.service_work_order_info?.map((item: any, index: number) => {
                                    return (
                                        <View style={{ minWidth: `${((Math.round(100 / 3) - 5))}%`, marginBottom: 5, marginRight: 5 }} key={index} >
                                            <TouchableOpacity style={ThemeStyling.tabMenu}>
                                                <Text style={[ThemeStyling.text2, { textAlign: "center" }]}>{item?.service_work_order_info?.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}

                            </View>
                            {this.state?.dataObj?.total_hours_custom &&
                                <>
                                    <View>
                                        <Text style={[ThemeStyling.heading5, { textAlign: "center", color: Colors.darkBlue, fontWeight: "bold" }]}>Hours Taken</Text>
                                    </View>

                                    <View style={{ marginBottom: 20 }}>
                                        {!this.state.isStarted &&
                                            <Text style={[ThemeStyling.heading1, { textAlign: "center", }]}>{this.state?.dataObj?.total_hours_custom}</Text>
                                        }
                                        {this.state.isStarted &&
                                            <Text style={[ThemeStyling.heading1, { textAlign: "center", }]}>{CommonHelper.convertTimeToHours(this.state.rawMiliSeconds)}</Text>
                                        }
                                    </View>
                                </>
                            }
                            {this.state?.dataObj && this.state?.dataObj?.status_text !== 'Completed' && !this.state.isStarted &&
                                <View style={[ThemeStyling.btnContainer]}>
                                    <TouchableOpacity style={ThemeStyling.btnCircle} onPress={() => { this.startTimer() }}>
                                        <Ionicons style={ThemeStyling.icon3} name="timer-outline" size={70} color="white" />
                                    </TouchableOpacity>
                                </View>
                            }
                            {this.state?.dataObj && this.state?.dataObj?.status_text !== 'Completed' && this.state.isStarted &&
                                <View style={[ThemeStyling.btnContainer]}>
                                    <TouchableOpacity style={ThemeStyling.btnCircle} onPress={() => { this.stopTimer() }}>
                                        <Feather style={ThemeStyling.icon3} name="power" size={70} color="white" />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                }

                <View style={[ThemeStyling.btnContainer, { marginBottom: 40 }]}>
                    <TouchableOpacity style={[ThemeStyling.btnPrimary]} onPress={() => { this.navigateToMaterial() }}>
                        <Text style={ThemeStyling.btnText2}>Material Details</Text>
                    </TouchableOpacity>
                </View>

                {this.state.cameraOn &&
                    <CommonCamera onCloseCamera={() => { this.setState({ cameraOn: false }) }} onCaptureImage={(data: any) => { this.setState({ capturedImage: data }); this.setState({ cameraOn: false }) }}></CommonCamera>
                }
            </MainLayout>
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
        fontSize: 14,
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
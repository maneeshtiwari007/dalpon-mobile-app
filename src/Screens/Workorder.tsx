import { Component, ReactNode } from "react"
import { Text, Button, View, Image, ScrollView, TouchableOpacity, Pressable, } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from "../utilty/Colors";
import { TextInput } from "react-native-gesture-handler";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import WorkorderStateInterface from "../Interfaces/States/WorkorderStateInterface";
import OrangeCard from "../Components/OrangeCard";
import WhiteCard from "../Components/WhiteCard";
import TopUserNotification from "../Components/Common/TopUserNotificationCard";
import GreenCard from "../Components/GreenCard";
import MainLayout from "../Layout/MainLayout";
import NoRecordFound from "../Components/Common/NoRecordFound";

export default class Workorder extends Component<{}, WorkorderStateInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            objWorkorder: {},
            loader: false,
            serachText: '',
        }
    }
    async componentDidMount() {
        this.props?.navigation.addListener("focus", async () => {
            await this.getApiData();
        });
        this.setState({ loader: true });
        await this.getApiData()
    }
    async getApiData(params: any = "") {
        await CommonApiRequest.getUserWorkOrder(params).then((response: any) => {
            this.setState({ objWorkorder: response?.results?.data });//response?.results?.data
            this.setState({ loader: false });
        }).catch(() => {
            this.setState({ loader: false });
        });
    }
    async refreshPage() {
        await this.getApiData();
    }
    async serachingData() {
        const serahcText = "?q=" + this.state?.serachText;
        this.setState({ loader: true });
        await this.getApiData(serahcText);
    }
    retirectToDetail(data: any) {
        this.props.navigation?.navigate("WorkOrderDetail", { data: data });
    }
    render() {
        return (
            <MainLayout isTopLogo={false} onRefresh={() => { this.refreshPage() }} loader={this.state?.loader}>
                <View>
                    <View style={[ThemeStyling.container, { minHeight: 'auto', marginTop: 20 }]}>
                        {/* Filter Area */}
                        <View style={[ThemeStyling.twoColumnLayout, { marginBottom: 30 }]}>
                            <View style={{ width: '75%' }}>
                                <View style={ThemeStyling.twoColumnLayout}>
                                    <View style={ThemeStyling.col10}>
                                        <TextInput style={ThemeStyling.searchBar} value={this.state?.serachText} placeholder="Search here..." onChangeText={(value) => { this.setState({ serachText: value }) }} />
                                    </View>
                                    <View style={ThemeStyling.col2}>
                                        <Pressable onPress={() => { this.serachingData() }}>
                                            <MaterialIcons name="search" size={24} color="black" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '25%' }}>
                                <View style={[ThemeStyling.bgGray, ThemeStyling.twoColumnLayout, { justifyContent: "space-between", paddingVertical: 5, paddingHorizontal: 8, borderRadius: 5 }]}>
                                    <Text>Filter</Text>
                                    <AntDesign name="filter" size={24} color="black" />
                                </View>
                            </View>
                        </View>
                        {/* Filter Area End */}
                        <View>
                            <Text style={ThemeStyling.heading3}>Work Orders</Text>
                        </View>
                        {/* Card Orange */}
                        {this.state?.objWorkorder?.length > 0 && this.state?.objWorkorder?.map((item: any, index: number) => {
                            if (item?.status === 4) {
                                return (
                                    <Pressable onPress={() => { this.retirectToDetail(item) }} key={index}>
                                        <GreenCard item={item}></GreenCard>
                                    </Pressable>
                                );
                            } else if (item?.status === 3) {
                                return (
                                    <Pressable onPress={() => { this.retirectToDetail(item) }} key={index}>
                                        <OrangeCard item={item}></OrangeCard>
                                    </Pressable>
                                );
                            } else {
                                return (
                                    <Pressable onPress={() => { this.retirectToDetail(item) }} key={index}>
                                        <WhiteCard item={item}></WhiteCard>
                                    </Pressable>
                                );
                            }
                        })
                        }

                    </View>
                </View>
                {!this.state?.objWorkorder &&
                    <NoRecordFound data={{ head: 'No data found!', msg: 'No workorder assigned you yet!' }}></NoRecordFound>
                }
            </MainLayout>
        );
    }
}
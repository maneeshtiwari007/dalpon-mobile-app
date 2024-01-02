import { Component } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { ThemeStyling } from "../utilty/styling/Styles";
import { MaterialCommunityIcons, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../utilty/Colors";
import MainLayout from "../Layout/MainLayout";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import DashboardInterface from "../Interfaces/States/DashboardInterface";
import { CommonHelper } from "../utilty/CommonHelper";
import TopUserNotification from "../Components/Common/TopUserNotificationCard";
import { ConstantsVar } from "../utilty/ConstantsVar";
import OrangeCard from "../Components/OrangeCard";
import WhiteCard from "../Components/WhiteCard";
import GreenCard from "../Components/GreenCard";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";

export default class Dashboard extends Component<ScreenInterfcae, DashboardInterface>{
    constructor(props: any) {
        super(props);
        this.state = {
            ...this.state,
            loader: false
        }
    }
    async componentDidMount() {
        this.props?.navigation.addListener("focus", async () => {
            await this.getApiData();
        });
        this.setState({ loader: true });
        await this.getApiData();
    }
    async getApiData() {
        await CommonApiRequest.getDashboardData({}).then((response: any) => {
            this.setState({ dataObj: response?.results });
            this.setState({ loader: false });
        }).catch(() => {
            this.setState({ loader: false })
        });
    }
    async refreshPage() {
        await this.getApiData();
    }
    retirectToDetail(data: any) {
        this.props.navigation?.navigate("WorkOrderDetail", { data: data });
    }
    render() {
        return (
            <MainLayout isTopLogo={true} onRefresh={() => { this.refreshPage() }} loader={this.state?.loader}>
                <View style={{ paddingBottom: 40 }}>
                    <View style={ThemeStyling.container}>
                        <TopUserNotification />
                        {/* Work Summary */}
                        <View>
                            <Text style={ThemeStyling.heading3}>Work Summary</Text>
                        </View>
                        {this.state?.dataObj &&
                            <View style={ThemeStyling.workSummary}>
                                <View style={[ThemeStyling.counter, { width: '30%', marginRight: 10 }]}>
                                    <LinearGradient
                                        // Background Linear Gradient
                                        colors={['#a9d775', '#c2e67d']}
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 0 }} style={{ width: '100%', height: '100%', borderRadius: 6, justifyContent: 'center' }}>
                                        <View style={{ height: 55, marginBottom: 10 }}>
                                            <Text style={[ThemeStyling.totalCount]}>{this.state?.dataObj?.total}</Text>
                                            <Text style={ThemeStyling.counterTxt}>Total</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                                <View style={[ThemeStyling.counter, { width: '28%', marginLeft: 10, marginRight: 10, }]}>
                                    <LinearGradient
                                        // Background Linear Gradient
                                        colors={['#4ccdba', '#61e0cd']}
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 0 }} style={{ width: '100%', height: '100%', borderRadius: 6, justifyContent: 'center' }}>
                                        <View style={{ height: 55, marginBottom: 10 }}>
                                            <Text style={ThemeStyling.totalCount}>{this.state?.dataObj?.completed}</Text>
                                            <Text style={ThemeStyling.counterTxt}>Completed</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                                <View style={[ThemeStyling.counter, { width: '30%', marginLeft: 10 }]}>
                                    <LinearGradient
                                        // Background Linear Gradient
                                        colors={['#f1606a', '#fa6e77']}
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 0 }} style={{ width: '100%', height: '100%', borderRadius: 6, justifyContent: 'center' }}>
                                        <View style={{ height: 55, marginBottom: 10 }}>
                                            <Text style={ThemeStyling.totalCount}>{this.state?.dataObj?.pending}</Text>
                                            <Text style={ThemeStyling.counterTxt}>Pending</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </View>
                        }
                        {this.state?.dataObj?.inprocess_workorder_list?.id &&
                            <>
                                <View style={{ marginTop: 25 }}>
                                    <Text style={ThemeStyling.heading3}>In Proccess Work Order</Text>
                                </View>

                                <Pressable onPress={() => { this.retirectToDetail(this.state?.dataObj?.inprocess_workorder_list) }}>
                                    <OrangeCard item={this.state?.dataObj?.inprocess_workorder_list}></OrangeCard>
                                </Pressable>
                            </>
                        }
                        {/* Work Summary */}
                        <View style={{ marginTop: 25 }}>
                            <Text style={ThemeStyling.heading3}>Latest Work Orders</Text>
                        </View>
                        {this.state?.dataObj?.upcomming_workorder_list?.length > 0 && this.state?.dataObj?.upcomming_workorder_list?.map((item: any, index: number) => {
                            if (item?.status === 4) {
                                return (
                                    <Pressable onPress={() => { this.retirectToDetail(item) }} key={index}>
                                        <GreenCard item={item} key={index}></GreenCard>
                                    </Pressable>
                                );
                            } else if (item?.status === 3) {
                                return (
                                    <Pressable onPress={() => { this.retirectToDetail(item) }} key={index}>
                                        <OrangeCard item={item} key={index}></OrangeCard>
                                    </Pressable>
                                );
                            } else {
                                return (
                                    <Pressable onPress={() => { this.retirectToDetail(item) }} key={index}>
                                        <WhiteCard item={item} key={index}></WhiteCard>
                                    </Pressable>
                                );
                            }
                        })
                        }
                    </View >
                </View>
            </MainLayout>
        );
    }
}
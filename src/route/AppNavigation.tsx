import React, { Component, useContext, useEffect, useState } from "react";
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5
} from "@expo/vector-icons";
import { NativeEventEmitter, StyleSheet, NativeModules, Image } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import {transparent} from "react-native-papger/lib/typescript/src/styles/themes/v2/colors";
import Home from "../Screens/Home";
import Colors from "../utilty/Colors";
import Workorder from "../Screens/Workorder";
import Dashboard from "../Screens/Dashboard";
import Team from "../Screens/Team";
import Profile from "../Screens/Profile";
import WorkorderDetails from "../Screens/WorkorderDetails";
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class AppContainer extends Component<{}> {
  //global.isLoggedin=true;
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    }

  }

  componentDidMount() {
    //this.RegisterStackNavigator()
  }
  Logout = () => {
    alert('Hi');
    this.props?.navigation.navigate("Home");
    return ("");
  }
  WorkOrderScreen() {
    return (
      <Stack.Navigator
        initialRouteName="WorkOrder"
        screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="Work" component={Workorder} />
        <Stack.Screen name="WorkOrderDetail" component={WorkorderDetails} options={{headerShown:true}}></Stack.Screen>
      </Stack.Navigator>
    );
  }
  HomeScreen() {
    return (
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="Home" component={Dashboard} />
        <Stack.Screen name="WorkOrderDetail" component={WorkorderDetails} options={{headerShown:true}}></Stack.Screen>
      </Stack.Navigator>
    );
  }
  render() {
    //this.RegisterStackNavigator();
    return (
      <>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          activeColor={Colors.light_crystal_blue}
          inactiveColor={Colors.white}
          barStyle={{ height: 85, backgroundColor: Colors.primary_color }}
          labeled={true}

        >
          <Tab.Screen
            name="HomePage"
            component={this.HomeScreen}

            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ focused, color }) => (
                <>
                  <AntDesign name="home" size={24} color={(focused) ? Colors.light_crystal_blue : Colors.white} />
                </>
              ),
            }}
          />
          <Tab.Screen
            name="WorkOrder"
            component={this.WorkOrderScreen}
            options={{
              tabBarLabel: "Work",
              tabBarIcon: ({ focused, color }) => (
                <Feather name="settings" size={24} color={(focused) ? Colors.light_crystal_blue : Colors.white} />)
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Team}
            options={{
              tabBarLabel: "Team",
              tabBarIcon: ({ focused, color }) => (
                <MaterialCommunityIcons name="handshake-outline" size={24} color={(focused) ? Colors.light_crystal_blue : Colors.white} />
              ),
            }}
          />
          <Tab.Screen
            name="Help"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ focused, color }) => (
                <FontAwesome5 name="user-circle" size={24} color={(focused) ? Colors.light_crystal_blue : Colors.white} />
              ),
            }}
          />
        </Tab.Navigator>
      </>
    );
  }
}
const styles = StyleSheet.create({
  tabScreen: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});

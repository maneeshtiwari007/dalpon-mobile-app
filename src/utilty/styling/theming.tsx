import { StyleSheet } from "react-native";
import Colors from "../Colors";

const Theming = StyleSheet.create({
    LayoutContainer: {
        flex: 1,
        backgroundColor: Colors.primary_color,
        paddingTop: 45,
    },
    LoginLayoutContainer: {
        flex: 1,
        backgroundColor: Colors.primary_color,
        paddingTop: 45,
    },
    MainHeaderLayoutContainer: {
        width: '100%',
        height: 45,
    },
    MainHeaderLayoutContent: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'flex-end',
        paddingBottom: 10,
        paddingLeft: 10,
    },
    headerRightIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerRightIcon: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerLeftUserIcon: {
        width: 30,
        height: 30,
        borderColor: Colors.light_crystal_blue,
        borderWidth: 2,
        borderRadius: 8
    },
    button: { 
        backgroundColor: Colors.light_crystal_blue, 
        height: 70, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10,
        text:{
            color:Colors.primary_color,
            fontSize:Colors.FontSize.f17
        },
        disable:{
            backgroundColor: Colors.light_crystal_blue_disable, 
        }
    },
    LoginScreen:{
        backgroundColor: Colors.primary_color,
        header:{
            backgroundColor:Colors.circleColor,
            borderBottomLeftRadius:100,
            width:'100%',
        }
    },
    avatar:{ 
        width:120,
        height:120,
        borderRadius:150 
    },
    errorContainer:{
        marginBottom:5,
        left:5
    },
    inputError:{
        color:Colors.errorColor
    },
    buttonDanger:{
        backgroundColor:Colors.errorColor
    }
});
export default Theming;
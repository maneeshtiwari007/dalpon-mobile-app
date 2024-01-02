import { Component } from "react"
import CommonCameraPropsInterface from "../../Interfaces/States/CommonCameraPropsInterface";
import CommonCameraStateInterface from "../../Interfaces/States/CommonCameraStateInterface";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Colors from "../../utilty/Colors";

export default class CommonCamera extends Component<CommonCameraPropsInterface, CommonCameraStateInterface>{
    cameraRef:any;
    constructor(props: any) {
        super(props);
        this.state = {
            cameraType: null,
            permission: null,
            ref:null,
            cameraPicture:null,
            cameraHeight:500
        }
    }
    async componentDidMount() {
        this.setState({ cameraType: CameraType.back });
        const permission = await Camera.requestCameraPermissionsAsync();
        this.setState({ permission: permission });
    }
    toggleCameraType() {
        if (this.state?.cameraType === CameraType.back) {
            this.setState({ cameraType: CameraType.front });
        } else {
            this.setState({ cameraType: CameraType.back });
        }
    }
    async takePicture(){
        const picture = await this.cameraRef.takePictureAsync({base64:true});
        this.setState({cameraPicture:picture});
    }
    discordImage(){
        this.setState({cameraPicture:null});
    }
    closeCamera(){
        this.setState({cameraPicture:null});
        this.props.onCloseCamera({});
    }
    onCaptureImage(){
        this.props.onCaptureImage(this.state.cameraPicture);
    }
    render() {
        return (
            <View style={styles.container}>
                {!this.state?.cameraPicture &&
                    <Camera style={[styles.camera,{height:this.state.cameraHeight}]} type={(this.state.cameraType)?this.state.cameraType:CameraType.back} ref={(camref:any) =>{this.cameraRef=camref}} onCameraReady={()=>{
                        this.setState({cameraHeight:Dimensions.get('window').height - 175})
                    }}>
                        <View style={styles.buttonContainer}>
                            <View style={{marginTop:'auto',marginBottom:20,flexDirection:'row',justifyContent:'space-around'}}>
                                <TouchableOpacity style={[styles.button,{backgroundColor:Colors.primary_color}]} onPress={() => this.toggleCameraType()}>
                                    <MaterialIcons name="flip-camera-android" size={24} color={Colors.white} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button,{backgroundColor:Colors.primary_color}]} onPress={() => this.takePicture()}>
                                    <MaterialIcons name="camera" size={24} color={Colors.white} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button,{backgroundColor:Colors.errorColor}]} onPress={() => this.closeCamera()}>
                                    <FontAwesome5 name="times" size={24} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Camera>
                }
                {this.state?.cameraPicture && 
                    <View style={[styles.camera,{height:this.state.cameraHeight}]}>
                        <View style={{flex:1}}>
                            <Image source={{uri:this.state.cameraPicture.uri}} style={{flex:1}}></Image>
                            <View style={{marginTop:'auto',marginBottom:20,flexDirection:'row',justifyContent:'space-around',position:'absolute',width:'100%',zIndex:9,bottom:0}}>
                                <TouchableOpacity style={[styles.button,{backgroundColor:Colors.success_color}]} onPress={() => this.onCaptureImage()}>
                                    <Ionicons name="checkmark-done" size={24} color={Colors.white} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button,{backgroundColor:Colors.errorColor}]} onPress={() => this.discordImage()}>
                                    <FontAwesome5 name="times" size={24} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: -45
    },
    camera: {
        width: 'auto',
        position: 'relative'
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        height:50,
        width:50,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    text: {

    }
});
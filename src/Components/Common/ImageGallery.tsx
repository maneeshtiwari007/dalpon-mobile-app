import { Component, ReactNode } from "react";
import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ThemeStyling } from "../../utilty/styling/Styles";
import ImageGalleryInterface from "../../Interfaces/Common/ImageGalleryInterface";
import ImageModal from "./ImgeModal";

export default class ImageGallery extends Component<ImageGalleryInterface,{url:any,isVisible:any}>{
    constructor(props: any) {
        super(props);
        this.state={
            url:'',
            isVisible:false
        }
    }
    imageClicked(urlData:any){
        console.log('Clicked');
        this.setState({url:urlData,isVisible:true})
    }
    render() {
        return (
            <View style={ThemeStyling.gallery}>
                {this.props?.objdata && this.props?.objdata?.length > 0 && this.props?.objdata?.map((item: any, index: number) => {
                    return (
                        <View style={[ThemeStyling.galleryItem, { alignItems: 'center' }]} key={index}>
                            <TouchableOpacity onPress={()=>{this.imageClicked(item?.url)}}>
                                <Image style={[ThemeStyling.profileImage, { borderRadius: 10 }]} source={{ uri: item?.url }}/>
                            </TouchableOpacity>
                            {item?.text &&
                                <Text>{item?.text}</Text>
                            }
                        </View>
                    );
                })}
                {this.state?.isVisible &&
                    <ImageModal dataObj={this.state} onPressCallBack={()=>{this.setState({url:'',isVisible:false})}}/>
                }
            </View>
        );
    }
}
import { Component, ReactNode } from "react";
import { Image, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import CardInterface from "../../Interfaces/Common/CardInterface";
import EnhancedImageViewing from "react-native-image-viewing/dist/ImageViewing";

export default class ImageModal extends Component<CardInterface> {
    state = {
        modalVisible: false,
        url:''
    }
    constructor(props:any) {
        super(props);
    }
    
    toggleModal(visible: boolean) {
        const { onPressCallBack } = this.props;
        this.setState({ modalVisible: visible });
        onPressCallBack();
    }

    render() {
        return (
            <>
                <EnhancedImageViewing
                    images={[{ uri: this.props.dataObj?.url }]}
                    imageIndex={0}
                    visible={this.props.dataObj?.isVisible}
                    onRequestClose={() => this.toggleModal(!this.state.modalVisible)}
                />
            </>
        )
    }
}
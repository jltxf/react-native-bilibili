import React, { Component } from 'react';
import {
    FlatList, StyleSheet, View, Text, Image, Button, TouchableOpacity, ImageBackground,
} from 'react-native';

export default class VideoView extends React.Component {

    static navigationOptions = {
        // headerTitle: this.props.navigation.state.params.videoName,
    };

    _pressButton() {
        const { navigator } = this.props;
        if (navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: "100%", height: 200, backgroundColor: '#000', }} >
                    <ImageBackground style={{ height: 200 }} source={require('../../res/images/headportrait/30660629_cover.jpg')}>
                        <View style={{ marginTop: 140, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 30 }}
                            // onPress={() => {
                            // this.props.navigation.navigate('VideoPlayScreen')
                            // }}
                            >
                                <Image style={{ height: 50, width: 50 }} source={require('../../res/images/videopic/ic_item_video_play.png')}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginLeft: 370 }}
                            // onPress={() => {this.props.navigation.navigate('VideoViewScreen')
                            // }}
                            >
                                <Image style={{ height: 45, width: 45 }} source={require('../../res/images/videopic/ic_window_expand.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ width: "100%", height: 175, marginTop: 10 }}>
                    <View style={{ flexDirection: "row", marginLeft: 10, }}>
                        <View style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}>
                            <Image source={require('../../res/images/videopicture/bili_img_49917426.jpg')}
                                style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}></Image>

                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 10, marginRight: 340 }}>
                            <Text style={{ fontSize: 15 }}>图灵怪</Text>
                            <Text style={{ fontSize: 10, color: '#ADADAD' }}>1497粉丝</Text>
                        </View>
                        <Button
                            title="+ 关注"
                        >
                        </Button>
                    </View>
                    <View></View>
                    <View style={{ flexDirection: 'row', height: 17, marginTop: 10, marginBottom: 10 }}>
                        <Image style={{ width: 12, height: 12, marginLeft: 10 }}
                            source={require('../../res/images/videopic/ic_btn_player_danmaku_options_block_bottom_disabled.png')}></Image>
                        <Text style={{ fontSize: 10, marginLeft: 5 }}>1.1万</Text>
                        <Image style={{ width: 12, height: 12, marginLeft: 15 }} source={require('../../res/images/videopic/ic_danmu.png')}></Image>
                        <Text style={{ fontSize: 10, marginLeft: 10 }}>206</Text>
                        <Text style={{ fontSize: 10, marginLeft: 20 }}>xx小时前</Text>
                        <View style={{ height: 17, marginLeft: 240 }}>
                            <Text style={{ fontSize: 10, marginLeft: 10 }}>未经作者授权禁止转载</Text>
                        </View>
                    </View>
                    <Text style={{ flexDirection: 'column', marginLeft: 10, }}> 标题</Text>



                </View>


            </View >
        );
    }
}
import React from "react";
import {
    FlatList, StyleSheet,
    Text, View, Image, ScrollView, TouchableOpacity,
} from 'react-native';
import toViewScreen from './toViewScreen';
export default class SettingScreen extends React.Component {

    static navigationOptions = {
        tabBarVisible: true,
    };
    constructor(props) {
        super(props)
        this.state = {
            //要显示的数据
            application: [
                {
                    'img1': require('../../res/images/classify/ic_category_live.png'), 'name1': '直播'
                    , 'img2': require('../../res/images/classify/ic_category_clip_video.png'), 'name2': '动画'
                    , 'img3': require('../../res/images/classify/ic_category_t3.png'), 'name3': '音乐'
                    , 'img4': require('../../res/images/classify/ic_category_t129.png'), 'name4': '舞蹈'
                },
                {
                    'img1': require('../../res/images/classify/ic_category_t4.png'), 'name1': '游戲'
                    , 'img2': require('../../res/images/classify/ic_category_t36.png'), 'name2': '科技'
                    , 'img3': require('../../res/images/classify/ic_category_game_center.png'), 'name3': '数码'
                    , 'img4': require('../../res/images/classify/ic_category_t160.png'), 'name4': '生活'
                },
                {
                    'img1': require('../../res/images/classify/ic_category_t119.png'), 'name1': '鬼畜'
                    , 'img2': require('../../res/images/classify/ic_category_t155.png'), 'name2': '时尚'
                    , 'img3': require('../../res/images/classify/ic_category_t165.png'), 'name3': '广告'
                    , 'img4': require('../../res/images/classify/ic_category_t5.png'), 'name4': '娱乐'
                },
                {
                    'img1': require('../../res/images/classify/ic_category_t181.png'), 'name1': '影视'
                    , 'img2': require('../../res/images/classify/ic_category_t23.png'), 'name2': '电影'
                    , 'img3': require('../../res/images/classify/ic_category_t11.png'), 'name3': '电视剧'
                    , 'img4': require('../../res/images/classify/ic_category_clip_video.png'), 'name4': '小视频'
                },
                {
                    'img1': require('../../res/images/classify/ic_category_album.png'), 'name1': '相簿'
                    , 'img2': require('../../res/images/classify/ic_category_mall.png'), 'name2': '会员购'
                    , 'img3': require('../../res/images/classify/ic_category_game_center.png'), 'name3': '游戏'
                    , 'img4': require('../../res/images/classify/ic_category_promo.png'), 'name4': '赛事'
                },
            ]

        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: "100%", height: 90, marginTop: 20, }}>
                    <View style={{ flex: 1, alignContent: 'space-around', flexWrap: "wrap" }}>
                        <View style={{ flexDirection: 'column', position: "absolute", left: "5%" }}>
                            <Image source={require('../../res/images/classify/ic_category_t13.png')}
                                style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                            <Text> 番剧</Text>
                        </View>

                        <View style={{ flexDirection: 'column', position: "absolute", left: "32%" }}>
                            <Image source={require('../../res/images/classify/ic_category_t167.png')}
                                style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                            <Text> 国创</Text>
                        </View>
                        <View style={{ flexDirection: 'column', position: "absolute", right: "32%" }}>
                            <Image source={require('../../res/images/classify/ic_category_cinema.png')}
                                style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                            <Text> 放映厅</Text>
                        </View>
                        <View style={{ flexDirection: 'column', position: "absolute", right: "5%" }}>
                            <Image source={require('../../res/images/classify/ic_category_live_all.png')}
                                style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                            <Text> 纪录片</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: "100%", height: 80, borderBottomWidth: 1, borderBottomColor: '#ADADAD' }}>
                    <View style={{ flex: 1, alignContent: 'space-around', flexWrap: "wrap" }}>
                        <View style={{ flexDirection: 'column', position: "absolute", left: "5%" }}>
                            <Image source={require('../../res/images/classify/ic_category_audio.png')}
                                style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                            <Text> 音频</Text>
                        </View>

                        <View style={{ flexDirection: 'column', position: "absolute", left: "32%" }}>
                            <Image source={require('../../res/images/classify/ic_category_column.png')}
                                style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                            <Text> 专栏</Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={this.state.application}
                    renderItem={({ item }) => (
                        <View style={{ width: "100%", height: 90, }}>
                            <View style={{ flex: 1, alignContent: 'space-around', flexWrap: "wrap" }}>

                                <TouchableOpacity style={{ flexDirection: 'column', position: "absolute", left: "5%" }} onPress={() => {
                                    this.props.navigation.navigate('toViewScreen')
                                }}  >
                                    <Image source={item.img1}
                                        style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                                    <Text> {item.name1}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'column', position: "absolute", left: "32%" }} onPress={() => {
                                    this.props.navigation.navigate('toViewScreen')
                                }}  >
                                    <Image source={item.img2}
                                        style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                                    <Text> {item.name2}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'column', position: "absolute", right: "32%" }} onPress={() => {
                                    this.props.navigation.navigate('toViewScreen')
                                }
                                }  >

                                    <Image source={item.img3}
                                        style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                                    <Text> {item.name3}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'column', position: "absolute", right: "5%" }} onPress={() => {
                                    this.props.navigation.navigate('toViewScreen')
                                }
                                }  >
                                    <Image source={item.img4}
                                        style={{ width: 40, height: 40, marginBottom: 7 }}></Image>
                                    <Text> {item.name4}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}





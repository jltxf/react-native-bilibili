import React from "react";
import {
    FlatList, StyleSheet,
    Text, View, Image, ScrollView, TouchableOpacity,
} from 'react-native';
import VideoViewScreen from './VideoViewScreen';
export default class toViewScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false, // 隐藏底部导航栏
    };

    constructor(props) {
        super(props)
        this.state = {
            //要显示的数据
            data: [
                { 'id': 1, 'img1': require('../../res/images/videopicture/53.jpg'), 'img2': require('../../res/images/headportrait/26021305_cover.jpg'), 'style': '原创', 'name': '【阴阳师MMD】 不知火--牵丝戏', 'up': '王雪梅', 'time': '5月1日' },
                { 'id': 1, 'img1': require('../../res/images/videopicture/bili_img_49745040.jpg'), 'img2': require('../../res/images/headportrait/30660629_cover.jpg'), 'style': '原创', 'name': '【MMD】 蹦蹦蹦--牵丝戏', 'up': '王雪梅', 'time': '5月1日' },
                { 'id': 1, 'img1': require('../../res/images/videopicture/bili_img_49883546.jpg'), 'img2': require('../../res/images/headportrait/31174640_cover.jpg'), 'style': '动漫', 'name': '穷电影', 'up': '王雪梅', 'time': '5月1日' },
                { 'id': 1, 'img1': require('../../res/images/videopicture/bili_img_49917426.jpg'), 'img2': require('../../res/images/headportrait/31224077_cover.jpg'), 'style': '动漫', 'name': '【MMD】 不知火--牵丝戏', 'up': '王雪梅', 'time': '5月1日' },
                { 'id': 1, 'img1': require('../../res/images/videopicture/bili_img_47263224.jpg'), 'img2': require('../../res/images/headportrait/31470593_cover.jpg'), 'style': '游戏', 'name': ' 不知火--牵丝戏', 'up': '王雪梅', 'time': '5月1日' },
                { 'id': 1, 'img1': require('../../res/images/videopicture/bili_img_48081106.jpg'), 'img2': require('../../res/images/headportrait/31489660_cover.jpg'), 'style': '版权', 'name': '【 不知火--牵丝戏', 'up': '王雪梅', 'time': '5月1日' },
                { 'id': 1, 'img1': require('../../res/images/videopicture/02.jpg'), 'img2': require('../../res/images/headportrait/31809733_cover.jpg'), 'style': '电影', 'name': ' 不知火--牵丝戏', 'up': '王雪梅', 'time': '5月1日' },
            ]

        }
    }

    renderRow(rowData) {
        return <TouchableOpacity style={{ flex: 1, }} onPress={() => {
            this.props.navigation.navigate('VideoViewScreen',{videoName:rowData.name,videoId:rowData.id})
        }
        }  >
            <Image style={{ height: 200, width: "95%", }} source={rowData.item.img1}></Image>
            <View style={{ flexDirection: 'row', marginTop: 5, }}>
                <View style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}>
                    <Image source={rowData.item.img2}
                        style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}></Image>
                </View>
                <View style={{ flexDirection: "column", width: '85%' }}>
                    <Text>{rowData.item.up}</Text>

                    <View style={{ flexDirection: 'row', }}>
                        <Text>{rowData.item.customer}</Text>
                        <Text>   .   </Text>
                        <Text>{rowData.item.time}</Text>
                    </View>
                    <Text style={{ position: "absolute", right: "2%" }}>{rowData.item.style}</Text>
                </View>
            </View>
            <View style={{ marginTop: 25, borderTopWidth: 0, borderBottomWidth: 1, borderBottomColor: '#ADADAD' }} />
        </TouchableOpacity>

    }

    _keyExtractor = (item, index) => {
        return item.source + index
    }
    render() {
        return (


            <View style={{ flex: 1 }}>
                <FlatList
                    renderItem={(item, index) => this.renderRow(item, index)}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
}

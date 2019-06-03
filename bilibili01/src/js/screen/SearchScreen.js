import React, { Component, Keyboard } from 'react';
import {
    FlatList, StyleSheet, View, Text, Image, TextInput, TouchableOpacity,
} from 'react-native';


export default class SearchScreen extends Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);
        this.state = {
            text: '',
            code: null,
            msg: null,
            Searchata: [],
        };
    }
    _fetchSearchData = (Uuid) => {
        fetch('http://10.2.200.119:8002/backend/bili/listBiliByBiliNameOrUserName/' + Uuid)

            .then((response) => response.json())
            .then((responseData) => {       // 获取到的数据处理
                this.setState({
                    data: responseData.data,
                    msg: responseData.msg,
                    code: responseData.code,
                })

            })
            .catch((error) => { })
            .done();
    }

    closeKeyboard() {

    }

    renderRow(rowData) {
        return <TouchableOpacity style={{ flex: 1, }} onPress={() => {
            this.props.navigation.navigate('VideoPlayScreen', { biliUuid: rowData.item.biliUuid })
        }
        }  >
            <Image style={{ height: 200, width: "95%", }} source={{ uri: rowData.item.biliPicture }}></Image>
            <View style={{ flexDirection: 'row', marginTop: 5, }}>
                <View style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}>
                    <Image source={{ uri: rowData.item.userPicture }}
                        style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}></Image>
                </View>
                <View style={{ flexDirection: "column", width: '85%' }}>
                    <Text>{rowData.item.biliName}</Text>

                    <View style={{ flexDirection: 'row', }}>
                        <Text>{rowData.item.userName}</Text>
                        <Text>   .   </Text>
                        <Text>{rowData.item.gmtCreate}</Text>
                    </View>
                    <Text style={{ position: "absolute", right: "2%" }}>{rowData.item.biliClassify02}</Text>
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
                <View style={styles.viewStyle}>
                    <TextInput inlineImageLeft='icon_search'
                        keyboardType='default'
                        allowFontScaling={true}
                        ref='input'
                        placeholderTextColor={'rgba(255,255,255, 0.7)'}
                        onChangeText={(text) => this.setState({ text })}
                        style={styles.textInputStyle} />
                    <TouchableOpacity style={styles.touStyle} onPress={() => {
                        this._fetchSearchData(this.state.text)
                        this.refs['input'].blur();
                    }}>
                        <Image source={require('../../res/images/toBar/ic_shortcut_search.png')} style={styles.imageStyle} />
                    </TouchableOpacity>
                </View>
                {/* <Text>{this.state.text}</Text> */}
                <FlatList
                    renderItem={(item, index) => this.renderRow(item, index)}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                />
            </View>



        );
    }
}

const styles = StyleSheet.create(
    {
        viewStyle: {
            height: 45,
            width: "100%",
            marginBottom: 10,
            backgroundColor: '#1C86EE',
            alignContent: 'center',
            justifyContent: 'center',
            paddingBottom: 10

        },
        textInputStyle: {
            color: 'rgba(255,255,255, 0.7)',
            width: '80%',
            borderRadius: 20,
            backgroundColor: '#104E8B',
            height: 30,
            marginTop: 10,
            paddingTop: 0,
            paddingBottom: 0,
            position: "absolute",
            right: "15%"
        },
        touStyle: {
            backgroundColor: '#1C86EE',
            position: "absolute",
            right: "7%",
            height: 30,
            width: 30
        },
        imageStyle: {
            height: 30,
            width: '100%'
        },
    });

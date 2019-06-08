import React from "react";
import {
    FlatList, SectionList, TextInput, Button, ImageBackground, AsyncStorage,
    Text, View, Image, ListView, TouchableOpacity, ActivityIndicator, ToastAndroid,
} from 'react-native';
import VideoPlayScreen from './VideoPlayScreen';

const ipv4Address = '10.4.122.130';//本机
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
export default class toViewScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            navigateer: [],

            refreshing: false,//当前的刷新状态
            userName: '',
            userUuid: props.navigation.state.params.userUuid,
            userAccount: props.navigation.state.params.userAccount,
            userPicture: props.navigation.state.params.userPicture,
            isLoadmenu: props.navigation.state.params.isLoadmenu,//是否是进入个人界面判别
            // userAccount: '',
            // userPicture: '',
            // isLoadmenu: '',
            userPwd: '',
            userNewPwd: '',

            isLoading: true,//请求网络状态
            error: false,
            errorInfo: "",
            //素材
            ic_22: require('../../res/images/register/ic_22.png'),
            ic_33: require('../../res/images/register/ic_33.png'),
            ic_22_hide: require('../../res/images/register/ic_22_hide.png'),
            ic_33_hide: require('../../res/images/register/ic_33_hide.png'),
            isLogining: false,//登录注册判别
            isasncLoad: false,//数据持久化判别
            isasncadd: false,//数据持久化判别
            iscollection: false,//是否更新过收藏

            //收藏
            collectionData: [],
        }
    }

    componentDidMount() {
        this._retrievegain();
    }
    _fetchToLogin = (userAccount, userPwd) => {
        fetch('http://' + ipv4Address + ':8002/backend/user/getUserByLogin/' + '?userAccount=' + userAccount + '&userPwd=' + userPwd
        )
            .then((response) => response.json())
            .then((responseData) => {       // 获取到的数据处理
                const msg = responseData.msg;
                const code = responseData.code;
                if (code == 0) {
                    this._storeData(responseData.data.userAccount, responseData.data.userPicture, responseData.data.userUuid);
                    this.setState({
                        data: responseData.data,
                        userAccount: responseData.data.userAccount,
                        userPicture: responseData.data.userPicture,
                        userUuid: responseData.data.userUuid,
                        isLoading: false,
                    })
                }
            })

            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
    }



    _fetchToRegister = (userAccount, userName, userPwd, userNewPwd) => {
        let formData = new FormData();
        formData.append("userAccount", userAccount);
        formData.append("userName", userName);
        formData.append("userPwd", userPwd);
        formData.append("userNewPwd", userNewPwd);
        const url = "http://" + ipv4Address + ":8002/backend/user/saveUser/";
        var opts = {
            method: "POST",   //请求方法
            body: formData,
            headers: {
            }
        };
        fetch(url, opts)

            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {       // 获取到的数据处理
                const msg = json.msg;
                const code = json.code;
                if (code == 0) {
                    this._storeData(json.data.userAccount, json.data.userPicture, json.data.userUuid);
                    this.setState({
                        data: json.data,
                        userAccount: json.data.userAccount,
                        userPicture: json.data.userPicture,
                        userUuid: json.data.userUuid,
                        isLoading: false,
                    })
                }
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
    }

    _fetchToCollectionOfUserUuid02 = (userUuid02) => {
        fetch('http://' + ipv4Address + ':8002/backend/collect/listCollections/' + '?userUuid02=' + userUuid02
        )
            .then((response) => response.json())
            .then((responseData) => {       // 获取到的数据处理
                const msg = responseData.msg;
                const code = responseData.code;
                this.setState({
                    collectionData: responseData.data,
                    iscollection: true,
                })
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
    }
    renderMenu() {
        return (
            <View style={{ flex: 1 }}>

                <ImageBackground style={{ height: 120, width: "100%", backgroundColor: '#1C86EE', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1C86EE', marginBottom: 220 }} source={require('../../res/images/register/ic_group_header_bg.png')}>
                    <TouchableOpacity style={{ height: 25, width: 25, position: 'absolute', left: '5%', paddingTop: 17 }}
                        //回退页面
                        onPress={() => {
                            this.props.navigation.goBack()
                            // this.props.navigation.navigate('UserScreen', { userPicture: this.state.userPicture, userName: this.state.userName });
                        }}>
                        <Image source={require('../../res/images/toBar/abc_ic_ab_back_mtrl_am_alpha.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', paddingLeft: 15, paddingTop: 77 }}>
                        <View style={{ width: 80, height: 80, borderRadius: 50, overflow: 'hidden', borderColor: '#000' }}>
                            <Image style={{ height: 80, width: 80 }} source={{ uri: this.state.userPicture }} />
                        </View>
                        <Text style={{ paddingLeft: 10, paddingTop: 10, color: '#1C86EE' }}>{this.state.userAccount}</Text>
                    </View>

                    <TouchableOpacity onPress={
                        () => {
                            this._retrieveRemove();
                            this.props.navigation.goBack();
                        }
                    }
                        style={{ position: 'absolute', right: '2%', top: '5%', height: 20, width: 60, backgroundColor: '#1C86EE', alignItems: 'center' }}
                    >
                        <Text style={{ color: '#FFF' }}>退出</Text>
                    </TouchableOpacity>
                </ImageBackground>

                <FlatList
                    extraData={this.state}
                    renderItem={(item, index) => this.renderRow(item, index)}
                    data={this.state.collectionData}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }
    renderRegister() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ height: 60, width: "100%", backgroundColor: '#1C86EE', flexDirection: 'row', }}>
                    <TouchableOpacity style={{ height: 25, width: 25, position: 'absolute', left: '5%', paddingTop: 17 }}
                        //回退页面
                        onPress={() => { this.props.navigation.goBack() }}>
                        <Image source={require('../../res/images/toBar/abc_ic_ab_back_mtrl_am_alpha.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#FFF', position: 'absolute', left: '12%', paddingTop: 20 }}>注册账号</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 40, justifyContent: 'center' }}>
                    <Image source={this.state.ic_22_hide} style={{ position: 'absolute', left: '1%', height: 60, width: 60 }} />
                    <Image source={require('../../res/images/register/ic_bili_logo.png')} style={{ height: 41, width: 130 }} />
                    <Image source={this.state.ic_33_hide} style={{ position: 'absolute', right: '1%', height: 60, width: 60 }} />
                </View>
                <View style={{ width: "100%", flexDirection: 'column', alignItems: 'center' }}>
                    <TextInput inlineImageLeft='icon_search'
                        keyboardType='default'
                        allowFontScaling={true}
                        ref='input'
                        onChangeText={(userName) => this.setState({ userName })}
                        placeholderTextColor='#021'
                        placeholder='你的账号名'
                        style={{ width: 270 }}
                        underlineColorAndroid='#000'
                    />
                    <TextInput inlineImageLeft='icon_search'
                        keyboardType='default'
                        allowFontScaling={true}
                        ref='input'
                        onChangeText={(userAccount) => this.setState({ userAccount })}
                        placeholderTextColor='#021'
                        placeholder='你的手机号/邮箱'
                        style={{ width: 270 }}
                        underlineColorAndroid='#000'
                    />
                    <TextInput inlineImageLeft='icon_search'
                        keyboardType='default'
                        allowFontScaling={true}
                        onChangeText={(userPwd) => this.setState({ userPwd })}
                        placeholderTextColor='#021'
                        placeholder='请输入密码'
                        secureTextEntry={true}
                        style={{ width: 270 }}
                        underlineColorAndroid='#000'
                    />
                    <TextInput inlineImageLeft='icon_search'
                        keyboardType='default'
                        allowFontScaling={true}
                        onChangeText={(userNewPwd) => this.setState({ userNewPwd })}
                        placeholderTextColor='#021'
                        placeholder='再次输入密码'
                        secureTextEntry={true}
                        style={{ width: 270 }}
                        underlineColorAndroid='#000'
                    />

                    <View style={{ flexDirection: 'row', width: 270, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: 100, height: 30, alignItems: 'center', backgroundColor: '#1C86EE', justifyContent: 'center' }}
                            onPress={
                                () => {
                                    if (this.state.userNewPwd == this.state.userPwd) {
                                        this._fetchToRegister(this.state.userAccount, this.state.userName, this.state.userPwd, this.state.userNewPwd);
                                    } else {
                                        alert("密码不一致");
                                    }
                                }
                            }
                        >
                            <Text style={{ color: '#FFF', fontWeight: '700' }}>注册账号</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    renderLogin() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ height: 60, width: "100%", backgroundColor: '#1C86EE', flexDirection: 'row', }}>
                    <TouchableOpacity style={{ height: 25, width: 25, position: 'absolute', left: '5%', paddingTop: 17 }}
                        //回退页面
                        onPress={() => { this.props.navigation.goBack() }}>
                        <Image source={require('../../res/images/toBar/abc_ic_ab_back_mtrl_am_alpha.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#FFF', position: 'absolute', left: '12%', paddingTop: 20 }}>登录</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 40, justifyContent: 'center' }}>
                    <Image source={this.state.ic_22} style={{ position: 'absolute', left: '1%', height: 60, width: 60 }} />
                    <Image source={require('../../res/images/register/ic_bili_logo.png')} style={{ height: 41, width: 130 }} />
                    <Image source={this.state.ic_33} style={{ position: 'absolute', right: '1%', height: 60, width: 60 }} />
                </View>
                <View style={{ width: "100%", flexDirection: 'column', alignItems: 'center' }}>
                    <TextInput inlineImageLeft='icon_search'
                        keyboardType='default'
                        allowFontScaling={true}
                        ref='input'
                        onChangeText={(userAccount) => this.setState({ userAccount })}
                        placeholderTextColor='#021'
                        placeholder='你的手机号/邮箱'
                        style={{ width: 270 }}
                        underlineColorAndroid='#000'
                    />
                    <TextInput inlineImageLeft='icon_search'
                        keyboardType='default'
                        allowFontScaling={true}
                        onChangeText={(userPwd) => this.setState({ userPwd })}
                        placeholderTextColor='#021'
                        placeholder='请输入密码'
                        secureTextEntry={true}
                        style={{ width: 270 }}
                        underlineColorAndroid='#000'
                    />
                    <View style={{ flexDirection: 'row', width: 270, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: 100, height: 30, alignItems: 'center', backgroundColor: '#1C86EE', justifyContent: 'center' }}
                            onPress={
                                () => {
                                    this.setState({
                                        isLogining: true,
                                    })
                                }
                            }>

                            <Text style={{ color: '#FFF', fontWeight: '700' }}>注册账号</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 100, height: 30, alignItems: 'center', backgroundColor: '#1C86EE', justifyContent: 'center', marginLeft: 50 }}
                            onPress={
                                () => {

                                    this._fetchToLogin(this.state.userAccount, this.state.userPwd);

                                }
                            }>
                            <Text style={{ color: '#FFF', fontWeight: '700' }}>登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        if (!this.state.isLoading) {
            if (!this.state.iscollection) {
                this._fetchToCollectionOfUserUuid02(this.state.userUuid);
            }
            return this.renderMenu();
        }
        else if (this.state.isLoadmenu) {
            if (!this.state.iscollection) {
                this._fetchToCollectionOfUserUuid02(this.state.userUuid);
            }
            return this.renderMenu();
        }
        else if (this.state.isLogining) {
            return this.renderRegister();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView();
        }
        //加载数据
        return this.renderLogin();
    }
    emptyToLoad = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'red' }}>没有访问到数据</Text>
            </View>
        );
    }

    renderRow(rowData) {
        return <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => {
            this.props.navigation.navigate('VideoPlayScreen', { biliUuid: rowData.item.biliUuid })
        }
        }  >
            <Image style={{ height: 90, width: 120, }} source={{ uri: rowData.item.biliPicture }}></Image>
            <View style={{ flexDirection: 'column', marginTop: 15, }}>
                <Text style={{ paddingBottom: 2, paddingTop: 2, paddingLeft: 2 }}>{rowData.item.biliName}</Text>
                <View style={{ flexDirection: 'row', height: 17, marginTop: 2, }}>
                    <Image style={{ width: 12, height: 12, marginLeft: 10 }}
                        source={require('../../res/images/videopic/ic_address_book2.png')} />
                    <Text style={{ fontSize: 10, marginLeft: 5 }}>{rowData.item.userName}</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 17, marginTop: 2, marginBottom: 10 }}>
                    <Image style={{ width: 12, height: 12, marginLeft: 10 }}
                        source={require('../../res/images/videopic/ic_btn_player_danmaku_options_block_bottom_disabled.png')}></Image>
                    <Text style={{ fontSize: 10, marginLeft: 5 }}>{rowData.item.biliAmountOfPlay}</Text>
                    <Image style={{ width: 12, height: 12, marginLeft: 15 }} source={require('../../res/images/videopic/ic_danmu.png')}></Image>
                    <Text style={{ fontSize: 10, marginLeft: 10 }}>{rowData.item.biliAirplay}</Text>
                </View>
            </View>

        </TouchableOpacity>
    }

    renderSeparator = () => {
        return (
            <View style={{ borderRightWidth: 1, height: 10, borderRightColor: '#FFF' }} />
        );
    }

    // 加载等待页
    renderLoadingView() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            }}>
                <ActivityIndicator
                    animating={true}
                    color='1C86EE'
                    size='large'>
                </ActivityIndicator>
            </View>
        )
    }

    //网络请求失败页
    renderErrorView() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
            }}>
                <Text>
                    Fail
                    </Text>
            </View>
        )
    }
    //数据持久化
    _storeData = (userAccount, userPicture, userUuid) => {
        const data1 = { 'userAccount': userAccount, 'userPicture': userPicture, 'userUuid': userUuid };
        try {
            AsyncStorage.setItem('data', JSON.stringify(data1),
                (error) => {
                    if (error) {
                        ToastAndroid.show("存值失败" + error, ToastAndroid.SHORT);
                    } else {
                        ;
                        ToastAndroid.show("登录成功", ToastAndroid.SHORT);
                        this.setState({
                            isasncLoad: true,
                            errorInfo: error,
                        })
                    }
                }
            );
        } catch (error) {
            ToastAndroid.show('失败' + error, ToastAndroid.SHORT);
        }
    }
    _retrievegain = () => {
        try {
            AsyncStorage.getItem('data',
                (error, result) => {
                    if (error) {
                        alert('取值失败:' + error);
                    } else {
                        const json = JSON.parse(result);
                        if (json != null) {
                            this.setState({
                                userAccount: json.userAccount,
                                userUuid: json.userUuid,
                                userPicture: json.userPicture,
                                isLoadmenu: true,
                                errorInfo: error,
                            })
                            ToastAndroid.show('取值成功', ToastAndroid.SHORT);
                        }
                    }
                }
            )
        } catch (error) {
            ToastAndroid.show('失败' + error, ToastAndroid.SHORT);
        }
    }
    _retrieveRemove() {
        try {
            AsyncStorage.removeItem(
                'data',
                (error) => {
                    if (!error) {
                        ToastAndroid.show("移除成功", ToastAndroid.SHORT);
                    }
                }
            )
        } catch (error) {
            ToastAndroid.show("移除失败" + error, ToastAndroid.SHORT);
        }
    }


}

import React from "react";
import {
    FlatList,
    StyleSheet,
    Button,
    PermissionsAndroid,
    Alert,
    ActivityIndicator,
    ToastAndroid,
    DrawerLayoutAndroid,
    Dimensions,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage,
} from 'react-native';
import VideoPlayScreen from './VideoPlayScreen';
import SearchScreen from './SearchScreen';
import UserScreen from './UserScreen';

//查看是否有联网权限
// let internet = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.INTERNET)
const ipv4Address  = '10.4.122.130';//本机
let pageNum = 1;//当前第几页
let totalPage = 3;//总的页数
//本页面的长宽
const { width, height } = Dimensions.get('window')

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)

        props.navigation.addListener("willFocus",this._retrieveData)
        this.state = {
            userPicture: 'http://pic.616pic.com/ys_img/00/07/79/0iVLGX0QS6.jpg',
            userAccount: '未登录',
            userUuid: '',

            // 网络请求用数据
            code: null,
            msg: null,
            data: [],
            biliUuid: '',
            isLoading: true,//请求网络状态
            error: false,
            errorInfo: "",
            // 下拉用数据
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing: false,//下拉控制
            isLoadmenu: false,//是否是进入个人界面判别
        }
    }
    componentDidMount() {
        this._fetchData(this.getmyDate(), pageNum);
    }
    //网络请求==获取第pageNum页数据
    _fetchData = (gmtCreate) => {
        fetch('http://'+ipv4Address+':8002/backend/bili/listBilibilis/' + '?gmtCreate=' + gmtCreate + '?pageNum=' + pageNum)
            .then((response) => response.json())
            .then((response) => {
                let dataArray = response.data;

                let foot = 0;
                if (pageNum >= totalPage) {
                    foot = 1;//listView底部显示没有更多数据了
                }

                // 获取到的数据处理
                this.setState({
                    data: this.state.data.concat(dataArray),//合并数组
                    msg: response.msg,
                    code: response.code,
                    //下拉控制数据的更改
                    isLoading: false,
                    showFoot: foot,
                    isRefreshing: false
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


    renderData() {
        const userImage = this.state.userPicture;
        const userName = this.state.userName;
        return (
            <DrawerLayoutAndroid
                ref={(drawer) => { this.drawer = drawer }}
                drawerWidth={300}
                onDrawerClose={this.handleDrawerClose}
                onDrawerOpen={this.handleDrawerOpen}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.navigationView.bind(this)}>

                <View style={{ flex: 1 }}>

                    <View style={{ height: 40, width: "100%", marginBottom: 10, backgroundColor: '#1C86EE', alignContent: 'center', justifyContent: 'center' }} >
                        <TouchableOpacity style={{ height: 20, flexDirection: 'row' }} onPress={this.open}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../res/images/toBar/ic_follow_dec.png')} />
                            <View style={{ width: 20, height: 20, borderRadius: 50, overflow: 'hidden' }}>
                                <Image style={{ height: 20, width: 20 }} source={{ uri: this.state.userPicture }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 20, width: "80%", backgroundColor: '#104E8B', borderRadius: 50, overflow: 'hidden', position: "absolute", right: "8%" }}
                            onPress={() => {
                                this.props.navigation.navigate('SearchScreen')
                            }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../res/images/toBar/ic_hint_home_live_search.png')}></Image>
                        </TouchableOpacity>
                    </View>

                    {/* <Button title="开启网络权限"
                        onPress={this.requestInternetPermission.bind(this)}
                    ></Button> */}

                    {/* <Text>{this.state.data.length}</Text> */}
                    <FlatList
                        extraData={this.state}
                        renderItem={(item, index) => this.renderRow(item, index)}
                        data={this.state.data}
                        keyExtractor={this._keyExtractor}
                        ListFooterComponent={this._renderFooter.bind(this)}
                        // ListHeaderComponent={this._renderHeader.bind(this)}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={1}
                        ItemSeparatorComponent={this._separator}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.handleRefresh}
                    />
                </View>
            </DrawerLayoutAndroid>

        )
    }



    render() {
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView();
        }
        //加载数据
        return this.renderData();
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
        </TouchableOpacity>

    }
    _keyExtractor = (item, index) => {
        return item.source + index
    }

    //获取当前
    getmyDate() {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        var day = date.getDate().toString();
        var hour = date.getHours().toString();
        var minute = date.getMinutes().toString();
        var second = date.getSeconds().toString();
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    };


    //分割线
    _separator() {
        return <View style={{ marginTop: 25, borderTopWidth: 0, borderBottomWidth: 1, borderBottomColor: '#ADADAD' }} />;
    }
    // 加载等待页
    renderLoadingView() {
        return (
            <View style={styles.container}>
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
            <View style={styles.container}>
                <Text>
                    Fail
                </Text>
            </View>
        )
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((pageNum != 1) && (pageNum >= totalPage)) {
            return;
        } else {
            pageNum++;
        }
        //底部显示正在加载更多数据
        this.setState({ showFoot: 2 });
        //获取数据 初始化完成会造成两次获取初始数据
        this._fetchData(this.getmyDate(), pageNum);
    }


    //flatList的底部
    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>

                    <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5, }}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
    //下拉刷新方法
    handleRefresh = () => {
        this.setState({
            isRefreshing: true,
            data: [],
        },
            () => {
                pageNum = 1;
                this._fetchData(this.getmyDate(), pageNum);
            }
        );
    }
    //侧边栏
    navigationView() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ backgroundColor: '#1C86EE', height: 150, width: '100%', flexDirection: 'row' }}>
                    <View
                        style={{ flexDirection: 'column', paddingLeft: 15, paddingTop: 20 }}>
                        <TouchableOpacity style={{ width: 60, height: 60, borderRadius: 50, overflow: 'hidden', borderColor: '#000' }}
                            onPress={() => {
                                this.props.navigation.navigate('UserScreen', {userUuid: this.state.userUuid,userPicture: this.state.userPicture, userAccount: this.state.userAccount, isLoadmenu: this.state.isLoadmenu });
                            }
                            }>
                            <Image style={{ height: 60, width: 60 }} source={{ uri: this.state.userPicture }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 10, color: '#FFF', paddingLeft: 10, paddingTop: 10 }}>{this.state.userAccount}</Text>
                    </View>
                    <Image style={{ position: "absolute", right: '1%', bottom: '1%' }} source={require('../../res/images/toBar/bg_clip_default_image_tv.9.png')} />
                </View>
                <TouchableOpacity onPress={this.close}>
                </TouchableOpacity>
            </View>
        )
    }
    //开启侧边栏
    open = () => {
        this.drawer.openDrawer();
    }
    //关闭侧边栏
    close = () => {
        this.drawer.closeDrawer();
    }
    handleDrawerOpen = () => {
        //使用ToastAndroid组件弹出一个原生的Toast
        ToastAndroid.show("open drawer", ToastAndroid.SHORT);
    }

    handleDrawerClose = () => {
        ToastAndroid.show("close drawer", ToastAndroid.SHORT);
    }
    _retrieveData = () => {
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
                            ToastAndroid.show("返回成功 ", ToastAndroid.SHORT);
                        }else{
                            this.setState({
                                userPicture: 'http://pic.616pic.com/ys_img/00/07/79/0iVLGX0QS6.jpg',
                                userAccount: '未登录',
                                isLoadmenu: false,
                            })
                        }
                        // alert('取值成功:' + result);
                    }
                }
            )
        } catch (error) {
            alert('失败' + error);
        }

    }
    /*
    * 弹出提示框向用户请求某项权限。返回一个promise，最终值为用户是否同意了权限申请的布尔值。
    * 其中rationale参数是可选的，其结构为包含title和message)的对象。
    * 此方法会和系统协商，是弹出系统内置的权限申请对话框，
    * 还是显示rationale中的信息以向用户进行解释。
    * */
    async requestInternetPermission() {
        try {
            //返回string类型
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.INTERNET,
                {
                    //第一次请求拒绝后提示用户你为什么要这个权限
                    'title': '我要网络权限',
                    'message': '没权限我不能工作，同意就好了'
                }
            )
            if (granted === PermissionsAndroid.INTERNET) {
                this.show("你已获取了网络权限")
            } else {
                this.show("获取网络权限失败")
            }
        } catch (err) {
            this.show(err.toString())
        }
    }
    show(data) {
        ToastAndroid.show(data, ToastAndroid.SHORT)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    content: {
        fontSize: 15,
        color: 'black',
    }
});


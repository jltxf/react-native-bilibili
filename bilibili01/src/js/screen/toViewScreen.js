import React from "react";
import {
    FlatList, SectionList,
    Text, View, Image, ListView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import VideoPlayScreen from './VideoPlayScreen';
export default class toViewScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            //要显示的数据
            classify01: props.navigation.state.params.classify,
            data: [],
            navigateer: [],
            code: '',
            msg: '',
            refreshing: false,//当前的刷新状态

            isLoading: true,//请求网络状态
            error: false,
            errorInfo: "",
        }
    }

    componentDidMount() {
        this._fetchToViewData(this.state.classify01, "")
    }
    componentWillMount() {
        this.topList(this.state.classify01)
    }
    _fetchToViewData = (biliClassify01, biliClassify02) => {
        fetch('http://10.2.200.119:8002/backend/bili/listBilibilis/' + '?biliClassify01=' + biliClassify01 + '&biliClassify02=' + biliClassify02
            // , {
            // method: 'GET',
            // headers: {
            //     // 'Accept': 'application/json',
            //     // 'Content-Type': 'application/json',
            //     'biliClassify01': biliClassify01,
            //     'biliClassify02': biliClassify02,
            // },
            // }
        )
            .then((response) => response.json())
            .then((responseData) => {       // 获取到的数据处理
                this.setState({
                    data: responseData.data,
                    msg: responseData.msg,
                    code: responseData.code,
                    isLoading: false,
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
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 60, width: "100%", backgroundColor: '#1C86EE', flexDirection: 'row', }}>
                    <TouchableOpacity style={{ height: 25, width: 25, position: 'absolute', left: '5%', paddingTop: 17 }}
                        //回退页面
                        onPress={() => { this.props.navigation.goBack() }}>
                        <Image source={require('../../res/images/toBar/abc_ic_ab_back_mtrl_am_alpha.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, color: '#FFF', position: 'absolute', left: '12%', paddingTop: 20 }}>{this.state.classify01}</Text>
                </View>
                <View style={{ height: 30 }}>
                    <FlatList
                        horizontal={true}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={(item, index) => this.renderNavi(item, index)}
                        data={this.state.navigateer}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
                <FlatList
                    renderItem={(item, index) => this.renderRow(item, index)}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    ListEmptyComponent={this.emptyToLoad}
                    // 当控件被创建后将 ScrollView 这个对象的引用就传给了 this._flatList 这个变量
                    ref={(flatList) => this._flatList = flatList}
                />
            </View>
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
    emptyToLoad = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'red' }}>没有访问到数据</Text>
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View style={{ borderRightWidth: 1, height: 10, borderRightColor: '#FFF' }} />
        );
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

    renderNavi(rowData) {
        return <TouchableOpacity style={{ height: 30, width: 120, paddingLeft: 15, paddingBottom: 10, backgroundColor: '#1C86EE' }}
            onPress={() => {
                const classify02 = rowData.item.nativator;
                this._fetchToViewData(this.state.classify01, classify02)
                this._flatList.scrollToOffset({ animated: true, viewPosition: 0, index: 0 }); //跳转到顶部
            }}>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>{rowData.item.nativator}</Text>
        </TouchableOpacity >
    }

    _keyExtractor = (item, index) => {
        return item.source + index
    }

    _pressButton() {
        const { navigator } = this.props;
        if (navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
        }
    }


    topList(a) {
        if (a == '直播') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '娱乐' }, { 'nativator': '手游' }, { 'nativator': '绘画' },]
        } else if (a == '动画') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '娱乐' }, { 'nativator': '手游' }, { 'nativator': '绘画' },]
        } else if (a == '音乐') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '翻唱' }, { 'nativator': 'VOCALOID·UTAU' }, { 'nativator': '演奏' },]
        } else if (a == '舞蹈') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '宅舞' }, { 'nativator': '三次元舞蹈' }, { 'nativator': '舞蹈教程' },]
        } else if (a == '游戲') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '娱乐' }, { 'nativator': '手游' }, { 'nativator': '绘画' },]
        } else if (a == '科技') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '趣味科普人文' }, { 'nativator': '野生技术学会' }, { 'nativator': '演讲·公开课' }, { 'nativator': '星海' }, { 'nativator': '数码' }, { 'nativator': '机械' }, { 'nativator': '汽车' },]
        } else if (a == '数码') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' },]
        } else if (a == '生活') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '搞笑' }, { 'nativator': '日常' }, { 'nativator': '美食圈' },]
        } else if (a == '鬼畜') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '鬼畜调教' }, { 'nativator': '音·MAD' }, { 'nativator': '人力VOCALOID' },]
        } else if (a == '时尚') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '美妆' }, { 'nativator': '服饰' },]
        } else if (a == '广告') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' },]
        } else if (a == '娱乐') {
            this.state.classify01 = a
            this.state.navigateer = [{ 'nativator': '推荐' }, { 'nativator': '综艺' }, { 'nativator': '明星' },]
        }

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

}

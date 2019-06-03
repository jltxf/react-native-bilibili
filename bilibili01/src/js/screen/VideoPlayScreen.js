import React, { Component } from 'react';
import { View, Dimensions, Image, Text, Slider, TouchableWithoutFeedback, TouchableOpacity, Button, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

const screenWidth = Dimensions.get('window').width;

function formatTime(second) {
  let h = 0, i = 0, s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function (v) {
    return (v >> 0) < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");
}

export default class VideoPlayScreen extends React.Component {

  static navigationOptions =({navigation})=>({
    title:navigation.state.params.biliUuid
  }) 
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      videoUrl: "http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade3/b/1.mp4",
      // videoCover: "http://124.129.157.208:8889/data/uploads/kecheng/2018/01/18/5a600b2c99836.png@0o_0l_220w.png",
      biliUuid: props.navigation.state.params.biliUuid,
      biliData: [],
      videoWidth: screenWidth,
      videoHeight: screenWidth * 9 / 16, // 默认16：9的宽高比
      showVideoCover: true,    // 是否显示视频封面
      showVideoControl: false, // 是否显示视频控制组件
      isPlaying: false,        // 视频是否正在播放
      currentTime: 0,        // 视频当前播放的时间
      duration: 0,           // 视频的总时长
      isFullScreen: false,     // 当前是否全屏显示
      playFromBeginning: false, // 是否从头开始播放
    };
  }
  componentDidMount() {
    this._fetchbiliData(this.state.biliUuid)
  }

  _fetchbiliData = (biliUuid) => {
    fetch('http://10.2.200.119:8002/backend/bili/getBilibiliById/' + biliUuid)
      // Alert.alert('标题内容', '正文内容')
      .then((response) => response.json())
      .then((responseData) => {       // 获取到的数据处理
        this.setState({
          biliData: responseData.data,
          videoUrl:responseData.data.biliVideo,
        })

      })
      .catch((error) => { })
      .done();
  }


  render() {
    return (
      <View style={styles.container} onLayout={this._onLayout}>
        {/* {this.setState({
          biliUuid: this.props.navigation.state.biliUuid
        })} */}
        {/* 标题栏 */}
        <View style={{ height: 45, width: "100%", backgroundColor: '#000', flexDirection: 'row', }}>
          <TouchableOpacity style={{ height: 25, width: 25, position: 'absolute', left: '5%', paddingTop: 12 }}
            //回退页面
            onPress={() => { this.props.navigation.goBack() }}>
            <Image source={require('../../res/images/toBar/abc_ic_ab_back_mtrl_am_alpha.png')} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 13, color: '#FFF', position: 'absolute', left: '12%', paddingTop: 15 }}>av {this.state.biliUuid}</Text>
        </View>

        {/* 视频播放 */}
        <View style={{ width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor: '#000000' }}>
          <Video
            ref={(ref) => this.videoPlayer = ref}
            source={{ uri: this.state.videoUrl}}
            rate={1.0}
            volume={1.0}
            muted={false}
            paused={!this.state.isPlaying}
            resizeMode={'contain'}

            playWhenInactive={false}
            playInBackground={false}

            ignoreSilentSwitch={'ignore'}
            progressUpdateInterval={250.0}

            onLoadStart={this._onLoadStart}
            onLoad={this._onLoaded}
            onProgress={this._onProgressChanged}
            onEnd={this._onPlayEnd}
            onError={this._onPlayError}
            onBuffer={this._onBuffering}
            style={{ width: this.state.videoWidth, height: this.state.videoHeight }}
          />
          {
            this.state.showVideoCover ?
              <Image
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: this.state.videoWidth,
                  height: this.state.videoHeight
                }}
                resizeMode={'cover'}
                source={{ uri: this.state.biliData.biliPicture }}
              /> : null
          }
          <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: this.state.videoWidth,
                height: this.state.videoHeight,
                backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              {
                this.state.isPlaying ? null :
                  <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                    <Image
                      style={styles.playButton}
                      source={require('../../res/images/assets/icon_video_play.png')}
                    />
                  </TouchableWithoutFeedback>
              }
            </View>
          </TouchableWithoutFeedback>
          {
            this.state.showVideoControl ?
              <View style={[styles.control, { width: this.state.videoWidth }]}>
                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                  <Image
                    style={styles.playControl}
                    source={this.state.isPlaying ? require('../../res/images/assets/icon_control_pause.png') : require('../../res/images/assets/icon_control_play.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                <Slider
                  style={{ flex: 1 }}
                  maximumTrackTintColor={'#999999'}
                  minimumTrackTintColor={'#00c06d'}
                  thumbImage={require('../../res/images/assets/icon_control_slider.png')}
                  value={this.state.currentTime}
                  minimumValue={0}
                  maximumValue={this.state.duration}
                  onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                />
                <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                  <Image
                    style={styles.shrinkControl}
                    source={this.state.isFullScreen ? require('../../res/images/assets/icon_control_shrink_screen.png') : require('../../res/images/assets/icon_control_full_screen.png')}
                  />
                </TouchableOpacity>
              </View> : null
          }

        </View>

        {/* 标题等 */}
        <View style={{ width: "100%", height: 175, marginTop: 10 }}>
          <View style={{ flexDirection: "row", marginLeft: 10, }}>
            <View style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}>
              <Image source={{ uri: this.state.biliData.biliPicture }}
                style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}></Image>

            </View>
            <View style={{ flexDirection: 'column', marginLeft: 10, marginRight: 340 }}>
              <Text style={{ fontSize: 15 }}>{this.state.biliData.userName}</Text>
              <Text style={{ fontSize: 10, color: '#ADADAD' }}>{this.state.biliData.userFans}粉丝</Text>
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
            <Text style={{ fontSize: 10, marginLeft: 5 }}>{this.state.biliData.biliAmountOfPlay}</Text>
            <Image style={{ width: 12, height: 12, marginLeft: 15 }} source={require('../../res/images/videopic/ic_danmu.png')}></Image>
            <Text style={{ fontSize: 10, marginLeft: 10 }}>{this.state.biliData.biliAirplay}</Text>
            {/* 关注被顶到看不见 */}
            <Text style={{ fontSize: 10, marginLeft: 20 }}>{this.state.biliData.gmtCreate}{/*xx小时前*/}</Text>
            <View style={{ height: 17, marginLeft: 240 }}>
              <Text style={{ position: "absolute", right: 10 }}>未经作者授权禁止转载</Text>
            </View>
          </View>
          <Text style={{ flexDirection: 'column', marginLeft: 10, }}> {this.state.biliData.biliBriefIntroduction}</Text>

        </View>


      </View >
    );
  }


  /// -------Video组件回调事件-------

  _onLoadStart = () => {
    console.log('视频开始加载');
  };

  _onBuffering = () => {
    console.log('视频缓冲中...')
  };

  _onLoaded = (data) => {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    });
  };

  _onProgressChanged = (data) => {
    console.log('视频进度更新');
    if (this.state.isPlaying) {
      this.setState({
        currentTime: data.currentTime,
      })
    }
  };

  _onPlayEnd = () => {
    console.log('视频播放结束');
    this.setState({
      currentTime: 0,
      isPlaying: false,
      playFromBeginning: true
    });
  };

  _onPlayError = () => {
    console.log('视频播放失败');
  };

  ///-------控件点击事件-------

  /// 控制播放器工具栏的显示和隐藏
  hideControl() {
    if (this.state.showVideoControl) {
      this.setState({
        showVideoControl: false,
      })
    } else {
      this.setState(
        {
          showVideoControl: true,
        },
        // 5秒后自动隐藏工具栏
        () => {
          setTimeout(
            () => {
              this.setState({
                showVideoControl: false
              })
            }, 5000
          )
        }
      )
    }
  }

  /// 点击了播放器正中间的播放按钮
  onPressPlayButton() {
    let isPlay = !this.state.isPlaying;
    this.setState({
      isPlaying: isPlay,
      showVideoCover: false
    });
    if (this.state.playFromBeginning) {
      this.videoPlayer.seek(0);
      this.setState({
        playFromBeginning: false,
      })
    }
  }

  /// 点击了工具栏上的播放按钮
  onControlPlayPress() {
    this.onPressPlayButton();
  }

  /// 点击了工具栏上的全屏按钮
  onControlShrinkPress() {
    if (this.state.isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  }

  /// 进度条值改变
  onSliderValueChanged(currentTime) {
    this.videoPlayer.seek(currentTime);
    if (this.state.isPlaying) {
      this.setState({
        currentTime: currentTime
      })
    } else {
      this.setState({
        currentTime: currentTime,
        isPlaying: true,
        showVideoCover: false
      })
    }
  }

  /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
  _onLayout = (event) => {
    //获取根View的宽高
    let { width, height } = event.nativeEvent.layout;
    console.log('通过onLayout得到的宽度：' + width);
    console.log('通过onLayout得到的高度：' + height);

    // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
    let isLandscape = (width > height);
    if (isLandscape) {
      this.setState({
        videoWidth: width,
        videoHeight: height,
        isFullScreen: true,
      })
    } else {
      this.setState({
        videoWidth: width,
        videoHeight: width * 9 / 16,
        isFullScreen: false,
      })
    }
    Orientation.unlockAllOrientations();
  };

  /// -------外部调用事件方法-------

  ///播放视频，提供给外部调用
  playVideo() {
    this.setState({
      isPlaying: true,
      showVideoCover: false
    })
  }

  /// 暂停播放，提供给外部调用
  pauseVideo() {
    this.setState({
      isPlaying: false,
    })
  }

  /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
  switchVideo(videoURL, seekTime) {
    this.setState({
      videoUrl: videoURL,
      currentTime: seekTime,
      isPlaying: true,
      showVideoCover: false
    });
    this.videoPlayer.seek(seekTime);
  }
  _pressButton() {
    const { navigator } = this.props;
    if (navigator) {
      //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
      navigator.pop();
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  playButton: {
    width: 50,
    height: 50,
  },
  playControl: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  shrinkControl: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  time: {
    fontSize: 12,
    color: 'white',
    marginLeft: 10,
    marginRight: 10
  },
  control: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
});
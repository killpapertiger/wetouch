//腾讯小游戏支持包
import './js/libs/weapp-adapter'
import './js/libs/symbol'

/*
 *
 *@module 微信屏幕监听 客户端调用示例
 *@author 谢飞
 *@email 342752420@qq.com
 *
 */
(function(){
  let ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  var WETOUCH = require('./js/libs/wetouch.js')
  var WETO = new WETOUCH.TouchOperation(point, press, swipe, pinch, glid, pressAndSwipe, other);
  wx.showToast({ title: '请操作屏幕', icon: 'none', duration: 12000 });
  //点击
  function point(e) {
    console.log("point", e);
    wx.showToast({ title: '点击', icon: 'none', duration: 500 });
  }

  //按压
  function press(e) {
    console.log("press", e);
    wx.showToast({ title: '按压', icon: 'none', duration: 500 });
  }

  //滑动
  function swipe(e) {
    console.log("swipe", e);
    wx.showToast({ title: '滑动', icon: 'none', duration: 500 });
  }

  //捏
  function pinch(e){
    console.log("pinch", e);
    wx.showToast({ title: '捏', icon: 'none', duration: 500 });
  }

  //双指滑移
  function glid(e) {
    console.log("glid", e);
    wx.showToast({ title: '双指滑移', icon: 'none', duration: 500 });
  }

  //按压后滑动
  function pressAndSwipe(e) {
    console.log("pressAndSwipe", e);
    wx.showToast({ title: '按压后滑动', icon: 'none', duration: 500 });
  }

  //其它
  function other(e){
    console.log("other", e);
    wx.showToast({ title: '三指操作', icon: 'none', duration: 500 });
  }

  //微信小游戏的触摸监听
  //一律把触摸事件传递给WETO去处理即可
  wx.onTouchStart(function callback(e) {
    //console.log("onTouchStart", e);
    WETO.operate(e);
  });

  wx.onTouchMove(function callback(e) {
    //console.log("onTouchMove", e);
    WETO.operate(e);
  });

  wx.onTouchEnd(function callback(e) {
    //console.log("onTouchEnd", e);
    WETO.operate(e);
  });


  //模拟微信触屏
  //为了方便调试，以下函数向模拟器发送虚拟的触屏事件
  //微信开发工具的真机调试实在太难用了，这样可以不用真机进行调试

  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var centerX = screenWidth / 2;
  var centerY = screenHeight / 2;
  var touchX = centerX + 0.3 * centerX;
  var touchY = centerY + 0.3 * centerY;
  var swipeX = touchX;
  var swipeY = touchY - 0.5 * touchY;

  //调试哪个就开哪个
  //testPoint();
  //testPress();
  //testSwipe();
  //testPinch1();
  //testPinch2();
  //testGlid();
  //testPressAndSwipe();

  function testPoint() {
    var e = { "touches": [{ "pageX": touchX, "pageY": touchY }], "type": "touchstart", "timeStamp": 0 };
    WETO.operate(e);
    var e = { "changedTouches": [{ "pageX": touchX, "pageY": touchY }], "type": "touchend", "timeStamp": 10 };
    WETO.operate(e);
  }

  function testPress() {
    var e = { "touches": [{ "pageX": touchX, "pageY": touchY }], "type": "touchstart", "timeStamp": 0 };
    WETO.operate(e);    
    var e = { "changedTouches": [{ "pageX": touchX, "pageY": touchY }], "type": "touchend", "timeStamp": 1000 };
    setTimeout(function(){ WETO.operate(e);}, 1000);
  }

  function testSwipe() {
    var e = { "touches": [{ "pageX": touchX, "pageY": touchY }], "type": "touchstart", "timeStamp": 0 };
    WETO.operate(e);
    var e = { "changedTouches": [{ "pageX": swipeX, "pageY": swipeY }], "type": "touchmove", "timeStamp": 100 };
    WETO.operate(e);
  }

  function testPinch1() {
    var e = { "touches": [{ "pageX": touchX, "pageY": centerY - 0.9 * centerY }, { "pageX": centerX + 0.1 * centerX, "pageY": centerY + 0.9 * centerY }], "type": "touchstart", "timeStamp": 0 };
    WETO.operate(e);
    var e = { "changedTouches": [{ "pageX": touchX, "pageY": centerY - 0.1 * centerY }, { "pageX": centerX + 0.1 * centerX, "pageY": centerY + 0.1 * centerY }], "type": "touchmove", "timeStamp": 100 };
    WETO.operate(e);
  }

  function testPinch2() {
    var e = { "touches": [{ "pageX": touchX, "pageY": centerY - 0.1 * centerY }, { "pageX": centerX + 0.1 * centerX, "pageY": centerY + 0.1 * centerY }], "type": "touchstart", "timeStamp": 0 };
    WETO.operate(e);
    var e = { "changedTouches": [{ "pageX": touchX, "pageY": centerY - 0.9 * centerY }, { "pageX": centerX + 0.1 * centerX, "pageY": centerY + 0.9 * centerY }], "type": "touchmove", "timeStamp": 100 };
    WETO.operate(e);
  }

  function testGlid() {
    var e = { "touches": [{ "pageX": touchX, "pageY": centerY - 0.9 * centerY }, { "pageX": touchX + 0.1 * centerX, "pageY": centerY - 0.9 * centerY }], "type": "touchstart", "timeStamp": 0 };
    WETO.operate(e);
    var e = { "changedTouches": [{ "pageX": touchX, "pageY": centerY + 0.9 * centerY }, { "pageX": touchX + 0.1 * centerX, "pageY": centerY + 0.9 * centerY }], "type": "touchmove", "timeStamp": 100 };
    WETO.operate(e);
    var e = { "changedTouches": [{ "pageX": touchX, "pageY": centerY + 0.9 * centerY }, { "pageX": touchX + 0.1 * centerX, "pageY": centerY + 0.9 * centerY }], "type": "touchend", "timeStamp": 100 };
    WETO.operate(e);
  }

  function testPressAndSwipe() {
    var e = { "touches": [{ "pageX": touchX, "pageY": touchY }], "type": "touchstart", "timeStamp": 0 };
    WETO.operate(e);
    var e = { "changedTouches": [{ "pageX": swipeX, "pageY": swipeY }], "type": "touchmove", "timeStamp": 4000 };
    var end = { "changedTouches": [{ "pageX": swipeX, "pageY": swipeY }], "type": "touchend", "timeStamp": 4800 };
    function press(){      
      WETO.operate(e);      
      WETO.operate(end);
    }
    setTimeout(press, 1000);
  }
})()


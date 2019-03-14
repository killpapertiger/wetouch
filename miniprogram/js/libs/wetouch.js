(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = global || self, factory(global.WETOUCH = {}));
}(this, function (exports) {
  'use strict';

  /**
	 * @class Vector2
	 * @description 二维向量
	 * @author xiefeisd / 342752420@qq.com
	 */

  class Vector2 {

    constructor(x, y, z) {
      this.x = x || 0;
      this.y = y || 0;
    };

    dot(vector) {
      var x = this.x * vector.x;
      var y = this.y * vector.y;
      var result = x + y;
      return result;
    };

    multiplyScalar(s) {
      var x = this.x * s;
      var y = this.y * s;
      return new Vector2(x, y);
    };

    add(vector) {
      var x = this.x + vector.x;
      var y = this.y + vector.y;
      return new Vector2(x, y);
    };

    subtract(vector) {
      var x = this.x - vector.x;
      var y = this.y - vector.y;
      return new Vector2(x, y);
    };

    multiply(vector) {
      var x = this.y * vector.z - this.z * vector.y;
      var y = this.z * vector.x - this.x * vector.z;
      return new Vector2(x, y);
    };

    reverse() {
      var x = -this.x;
      var y = -this.y;
      return new Vector2(x, y);
    };

    length() {
      return Math.sqrt(this.lengthSquare());
    };

    lengthSquare() {
      return this.x ** 2 + this.y ** 2;
    };

    normalize() {
      var len = this.length();
      if (len) {
        var x = this.x / len;
        var y = this.y / len;
      }
      return new Vector2(x, y);
    };

    compare(vector) {
      return this.length() > vector.length();
    };

    rotate(angle) {
      var length = this.length();
      var angle0 = this.angle();
      var totalAngle = angle0 + angle;
      var sin = Math.sin(totalAngle);
      var cos = Math.cos(totalAngle);
      var x = length * cos;
      var y = length * sin;
      return new Vector2(x, y);
    };

    angle() {
      var tan = this.y / this.x;
      var ang = Math.atan(tan);
      return ang;
    };

    angleWith(vector) {
      var ang1 = this.angle();
      var ang2 = vector.angle();
      var ang = ang1 - ang2;
      return ang;
    };

    toString() {
      return '( ' + this.x.toFixed(3) + ' , ' + this.y.toFixed(3)  + ' )';
    };

  }

  /**
   * @class Touches
	 * @description 存储触摸事件，并提供查询操作
	 * @author xiefeisd / 342752420@qq.com
	 */

  class Touches{
    constructor(){ 
      this.touches = [];
    }

    //返回触摸事件的总条数
    length() { return this.touches.length; }

    //返回某条触摸事件的点数
    touchLength(touches) { return touches.length; }

    //返回触摸事件的类型
    getTouchType(touch) { return touch.type;  }
    //判断touch的类型
    isStart(touch) { return "touchstart" == touch.type; }
    isMove(touch) { return "touchmove" == touch.type; }
    isEnd(touch) { return "touchend" == touch.type; }

    pushTouch(touch){ this.touches.push(touch); } //压入
    clearTouches(){ this.touches = []; } //清除
    getFirstTouch(){ return this.touches[0] } //第一个
    getLastTouch(){ return this.touches[this.touches.length - 1]; } //最后一个

    //第一个，按类型
    getFirstStart() { return this.getFirstStartByType("touchstart"); }
    getFirstMove() { return this.getFirstStartByType("touchmove"); }
    getFirstEnd() { return this.getFirstStartByType("touchend"); }
    getFirstStartByType(type) {
      for (var i = 0; i < this.touches.length; i++) {
        var touch = this.touches[i];
        if (type == this.getTouchType(touch)) { return touch; }
      }
      return false;
    }

    //最后一个，按类型
    getLastStart() { return this.getLastStartByType("touchstart"); }
    getLastMove() { return this.getLastStartByType("touchmove"); }
    getLastEnd() { return this.getLastStartByType("touchend"); }
    getLastStartByType(type){
      for(var i=this.touches.length-1; i>=0; i--){
        var touch = this.touches[i];
        if (type == this.getTouchType(touch)){ return touch; }
      }
      return false;
    }

    //获取存在的touches
    getTouches(touch) {
      if (this.isStart(touch)) {
        return touch.touches;
      } else {
        return touch.changedTouches;
      }
    }

    getDistances(touch){
      var lastTouch = this.getLastTouch();      
      var lastTouches = this.getTouches(lastTouch);
      var touches = this.getTouches(touch);
      var lastLength = lastTouches.length;
      var length = touches.length;      
      var minLength = Math.min(length, lastLength);
      var distances = [];
      for (var i = 0; i < minLength; i++) {
        var x1 = lastTouches[i].pageX;
        var y1 = lastTouches[i].pageY;
        var x2 = touches[i].pageX;
        var y2 = touches[i].pageY;
        var distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        distances.push(distance);
      }
      return distances;
    }

    getTimeLength(touch){
      var lastTouch = this.getLastTouch();
      var start = lastTouch.timeStamp;
      var end = touch.timeStamp;
      var length = end - start;
      return length;
    }

    getAngle(touch){
      var lastTouch = this.getLastTouch();
      var lastTouches = this.getTouches(lastTouch);
      var touches = this.getTouches(touch);
      var aFingerX1 = lastTouches[0].pageX;
      var aFingerY1 = lastTouches[0].pageY;
      var aFingerX2 = touches[0].pageX;
      var aFingerY2 = touches[0].pageY;
      var bFingerX1 = lastTouches[1].pageX;
      var bFingerY1 = lastTouches[1].pageY;
      var bFingerX2 = touches[1].pageX;
      var bFingerY2 = touches[1].pageY;
      var vec1 = new Vector2(aFingerX2 - aFingerX1, aFingerY2 - aFingerY1);
      var vec2 = new Vector2(bFingerX2 - bFingerX1, bFingerY2 - bFingerY1);
      var angle = vec1.angleWith(vec2) / Math.PI * 180;
      return angle;
    }
  }

  /**
   * @class Lock
	 * @description 操作锁
	 * @author xiefeisd / 342752420@qq.com
	 */

  class Lock {
    constructor(){
      this.state = null; // doing done
      this.operate = null; // point press swipe pinch glid pressAndSwipe other
      this.touch = null;
    }
    
    setLock(state, operate, touch){
      this.state = state; 
      this.operate = operate;
      this.touch = touch;
    }

    unlock(){
      this.state = null;
      this.operate = null;
      this.touch = null;
    }

    isPointing(){ return ("doing"==this.state && "point"==this.operate); }
    isPressing() { return ("doing" == this.state && "press" == this.operate); }
    isSwiping() { return ("doing" == this.state && "swipe" == this.operate); }
    isPinching() { return ("doing" == this.state && "pinch" == this.operate); }
    isGliding() { return ("doing" == this.state && "glid" == this.operate); }
    isOthering() { return ("doing" == this.state && "other" == this.operate); }
    isPressAndSwiping() { return ("doing" == this.state && "pressAndSwipe" == this.operate); }

    isPointed() { return ("done" == this.state && "point" == this.operate); }
    isPressed() { return ("done" == this.state && "press" == this.operate); }
    isSwiped() { return ("done" == this.state && "swipe" == this.operate); }
    isPinched() { return ("done" == this.state && "pinch" == this.operate); }
    isGlided() { return ("done" == this.state && "glid" == this.operate); }
    isOthered() { return ("done" == this.state && "other" == this.operate); }
    isPressAndSwiped() { return ("done" == this.state && "pressAndSwipe" == this.operate); }

    isDoing(){ return "doing" == this.state; }
    isDone(){ "done" == this.state; }
  }

  /**
   * @class TouchOperation
	 * @description 触摸操作，把微信提供的触摸接口封装成触摸动作
	 * @author xiefeisd / 342752420@qq.com
	 */

  class TouchOperation{
    
    constructor(point, press, swipe, pinch, glid, pressAndSwipe, other) {
      //回call函数
      this.point = point || {};
      this.press = press || {};
      this.swipe = swipe || {};
      this.pinch = pinch || {};
      this.glid = glid || {};
      this.pressAndSwipe = pressAndSwipe || {};
      this.other = other || {};
      this.distanceSensitivity = 5;
      this.pinchAndGlidSensitivity = 5;
      this.timeSensitivity = 0;
      this.pressMinTime = 300;
      this.swipeMinLength = 100;
      this.pichMinAngle = 5; 
      this.timer;
      this.currentTouch;

      //动作记录
      this.touches = new Touches();

      //操作锁
      this.lock = new Lock();
    }

    //设置回call函数
    setPoint(calback) { this.point = callback; }
    setPress(calback) { this.press = callback; }
    setSwipe(calback) { this.swipe = callback; }
    setPinch(calback) { this.pinch = callback; }
    setGlid(calback) { this.glid = callback; }
    setPressAndSwipe(calback) { this.pressAndSwipe = callback; }
    setOther(calback) { this.other = callback; }

    //返回触摸事件的类型
    getTouchType(touch) { return touch.type; }
    //判断touch的类型
    isStart(touch) { return "touchstart" == touch.type; }
    isMove(touch) { return "touchmove" == touch.type; }
    isEnd(touch) { return "touchend" == touch.type; }

    //总处理
    operate(touch){
      this.currentTouch = touch;
      var touchesCount = this.getTouches(touch).length;
      var touchType = touch.type;
      var result = true;
      if (touchesCount >= 3){ //3个以上触摸点
        //other
        this.other(touch);
        this.lock.setLock("done", "other", touch);
        this.touches.clearTouches();
      } else if (2 == touchesCount){ //2个触摸点
        // pinch glid
        var result = this.operate2Points(touch);
      } else if (1 == touchesCount){ //1个触摸点
        // point press swipe pressAndSwipe
        var result = this.operate1Point(touch);
      }
      if(result){
        this.touches.pushTouch(touch);
      }
    }

    //获取存在的touches
    getTouches(touch){
      if (this.isStart(touch)) {
        return touch.touches;
      } else {
        return touch.changedTouches;
      }
    }
    
   //1个触摸点
    operate1Point(touch){
      if (this.isStart(touch)){
        //doing锁
        this.lock.setLock("doing", "point", touch);
        //设置定时器
        //定时器在真机环境会出错，不用定时器
        //this.timer = setTimeout(function(lock){ lock.setLock("doing", "press", lock.touch); }, 600, this.lock);
      }else if (this.isMove(touch)) { //move
        //swipe pressAndSwipe
        
        //上一个是多点，认为是手指不同步，抛弃之
        var lastTouch = this.touches.getLastTouch();
        var lastTouchesCount = this.getTouches(lastTouch).length;
        if (lastTouchesCount >1) { return false; }

        //距离太短，认为是手指颤动，抛弃之
        if (this.touches.getDistances(touch)[0] < this.sensitivity) { 
          //由于定时器不能用，利用手指的轻微颤动提前确认press
          var lastStart = this.touches.getLastStart();
          var timeLength = touch.timeStamp - lastStart.timeStamp;          
          if (timeLength > this.pressMinTime) {
            //压
            var touches = this.getTouches(lastStart);
            var x = touches[0].pageX;
            var y = touches[0].pageY;
            this.press({ "x": x, "y": y, "time": timeLength });
            //done锁
            this.lock.setLock("done", "press", touch);
            this.touches.clearTouches();
          }
          return false; //通知主循环，抛弃touch
        }

        //发生有效滑动检查锁
        if (this.lock.isPointing()){
          var lastStart = this.touches.getLastStart();
          var timeLength = touch.timeStamp - lastStart.timeStamp;
          if (timeLength > this.pressMinTime) {
            this.lock.setLock("doing", "press", touch);
          }
        }
        if(this.lock.isPressing()) { //是pressing锁，触发PressAndSwiping
          this.lock.setLock("doing", "pressAndSwipe", touch);
        }else if (this.lock.isPointing()) { //是pointing锁，触发swiping
          //clearTimeout(this.timer);
          this.lock.setLock("doing", "swipe", touch);
        }
        
        if (this.lock.isSwiping()) { //是Swiping锁，处理swipe
          var lastTouch = this.touches.getLastTouch();
          var lastTouches = this.getTouches(lastTouch);
          var touches = this.getTouches(touch);
          var x1 = lastTouches[0].pageX;
          var y1 = lastTouches[0].pageY;
          var x2 = touches[0].pageX;
          var y2 = touches[0].pageY;
          var timeLength = touch.timeStamp - lastTouch.timeStamp;
          this.swipe({ "start": { "x": x1, "y": y1 }, "end": { "x": x2, "y": y2 }, "time": timeLength });
          this.lock.setLock("doing", "swipe", touch);
          this.touches.clearTouches();
        }
      } else if (this.isEnd(touch)) { //end
        //point press swipe pressAndSwipe        
        //检查锁
        if (this.lock.isPointing()) { //pointing
          //取消定时器
          //clearTimeout(this.timer);
          var lastStart = this.touches.getLastStart();
          var timeLength = touch.timeStamp - lastStart.timeStamp;
          var touches = this.getTouches(lastStart);
          console.log("touch", lastStart, this.touches);
          var x = touches[0].pageX;
          var y = touches[0].pageY;
          if (timeLength < this.pressMinTime ){
            //点
            this.point({ "x": x, "y": y });
            //done锁
            this.lock.setLock("done", "point", touch);
            this.touches.clearTouches();
          }else{
            //压
            this.press({ "x": x, "y": y, "time": timeLength });
            //done锁
            this.lock.setLock("done", "press", touch);
            this.touches.clearTouches();
          }
        } else if (this.lock.isPressing()) { //pressing
          //压
          var touches = this.getTouches(touch);
          var x = touches[0].pageX;
          var y = touches[0].pageY;
          var timeLength = touch.timeStamp - this.lock.touch.timeStamp;
          this.press({ "x": x, "y": y, "time": timeLength });
          //done锁
          this.lock.setLock("done", "press", touch);
          this.touches.clearTouches();
        } else if (this.lock.isSwiping()) { //swiping
          //done锁
          this.lock.setLock("done", "swipe", touch);
          this.touches.clearTouches();
        } else if (this.lock.isPressAndSwiping()) { //pressAndSwiping
          var pressStart = this.touches.getLastStart();
          var swipeStart = this.lock.touch;
          var swipeEnd = touch;
          var pressStartTouches = this.getTouches(pressStart);
          var swipeEndTouches = this.getTouches(swipeEnd);
          var x1 = pressStartTouches[0].pageX;
          var y1 = pressStartTouches[0].pageY;
          var x2 = swipeEndTouches[0].pageX;
          var y2 = swipeEndTouches[0].pageY;
          var distance = Math.sqrt( (x2-x1)**2 + (y2-y1)**2 );
          var pressTime = swipeStart.timeStamp - pressStart.timeStamp;
          var swipeTime = swipeEnd.timeStamp;
          if (distance > this.swipeMinLength) {
            // 长按后滑动
            this.pressAndSwipe({ "start": { "x": x1, "y": y1 }, "end": { "x": x2, "y": y2 }, "presstime": pressTime, "swipetime": swipeTime });
            //设置锁
            this.lock.setLock("done", "pressAndSwipe", touch);
            this.touches.clearTouches();
          } else {
            //压
            this.press({ "x": x1, "y": y1, "time": pressTime });
            //设置锁
            this.lock.setLock("done", "press", touch);
            this.touches.clearTouches();
          }
        }
      }
      return true;
    }

    //2个触摸点
    operate2Points(touch) {
      if (this.isMove(touch)) { //move
        //距离太短，认为是手指颤动，抛弃之
        var lastTouch = this.touches.getLastTouch();
        var lastTouches = this.getTouches(lastTouch);
        var touches = this.getTouches(touch);
        if (lastTouches.length < 2) { return false; }

        var aFingerX1 = lastTouches[0].pageX;
        var aFingerY1 = lastTouches[0].pageY;
        var aFingerX2 = touches[0].pageX;
        var aFingerY2 = touches[0].pageY;
        var bFingerX1 = lastTouches[1].pageX;
        var bFingerY1 = lastTouches[1].pageY;
        var bFingerX2 = touches[1].pageX;
        var bFingerY2 = touches[1].pageY;

        var vec1 = new Vector2(aFingerX2 - aFingerX1, aFingerY2 - aFingerY1);
        var vec2 = new Vector2(bFingerX2 - bFingerX1, bFingerY2 - bFingerY1);

        var length1 = vec1.length();
        var length2 = vec2.length();        
        if ( (length1 < this.pinchAndGlidSensitivity) && (length2 < this.pinchAndGlidSensitivity) ) {
          return false; //通知主循环，抛弃touch
        }

        var points = [
          { "start": { "x": aFingerX1, "y": aFingerY1 }, "end": { "x": aFingerX2, "y": aFingerY2 } },
          { "start": { "x": bFingerX1, "y": bFingerY1 }, "end": { "x": bFingerX2, "y": bFingerY2 } }
        ];
        var angle = vec1.angleWith(vec2) / Math.PI * 180;
        var timeLength = this.touches.getTimeLength(touch);
        if (Math.abs(angle) > this.pichMinAngle) { //夹角大
          //pinch
          var allow = true;
          //检查锁
          if (this.lock.isGliding()) { allow = false; }
          else if (this.lock.isGlided()) {
            if (timeLength < 100) { allow = false; }
          }
          //允许操作
          if (true) {
            //设置doing锁
            this.lock.setLock("doing", "pinch", touch);
            //执行操作
            this.pinch({ "points": points, "time": timeLength });
          }
        } else { //夹角小
          //glid
          var allow = true;
          //检查锁
          if (this.lock.isPinching()) { allow = false; }
          else if (this.lock.isPinched()) {
            if (timeLength < 100) { allow = false; }
          }
          //允许操作
          if (true) {
            //设置doing锁
            this.lock.setLock("doing", "glid", touch);
            //执行操作
            this.glid({ "points": points, "time": timeLength });
          }
        }
      } else if (this.isEnd(touch)) { //end
        //设置done锁
        if (this.lock.isPinching()) {
          this.lock.setLock("done", "pinch", touch);
          this.touches.clearTouches();
        } else if (this.lock.isGliding()) {
          this.lock.setLock("done", "glid", touch);
          this.touches.clearTouches();
        }
      }
      return true;
    }

  }

  exports.TouchOperation = TouchOperation;
  exports.Vector2 = Vector2;
  console.log("wetouch is loaded.");
}));
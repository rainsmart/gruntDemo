function createPicMove(a, b, c, d) {
    var g = function(j) {
        return "string" == typeof j ? document.getElementById(j) : j
    };
    var d = function(j, l) {
        for (var k in l) {
            j[k] = l[k]
        }
        return j
    };
    var f = function(j) {
        return j.currentStyle || document.defaultView.getComputedStyle(j, null)
    };
    var i = function(l, j) {
        var k = Array.prototype.slice.call(arguments).slice(2);
        return function() {
            return j.apply(l, k.concat(Array.prototype.slice.call(arguments)))
        }
    };
    var e = {Quart: {easeOut: function(k, j, m, l) {
                return -m * ((k = k / l - 1) * k * k * k - 1) + j
            }},Back: {easeOut: function(k, j, n, m, l) {
                if (l == undefined) {
                    l = 1.70158
                }
                return n * ((k = k / m - 1) * k * ((l + 1) * k + l) + 1) + j
            }},Bounce: {easeOut: function(k, j, m, l) {
                if ((k /= l) < (1 / 2.75)) {
                    return m * (7.5625 * k * k) + j
                } else {
                    if (k < (2 / 2.75)) {
                        return m * (7.5625 * (k -= (1.5 / 2.75)) * k + 0.75) + j
                    } else {
                        if (k < (2.5 / 2.75)) {
                            return m * (7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375) + j
                        } else {
                            return m * (7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375) + j
                        }
                    }
                }
            }}};
    var h = function(k, n, m, l) {
        this._slider = g(n);
        this._container = g(k);
        this._timer = null;
        this._count = Math.abs(m);
        this._target = 0;
        this._t = this._b = this._c = 0;
        this.Index = 0;
        this.SetOptions(l);
        this.Auto = !!this.options.Auto;
        this.Duration = Math.abs(this.options.Duration);
        this.Time = Math.abs(this.options.Time);
        this.Pause = Math.abs(this.options.Pause);
        this.Tween = this.options.Tween;
        this.onStart = this.options.onStart;
        this.onFinish = this.options.onFinish;
        var j = !!this.options.Vertical;
        this._css = j ? "top" : "left";
        var o = f(this._container).position;
        o == "relative" || o == "absolute" || (this._container.style.position = "relative");
        this._container.style.overflow = "hidden";
        this._slider.style.position = "relative";
        this.Change = this.options.Change ? this.options.Change : this._slider[j ? "offsetHeight" : "offsetWidth"] / this._count
    };
    h.prototype = {SetOptions: function(j) {
            this.options = {Vertical: false,Auto: true,Change: 0,Duration: 50,Time: 10,Pause: 4000,onStart: function() {
                },onFinish: function() {
                },Tween: e.Quart.easeOut};
            d(this.options, j || {})
        },Run: function(j) {
            j == undefined && (j = this.Index);
            j < 0 && (j = this._count - 1) || j >= this._count && (j = 0);
            this._target = -Math.abs(this.Change) * (this.Index = j);
            this._t = 0;
            this._b = parseInt(f(this._slider)[this.options.Vertical ? "top" : "left"]);
            this._c = this._target - this._b;
            this.onStart();
            this.Move()
        },Move: function() {
            clearTimeout(this._timer);
            if (this._c && this._t < this.Duration) {
                this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
                this._timer = setTimeout(i(this, this.Move), this.Time)
            } else {
                this.MoveTo(this._target);
                this.Auto && (this._timer = setTimeout(i(this, this.Next), this.Pause))
            }
        },MoveTo: function(j) {
            this._slider.style[this._css] = j + "px"
        },Next: function() {
            this.Run(++this.Index)
        },Previous: function() {
            this.Run(--this.Index)
        },Back: function(){
            this.Run(this.Index)
        },Stop: function() {
            clearTimeout(this._timer);
            this.MoveTo(this._target)
        }};
    return new h(a, b, c, d)
}

function Slider(options) {
    // 默认属性
    this.auto = 0;
    this.speed = 300;
    this.continuous = true;
    this.slides = null;
    this.width = 0;
    this._initX = 0;
    this._finishX = 0;
    this._startX = 0;
    this._startY = 0;

    this.init(options);
}

Slider.prototype.init = function(options) {
    var t = this;
    //继承属性
    $.extend(this, options);
    this.callback = options.callback || function(){};

    if (!this.main) {
        return;
    }
    // 轮播图数目
    this.picNum = $("#" + this.ul).find(this.dom).length ;
    this.width = $("#" + this.main).width();
    // 设置宽度
    $("#" + this.ul).css({'width':this.width*this.picNum + 'px'});
    $("#" + this.ul).find(this.dom).css('width',this.width + 'px');

    // 设置移动
    this.st = createPicMove(this.main, this.ul, this.picNum, options);
    this.st.Run();
    this.st.onStart = function(){
        t.callback(t.st.Index);
    }

    // 添加事件
    this.addEvent();
}
Slider.prototype.dispose = function(){
    this.removeEvent();
    this.st.Stop();
}
Slider.prototype.touchStart = function(event) {
    this._startX = event.touches[0].clientX;
    this._startY = event.touches[0].clientY;
    this._initX = this._startX;
}
Slider.prototype.touchMove = function(event) {
    var touches = event.touches;
    var _endX = event.touches[0].clientX;
    var _endY = event.touches[0].clientY;
    if(Math.abs(_endY-this._startY)>Math.abs(_endX-this._startX)){
        return;     
    }
    event.preventDefault();
    this._finishX = _endX;
    var _absX = Math.abs(_endX-this._startX);
    var lastX = $('#' + this.ul).css('left').replace('px','');
    if(this._startX>_endX){
        this.st.Stop();
        $("#" + this.ul).css('left',(parseInt(lastX)-_absX)+'px');
    }else{
        this.st.Stop();
        $("#" + this.ul).css('left',(parseInt(lastX)+_absX)+'px');
    } 
    this._startX = _endX;
}
//触屏  离开屏幕事件
Slider.prototype.touchEnd = function(event) {
    if(this._finishX==0){
        return;
    }
    if(this._initX>this._finishX){
        this.bindEvent(this._initX,this._finishX);
    }else if(this._initX<this._finishX){
        this.bindEvent(this._initX,this._finishX);
    }
    this._initX = 0;
    this._finishX = 0;
}
/**
 *  绑定触屏触发事件
 * @param start
 * @param end
 */
Slider.prototype.bindEvent = function(start,end){
    if(Math.abs(start - end) < 20){
        this.st.Back();
    }else if (start >= end) {
       this.st.Next();
    } else {
       this.st.Previous();
    }
}
Slider.prototype.addEvent = function(){
    var t = this,
        e = $("#" + t.main);
    e.on('touchstart',function(event){
        t.touchStart(event);
    },false);
    e.on('touchmove',function(event){
        t.touchMove(event);
    },false);
    e.on('touchend',function(event){
        t.touchEnd(event);
    },false);
}
Slider.prototype.removeEvent = function(){
    var t = this,
        e = $("#" + t.main);
    e.off('touchstart');
    e.off('touchmove');
    e.off('touchend');
}

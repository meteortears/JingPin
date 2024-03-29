// JavaScript Document

/**
 * @name		:initMap
 * @author	:Nice
 * @version	:
 * @explain	:
 */
//创建和初始化地图函数：
function initMap() {
    createMap(); //创建地图
    setMapEvent(); //设置地图事件
    addMapControl(); //向地图添加控件
    addMarker(); //向地图中添加marker
}

//创建地图函数：
function createMap() {
    var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
    var point = new BMap.Point(113.299183, 23.066909); //定义一个中心点坐标
    map.centerAndZoom(point, 16); //设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map; //将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent() {
    map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
    map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard(); //启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    map.addControl(ctrl_nav);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT
    });
    map.addControl(ctrl_sca);
}

//标注点数组
var markerArr = [{
    title: "广州晶品服装辅料有限公司",
    content: "广州市海珠区工业大道南大干围路38号&nbsp;海珠创意产业园",
    point: "113.298114|23.066227",
    isOpen: 1,
    icon: {
        w: 23,
        h: 25,
        l: 46,
        t: 21,
        x: 9,
        lb: 12
    }
}];
//创建marker
function addMarker() {
        for (var i = 0; i < markerArr.length; i++) {
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0, p1);
            var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point, {
                icon: iconImg
            });
            var iw = createInfoWindow(i);
            var label = new BMap.Label(json.title, {
                "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)
            });
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            (function() {
                var index = i;
                var _iw = createInfoWindow(i);
                var _marker = marker;
                _marker.addEventListener("click", function() {
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open", function() {
                    _marker.getLabel().hide();
                })
                _iw.addEventListener("close", function() {
                    _marker.getLabel().show();
                })
                label.addEventListener("click", function() {
                    _marker.openInfoWindow(_iw);
                })
                if (!!json.isOpen) {
                    label.hide();
                    _marker.openInfoWindow(_iw);
                }
            })()
        }
    }
    //创建InfoWindow
function createInfoWindow(i) {
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
        return iw;
    }
    //创建一个Icon
function createIcon(json) {
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w, json.h), {
        imageOffset: new BMap.Size(-json.l, -json.t),
        infoWindowOffset: new BMap.Size(json.lb + 5, 1),
        offset: new BMap.Size(json.x, json.h)
    })
    return icon;
}

//创建和初始化地图
// initMap();
/* @end **/



/**
 * @name     :scrollImg
 * @author   :Nice
 * @dependent:焦点图轮播
 *   参数 animateTime 过渡动画时间(ms)
 *        time        切换时间(ms)
 */
function scrollImg(animateTime, time) {
    var id = document.getElementById('scrollImgs');
    var wrap = $('#scrollImgs .wrap')
    var imgS = $('#scrollImgs .wrap .imgs');
    var imgSLi = $('#scrollImgs .wrap .imgs .list');

    var nav = $("#scrollImgs .nav .li");
    var navA = $("#scrollImgs .nav .li a");

    var btnL = $("#scrollImgs .wrap .btn_l");
    var btnR = $("#scrollImgs .wrap .btn_r");

    // var imgSL=$('#scrollImgs .wrap .imgs').css('left');

    GLOBAL.namespace("BANNER.MIAN");
    GLOBAL.BANNER.MIAN.l = 0;

    var obj = {
        e: navA,
        img: imgS,
        time: animateTime
    }

    var objBtn={
        btnL: btnL,
        btnR: btnR,
        time: animateTime,
        img: imgS,
        e: navA
    }

    function navBtn(event) {
        var i = event.data.e.index(this);
        GLOBAL.BANNER.MIAN.l = i;

        event.data.img.stop().animate({
            left: -i * 100 + '%'
        }, event.data.time);

        event.data.e.removeClass('hover');
        $(this).addClass('hover');

        return false;
    }


    function delay(e, n, time) {
        var i = GLOBAL.BANNER.MIAN.l = GLOBAL.BANNER.MIAN.l + 1;

        if (i >= 4) {
            i = GLOBAL.BANNER.MIAN.l = 0;
        };

        e.animate({
            left: -i * 100 + '%'
        }, time)

        n.find("a").removeClass('hover');
        $(n[i]).find("a").addClass('hover');
    }

    function btnLR(direction,time,img,e){
        if (direction=='L') {
            var i = GLOBAL.BANNER.MIAN.l = GLOBAL.BANNER.MIAN.l - 1;
           if (i <= -1) {
                i = GLOBAL.BANNER.MIAN.l = 3;
            };
        }

        if (direction=='R') {
           var i = GLOBAL.BANNER.MIAN.l = GLOBAL.BANNER.MIAN.l + 1;
           if (i >= 4) {
                i = GLOBAL.BANNER.MIAN.l = 0;
            };    
        }

        img.stop().animate({
            left: -i * 100 + '%'
        }, time);
        e.removeClass('hover');
        e.eq(i).addClass('hover');

        return false;
    }

    navA.click(obj, navBtn);

    btnL.click(function(){btnLR('L',animateTime,imgS,navA)});
    btnR.click(function(){btnLR('R',animateTime,imgS,navA)});

    setInterval(function() {
        delay(imgS, nav, animateTime)
    }, time)
}
/* @end **/



/**
* @name     :navShow
* @author   :Nice
* @dependent:导航显示隐藏
*/
function navShow(ID){
    $('#'+ID+' .ul .li').hover(function() {
        $(this).children('.sub_nav').css('display','block');
        
        function eShow(e){
            e.children('.sub_nav').animate({
                top: 40,
                opacity: 1
            }, 400)
        }

        setTimeout(eShow($(this)),100)
    }, function() {
        $(this).children('.sub_nav').animate({
            top: 0,
            opacity: 0
        }, 400)

        function eHidden(e){
            // setTimeout(function x(e){e.children('.sub_nav').css('display','none');},1000)
            e.children('.sub_nav').css('display','none');
            console.log(e);
        }


        setTimeout(eHidden($(this)),4000)
    });
}
/* @end **/




















/**
 * @name		:
 * @author	:si
 * @version	:
 * @type		:基类
 * @explain	:
 * @relating	:
 * @dependent:
 */

/* @end **/
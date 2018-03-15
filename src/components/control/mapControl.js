export default {
  map: null,
  geocoder: null,
  geolocation: null,
  option: {},
  basePoint: null,
  location: null,
  locationMarker: null,
  mapLoaded: $.Deferred(),
  initialized: $.Deferred(),
  overlay: {
    marker: null,
    markers: []
  },
  // 下载 baidu map
  loadMap() {
    if ($('#baiduMapJs').length) {
      return this.mapLoaded.promise()
    }
    var script = document.createElement("script");
    var funName = '_fun' + new Date().getTime();
    window[funName] = () => {
      this.mapLoaded.resolve();
    };
    script.onerror = () => {
      $(script).remove();
    }
    script.type = "text/javascript";
    script.id = "baiduMapJs";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=UERXzF6P42Yay5RiFp9RWobp&callback=" + funName;
    document.body.appendChild(script);

    return this.mapLoaded.promise()
  },
  // 地址解析 (string to point)
  getPoint(address, city, callback) {
    // 创建地址解析器实例
    this.geocoder = this.geocoder || new BMap.Geocoder();
    var myGeo = this.geocoder;
    var _this = this;
    myGeo.getPoint(address, function(point) {
      if (point) {
        _this.map.panTo(point, 15);
        callback && callback();
      } else {
        console.log("地址解析错误");
      }
    }, city);
  },
  // 逆地址解析 (point to string)
  getLocation(point) {
    // 创建地址解析器实例
    this.geocoder = this.geocoder || new BMap.Geocoder();

    let defer = $.Deferred()
    this.geocoder.getLocation(point, res => {
      defer.resolve(res.addressComponents)
    })
    return defer.promise()
  },
  point(lng, lat) {
    return new BMap.Point(lng, lat);
  },
  centerAt(point = this.basePoint) {
    this.map.panTo(point);
  },
  marker(point, label) {
    var icon = new BMap.Icon('http://api0.map.bdimg.com/images/marker_red_sprite.png',new BMap.Size(25,25));
    var marker = new BMap.Marker(point,{icon:icon});
    if (label) {
      marker.setLabel(label);
    }
    this.map.addOverlay(marker);
    return marker;
  },
  label(text) {
    var label = new BMap.Label(text);
    return label;
  },
  enableMarker(callback) {
    var _this = this;
    // 设置鼠标样式
    this.map.setDefaultCursor("crosshair");
    // 监听鼠标点击
    this.map.addEventListener("click", function(e) {
      var marker = _this.overlay.marker;
      if (!marker) {
        marker = _this.marker(e.point);
        marker.enableDragging();
        marker.addEventListener("dragend", function(e) {
          callback && callback(e.point);
        });
        _this.overlay.marker = marker;
      }
      marker.setPosition(e.point);
      callback && callback(e.point);
    });
  },
  clearMarkers(marker) {
    if(marker !== undefined){
      this.map.removeOverlay(marker);
      marker = null;
    }
    else{
      this.map.clearOverlays();
    }
  },
  resetMap() {
    // this.map.reset();
    var point = new BMap.Point(121.480309, 31.236367); //上海
    this.basePoint = point;
    this.map.centerAndZoom(point, 15);
  },
  // 获取定位
  locating() {
    this.geolocation = this.geolocation || new BMap.Geolocation();
    var located = $.Deferred();
    var _this = this;
    this.geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        _this.location = r.point;
        located.resolve(r.point);
      }
      else {
        located.reject();
        console.log('locating failed ' + this.getStatus());
      }
    }, {
      enableHighAccuracy: true
    });
    return located.promise();
  },
  // IP定位（城市）
  locatingIP() {
    var myCity = new BMap.LocalCity();
    var defer = $.Deferred()
	  myCity.get(function(result) {
      console.log(result);
      defer.resolve(result.name)
    });
  },
  zoomIn() {
    this.map.zoomIn();
  },
  zoomOut() {
    this.map.zoomOut();
  },
  // 渲染地图
  init(option, callback) {
    if (typeof option == 'function') {
      callback = option;
      option = {};
    }
    this.option = option || {};
    this.loadMap();
    this.mapLoaded.promise().done(() => {
      if (!this.map) {
        var map = new BMap.Map("map", {
          enableMapClick: false
        }); // 创建Map实例
        this.map = map;
        this.resetMap();
        this.map.enableScrollWheelZoom(); //启用滚轮放大缩小
        this.initialized.resolve();
      }
      callback && callback();
    })

    return this.initialized.promise()
  }
}

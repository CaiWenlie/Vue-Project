import rest from '@/rest'
import helper from '@/helper'

class PageControl {
  constructor(option) {
    var defaults = {
      xhr: null,
      loading: false,
      refreshing: false,
      hasNextPage: true,
      badNetwork: false,
      api: '',
      type: 'get',
      params: {
        pageNum: 1,
        pageSize: 10,
      },
      keyPath: ['data', 'list'],
      dataList: [],
      initialized: true
    }
    $.extend(defaults, option);
    $.extend(this,defaults);
  }

  onRefresh() {

  }
  onLoadMore() {

  }
  getParams() {
    return {};
  }
  extendParams(params = {}) {
    params = $.extend({}, this.getParams(), params);
    params = $.extend({}, this.params, params);
    return params;
  }
  getKeyPath(res) {
    var path = res;
    for (var key of this.keyPath) {
      if (path[key]) {
        path = path[key];
      }
      else {
        return [];
      }
    }
    return path || [];
  }
  request(params) {
    this.abortXHR();

    let request
    if(typeof this.api == 'string') {
      request = () => {
        return rest[this.type](this.api, params)
      }
    }
    else {
      // function
      request = this.api
    }

    params = this.extendParams(params);
    this.xhr = request(params).always((res, state) => {
      if (!res.aborted) {
        this.refreshing = false;
        this.loading = false;
      }
    });
    return this.xhr;
  }
  abortXHR() {
    if(this.loading){
      this.xhr.aborted = true;
      this.xhr.abort();
    }
  }
  refresh() {
    this.badNetwork = false;
    this.refreshing = true;
    this.request({
      pageNum: 1
    }).done(res => {
      if (helper.isSuccess(res)) {
        var data = this.getKeyPath(res);
        this.params.pageNum = 1;
        this.hasNextPage = (data.length == this.params.pageSize);
        this.dataList = data;
        // lcc
        if (res.data) {
          if (res.data.remindNum || res.data.remindNum === 0) this.remindNum = res.data.remindNum
        }
        this.onRefresh(res, data);
      }
    }).fail((res, state)=>{
      if (!res.aborted){
        this.dataList = [];
        this.badNetwork = true;
      }
    });
  }
  loadMore() {
    this.loading = true;
    this.request({
      pageNum: this.params.pageNum + 1
    }).done(res => {
      if (helper.isSuccess(res)) {
        var data = this.getKeyPath(res);
        this.hasNextPage = (data.length == this.params.pageSize);
        if (data.length) {
          this.params.pageNum++;
          this.dataList = this.dataList.concat(data);
          this.onLoadMore(res, data);
        }
      }
    })
  }
  scroll(event) {
    clearTimeout(this.scrollTimer);
    if (!this.hasNextPage || this.loading) return;
    var that = this;
    this.scrollTimer = setTimeout(function() {
      var $scrEl = $(event.target),
        scrollTop = $scrEl.scrollTop();
      var maxScroll = $scrEl.children().height() - $scrEl.height();
      //如果滚动接近底部
      if (scrollTop + 10 > maxScroll) {
        that.loadMore();
      }
    }, 50);
  }
  set(option) {
    $.extend(this,option);
  }
  reset(option) {
    this.abortXHR();
    var defaults = {
      loading: false,
      hasNextPage: true,
      badNetwork: false,
      dataList: []
    }
    $.extend(defaults, option);
    $.extend(this,defaults);
    this.params.pageNum = 1;
  }
  init(option = {}) {

  }

}

export default PageControl;

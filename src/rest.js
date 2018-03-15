/* eslint-disable */
/* RESTFUL APIs
    - 包含跟服务器交互的常用方法
    @param path 请求的url
    @param data 前端传递给后台的数据对象
    @param params 查询对象，将被parse成类似"?a=1&b=2"的形式拼在path后面
   共包含五种方法：
    Rest#post     - 增
    Rest#delete   - 删
    Rest#put      - 改
    Rest#get      - 查
    Rest#upload   - 上传

   Usage:
    var rest = require('rest');

    rest.post('user/new', {
      name: 'jacket',
      position: 'Frontend Developer'
    }).done(function (res) {
      // Do something...
    });
*/
import helper from './helper'
import {toast} from './util'


function Rest() {}

Rest.prototype = {
  // 增 - POST
  post: function(path, data, params) {
    if (params) path = parse(path, params);
    return doAjax('POST', path, data);
  },
  // 删 - DELETE
  delete: function(path, params) {
    if (params) path = parse(path, params);
    return doAjax('DELETE', path);
  },
  // 改 - PUT
  put: function(path, data, params) {
    if (params) path = parse(path, params);
    return doAjax('PUT', path, data);
  },
  // 查 - GET
  get: function(path, params) {
    if (params) path = parse(path, params);
    return doAjax('GET', path);
  },
  // 上传 - POST
  upload: function(path, data, params) {
    if (params) path = parse(path, params);
    return uploadHelper(path, data);
  },
  // ajax
  ajax: function(type, path, options) {
    var setting = apiSetting(type, path, options);
    return $.ajax(setting);
  }
}

/* 格式化请求路径
    @param path 请求路径
    @param params 查询对象或字符串
  Usage:
    parse('user/query', '?name=j&age=21')
    or
    parse('user/query', { name: 'j', age: '21' })
  将输出：'user/query?name=j&age=21'
*/
function parse(path, params) {
  if (path.charAt(path.length - 1) == '/') path = path.substr(0, path.length - 1);
  if (helper.isString(params)) return path + '/' + params;
  if (helper.isObject(params)) {
    var search = '?',
      counter = 0;
    for (var key in params) {
      if (counter) search += '&';
      search += key + '=' + params[key];
      counter++;
    }
    return path + search;
  }
  return path;
}

function doAjax(type, path, data) {
  var setting = apiSetting(type, path);
  if (data) {

    if (type.toLowerCase() == 'post' || type.toLowerCase() == 'put') data = JSON.stringify(data);


    setting['data'] = data;
    // setting['data'] = JSON.stringify(data);

  }


  return $.ajax(setting);
}

function uploadHelper(path, data) {
  var setting = apiSetting('POST', path);
  setting['data'] = data;
  setting['contentType'] = false;
  setting['processData'] = false;



  return $.ajax(setting);
}

function apiSetting(type, path, options) {
  var baseUrl = process.env.API;
  if(baseUrl.slice(-1) != '/') {
    baseUrl += '/'
  }
  if(path.slice(0,1) == '/') {
    path = path.slice(1)
  }
  var setting = {
    cache: false,
    url: baseUrl + path,
    type: type,
    contentType: 'application/json',
    dataType: 'json',
    // contentType: contentType || 'application/x-www-form-urlencoded',
    // dataType: dataType || 'json',
    timeout: 1000 * 15,
    crossDomain: true,
    beforeSend: function(xhr) {
      //$('#processing').removeClass('hide');
    },
    complete: function(xhr) {
      //$('#processing').addClass('hide');
    },
    success: function(res) {
      if (res.status.code == "403" && location.hash != '#/login') {
        helper.remove(['token'])
        location.hash = '/';
      }
    },
    error: function(xhr, textStatus) {
      if(xhr.autoReportError === false){
        return;
      }
      if (xhr.status === 404) {
        toast('请求失败(404)');
      } else if (xhr.status === 403) {
        toast('请求失败(403)');
        // toast('请重新登录');
        // location.hash = '/login';
      } else if (xhr.status === 500) {
        toast('请求失败(500)');
      } else if (xhr.status === 0) {
        xhr.aborted || toast('网络连接失败');
      } else if (textStatus === 'parsererror') {

      } else if (textStatus === 'timeout') {
        toast('请求超时');
      } else {
        toast('请求失败');
      }
    }
  }

  $.extend(setting, options)

  if (helper.get('token') && helper.get('token') !== 'null') {
    if (!setting['headers']) setting['headers'] = {};
    setting['headers']['X-Token'] = helper.get('token');
  }

  return setting;
}

const rest = new Rest;

export default rest;

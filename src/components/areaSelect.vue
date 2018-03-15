<!-- 省市区域多级联动选择
    实例： <area-select :is-show.sync="showAreaSelect" :sure="getAreaData"></area-select>
 -->
<template>
    <div>
        <multi-select :is-show.sync="isShow" :is-dynamic="isDynamic" :one="provinceList" :one-index.sync="provinceIndex" :two="cityList" :two-index.sync="cityIndex" :three="areaList" :three-index.sync="areaIndex" :sure="selectDone"></multi-select>
    </div>
</template>

<script type="text/ecmascript-6">
import api from '../config/api'
import rest from '../modules/rest'
import helper from '../modules/helper'
import {toast} from '../modules/util'
import multiSelect from './multiSelect.vue'

export default {
    data () {
        return {
            isDynamic: true,
            provinceIndex: 0,
            cityIndex: 0,
            areaIndex: 0,
        	provinceList: [],
        }
    },
    computed: {
        cityList () {
            if (this.provinceList.length > 0 && this.provinceList[this.provinceIndex] && this.provinceList[this.provinceIndex].cityList) {
                return this.provinceList[this.provinceIndex].cityList;
            } else {
                return [];
            }
        },
        areaList () {
            if (this.cityList.length > 0 && this.cityList[this.cityIndex] && this.cityList[this.cityIndex].areaList) {
                return this.cityList[this.cityIndex].areaList;
            } else {
                return [];
            }
        }
    },
    props: {
        isShow: {
            default: true,
            type: Boolean,
            twoWay: true
        },
        sure: {
            default: function(){

            },
            type: Function
        }
    },
    created () {
        var that = this;
        rest.get(api.cityAreaList).done(function (res) {
            if (helper.isSuccess(res)) {
                that.provinceList = res.data.map(function(province){
                    province.name = province.provinceName;
                    if (province.cityList) {
                        province.cityList = province.cityList.map(function(city){
                            city.name = city.cityName;
                            if (city.areaList) {
                                city.areaList = city.areaList.map(function(area){
                                    area.name = area.areaName;
                                    return area;
                                });
                            }
                        
                            return city;
                        });
                    }
                    
                    return province
                });
            } else {
              // 失败，弹出错误信息
              toast(res.status.msg);
            }
        });
    },
    watch: {
        
    },
    components: {
        multiSelect
    },
    methods: {
    	selectDone () {
            var selectData = {
                province: $.extend(true, {}, this.provinceList[this.provinceIndex]),
                city: $.extend(true, {}, this.cityList[this.cityIndex]),
                area: $.extend(true, {areaId: '', areaName: '', name: ''}, this.areaList[this.areaIndex])
            };
            this.sure(selectData);
        }
    }
}
</script>

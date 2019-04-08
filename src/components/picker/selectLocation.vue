<template>
    <transition name="fade">
            <mt-picker  class="animationDIc":slots="slots"  @change="onValuesChange" value-key="value" showToolbar :itemHeight="itemHeight">
                <mt-header title="">
                    <mt-button slot="left" class="cancle" @click="toParent">取消</mt-button>
                    <mt-button slot="right" class="sure" @click="sure">确定</mt-button>
                </mt-header>
            </mt-picker>
    </transition>
</template>
<script>
import { iosProvinces ,iosCitys, iosCountys} from '@/utils/dataCountry'
export default {
    data(){
        return{
            result: '',
            provinceValue: '',
            provinceId:'',
            showa:true,
            cityId:'',
            countyId:'',
            cityValue: '',
            countyValue: '',
            first: '', 
            second: '',
            itemHeight:43,
            third: '',
            slots: [{
                    flex: 1,
                    values: iosProvinces,
                    className: 'slot1',
                    textAlign: 'left',
                    defaultIndex: 0
                }, {
                    flex: 1,
                    values: iosCitys,
                    className: 'slot2',
                    textAlign: 'center',
                    defaultIndex: 0                    
                }, {
                    flex: 1,
                    values: iosCountys,
                    className: 'slot3',
                    textAlign: 'right',
                    defaultIndex: 0                    
                }]
        }
    },
    props: ['show', 'province', 'city', 'county'],
    methods: {
        // 筛选器值变化时调用
        onValuesChange(picker, values) {     //youshijian需优化
            var cityArray = [];
            var countyArray = [];
            if(values[0]){
                cityArray=iosCitys.filter((val,index)=>{
                    return values[0].id == val.parentId
                })
                picker.setSlotValues(1, cityArray);
            } 

            if(values[1]){
                countyArray=iosCountys.filter((val,index)=>{
                    return values[1].id == val.parentId
                })
                picker.setSlotValues(2, countyArray);
            }
            var result = this.result;
            if(typeof(values[1]) == 'object' && typeof(values[2]) == 'object'){
                result = values[0].value + values[1].value + values[2].value;
                this.provinceId= values[0].id;
                this.cityId= values[1].id;
                this.countyId= values[2].id;
                this.provinceValue = values[0].value;
                this.cityValue = values[1].value;
                this.countyValue = values[2].value;
                iosProvinces.some((val,index)=>{
                    if(val.value == this.province){
                        this.first = index;
                        return true
                    }
                })

                cityArray.some((val,index)=>{
                    if(val.value == this.city){
                        this.second = index;
                        return true
                    }
                })
                countyArray.some((val,index)=>{
                    if(val.value == this.county){
                        this.third = index;
                        return true
                    }
                })
                for(var j=0; j<countyArray.length; j++){
                    if(this.county == countyArray[j].value){
                        this.third = j;
                    }
                }
                this.slots[0].defaultIndex = parseInt(this.first);
                this.slots[1].defaultIndex = parseInt(this.second);
                this.slots[2].defaultIndex = parseInt(this.third);
            }else if(typeof(values[1]) != 'object' && typeof(values[2]) == 'object'){
                values[1] = this.iosCitys;
                result = values[0].value + this.city + values[2].value;
                this.provinceValue = values[0].value;
                this.cityValue = this.city;
                this.countyValue = values[2].value;
            }
            this.result = result;
        },
        // 传值
        toParent(){
            var show = false;
            var result, province, city, county,NumbId;
            if(this.province + this.city + this.county){
                result = this.province + this.city + this.county;
                province = this.province;
                city = this.city;
                county = this.county;
                NumbId = this.countyId;   
            }
            this.$emit('changeValue', {show, result, province, city, county,NumbId});
        },
        // 点击确定按钮
        sure(){
            var show = false;
            var result = this.result;
            var province = this.provinceValue;
            var city = this.cityValue;
            var county = this.countyValue;
            var NumbId = this.countyId;
            this.$emit('changeValue', {show, result, province, city, county,NumbId});
        }
    },
    mounted(){
        this.slots[1].values = [];
        this.slots[2].values = [];
    }
}
</script>
<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: .3s;
    }

    .fade-enter,
    .fade-leave-to {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0)
    }
    .picker{
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        width: 100%;
        z-index: 9999999999;
    }
    .mint-header{
        background: #fff;
        border-bottom: 1px solid #F7F7F7;
        color: #333;
        padding:0 30px;
    }
    .cancle{
        color: #646464;
        flex: 1;
        font-size: 32px;
    }
    .sure{
        color: #26a2ff;
        flex: 1;
        font-size: 32px;
    }
    .picker-item.picker-selected{color: #666;}
</style>



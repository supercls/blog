<template>
  <div @change="$emit('change', currentValue)" class="mint-checklist"  :class="{ 'is-limit': max <= currentValue.length }">
    <label class="mint-checklist-title" v-text="title"></label>
    <div class="new-checklist" v-for="(option,index) in options" :key="index">
      <label class="mint-checklist-label" slot="title">
        <span
          :class="{'is-right': align === 'right'}"
          class="mint-checkbox">
          <input
            class="mint-checkbox-input check-on"
            type="checkbox"
            v-model="currentValue"
            name='checkboxinput'
            :disabled="option.disabled"
            :value="option.value || option">
          <span class="mint-checkbox-core" @click="currens(option,index)"></span>
        </span>
        <span class="mint-checkbox-label" v-text="option.label || option"></span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mt-checklist',
  props: {
    max: Number,
    title: String,
    align: String,
    options: {
      type: Array,
      required: true
    },
    value: Array
  },

  data() {
    return {
      currentValue: this.value
    };
  },
  methods:{
    currens:function(val,index){
      var chaIndex=this.currentValue.indexOf(val.value)
      if(chaIndex>=0){
        this.currentValue.splice(chaIndex,1)
      }
      else{
        this.currentValue.push(val.value)
      }
    }
  },
  computed: {
    limit() {
      return this.max < this.currentValue.length;
    }
  },
  mounted:function(){
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      if (this.limit) val.pop();
      this.$emit('input', val);
    }
  }
};
</script>

<style lang="css">
  @import "../../styles/var.css";

  @component-namespace mint {
    @component checklist {

      .mint-cell {
        padding: 0;
      }

      @descendent label {
        display: block;
        padding: 0 20px;
      }

      @descendent title {
        color: $checklist-title-color;
        display: block;
        font-size: 12px;
        margin: 8px;
      }

      @when limit {
        .mint-checkbox-core:not(:checked) {
          background-color: $color-grey;
          border-color: $color-grey;
        }
      }
    }

    @component checkbox {
      @when right {
        float: right;
      }

      @descendent label {
        vertical-align: middle;
        margin-left: 0px;

      }

      @descendent input {
        display: none;

        &:checked {
          + .mint-checkbox-core {
            background-color:#78BE40;
            border-color: #78BE40;

            &::after {
              border-color: $color-white;
              transform: rotate(45deg) scale(1);
            }
          }
        }

        &[disabled] + .mint-checkbox-core {
          background-color: $color-grey;
          border-color: #ccc;
        }
      }

      @descendent core {
        display: inline-block;
        background-color: $color-white;
        border-radius:none;
        border: 1px solid #ccc;
        position: relative;
        size: 20px;
        vertical-align: middle;

        &::after {
          border: 2px solid transparent;
          border-left: 0;
          border-top: 0;
          content: " ";
          position: absolute 3px * * 6px;
          size: 4px 8px;
          transform: rotate(45deg) scale(0);
          transition: transform .2s;
        }
      }
    }
  }
  .new-checklist{
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    padding:20px 0px;
  }
</style>

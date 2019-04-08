<template>
  <div class="my-header">
    <mt-header :title="heaTitle" fixed>
      <div slot="left"  @click="handleBack">
        <slot name="leftC"></slot>
        <mt-button 
          v-show="showBack" 
          icon="back" 
          @click="handleBack"
          class="my-button"
        >
        </mt-button>
      </div>
      <div slot="right">
          <slot name="rightC"></slot>
      </div>
    </mt-header>

  </div>
</template>
<script>
export default {
  name: "headerTop",
  data: function() {
    return {};
  },
  props: {
    heaTitle: {
      type: String,
      require: true
    },
    zdBack: {
      type: Function,
      require: false
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleBack() {
      if (this.zdBack && typeof this.zdBack === "function") {
        this.zdBack();
      } else {
        console.log(this.$store)
        this.$store.state.user.isBack=true
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mint-header {
  background: #fff;
  color: #666666;
  height: 100px;
  // background-color: red;
  .my-button{
    font-size: 24px;
  }
}

</style>
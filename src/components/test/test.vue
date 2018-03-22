<template>
  <div class="test">
    <audio autoplay ref="audio" controls :src="src" @canplay="onCanplay"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getCurDate} from 'common/js/util'

  export default {
    data() {
      return {
        src: 'http://dl.stream.qqmusic.qq.com/C400003v4UL61IYlTY.m4a?vkey=95187AE049FE09BB8EF7AF0CF48EDDBAC97FA6B2CB9396A5F6C447DD0D4452C513D8336B3219E2762B07BE68CB99DDFC2A73A125EF6A0E4E&guid=1726274344&uin=0&fromtag=66'
      }
    },
    methods: {
      onCanplay() {
        console.log(`can play ${getCurDate()}`)
        this.$refs.audio.play()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .test
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
</style>




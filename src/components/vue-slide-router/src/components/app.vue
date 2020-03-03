<template>

  <div @swipe="onSwipe" id="app" :class="{ 'onmove':onmove, 'endmove':endmove }">
  	<!-- 前一页 -->
  	<component class="page show" :class="{ 'prev':isPrev }" :is="prevPage" v-if="prevPage!=null"
      :style="prevTrans?{ [webkit+'transform']: prevTrans }:{}" ></component>
    <!-- 当前页 -->
  	<router-view class="page" :class="{ 'show':isShow, 'goback':goback }" ref="page" 
      :style="currTrans?{ [webkit+'transform']: currTrans }:{}"></router-view>
  </div>

</template>

<script>
import '../css/page.css'
import { isAndroid } from '../js/domhelper'

const webkit = 'transform' in document.body.style ? '' : '-webkit-';
let cancelMove = false;

export default {
  name: 'app',
  data() {
  	return {
      webkit,
  	  prevPage: null,
      onmove: false,
      endmove: false,
  	  isPrev: true,
  	  isShow: true,
      prevTrans: false,
  	  currTrans: false,
  	  goback: false
  	}
  },
  methods: {

    onSwipe(e) {
      const showMove = true//!(isAndroid); // && !options.androidCanDrag
      const { dx, dy, orien, duration, end } = e.swipeData;
      const winw = document.documentElement.clientWidth;
      if(orien != 'x') return;
      // console.log(e.swipeData)
      
      if(end) {

        cancelMove = false;
        
        if(this.onmove) {
          this.endmove = true;
          setTimeout(_ => this.endmove = false, 100); //options.endmoveDure
        }

        var dt = duration/1000;
        var vx = parseInt(dx/dt);

        if(dx > winw/2 || vx>280 && dx>60) {
          const canBack = JSON.parse(sessionStorage.pathArr || '[]').length > 1
          if(canBack) this.$router.back();
        } else {
          this.onmove = false;
          this.currTrans = false;
          this.prevTrans = false;
        }
        
      } else if(this.prevPage && showMove) {

        var mx_curr = Math.max(0, dx);
        var mx_prev = -parseInt((winw - mx_curr)/3);
        this.onmove = true;
        this.currTrans = `translateX(${mx_curr}px)`;
        this.prevTrans = `translateX(${mx_prev}px)`;

      }

    },

  },
}
</script>


<template>
   <div>
     <LeftNav></LeftNav>
     <Pos></Pos>
     <div class="main">
         <router-view></router-view>
     </div>
    
   </div>
</template>

<script>
// @ is an alias to /src
import LeftNav from '@/components/leftNav.vue'
import Pos from '@/components/Pos.vue'
export default {

  components: {
    LeftNav,Pos
  },
  
}
</script>
<style>
.main{
  float: left;
  width: 95%;
  background-color: #eff2f7;
  height: 100%;
  overflow: hidden;
}

</style>

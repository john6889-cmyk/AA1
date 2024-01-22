<template> 
   <div class="environment-box">
       <div class="environment-main">
           <div class="environment-title">
           <span class="p-title" style="font-size:16px">智慧环境</span>
           </div>
           <div style="margin-top:14px;margin-bottom:14px;">
               平均温度：<span style="display:inline-block;margin-right:24px;">4°C</span>
               平均湿度：<span>30%</span>
           </div>
          <div class="environment-show">
              <div class="temperature" ref="temperature">
                    <dashboard :value="4" desc="­°C"  style="position:relative;bottom:8px;">
                    </dashboard>
                    <span style="display:inline-block;position:relative;bottom:12px;">温度</span>
              </div>
              <div class="humidity">
                    <dashboard :value="30" desc="%" style="position:relative;bottom:8px;"></dashboard>
                    <span  style="display:inline-block; position:relative;bottom:12px;">湿度</span>
              </div>
          </div> 
       </div>
       
   </div>

</template>

<script>  
    import dashboard from './Dashboard'; 
    export default {
        components:{
         dashboard
        },
        data() {
            return {
            };
        },
        mounted() {
            
        },
        methods: {
        }
    }
</script>

<style scoped lang="scss">
   .environment-box{
       width: 100%;
       height: 100%;
       background: url(" ../../../../assets/smartJ-img/borders.png") no-repeat;
       background-size: 100% 100%;
       padding-top:20px;
       color:#fff; 
      
       .environment-main{
            width: 100%;;
             font-size: 14px;
           .environment-title{
             margin:10px 0;
           }
           .environment-show{
               width: 100%;
               height: 200px;
               display: flex;
               font-size:14px;
               .temperature{
                   flex:1;
                   text-align:center;
                   margin:0 auto;
                }
                .humidity{
                    flex:1;
                }

           }
       }
        
   }
</style>
<style lang="scss">
 
</style>
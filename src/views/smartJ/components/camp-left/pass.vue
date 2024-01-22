<template> 
   <div class="pass-box">
       <div class="pass-main">
           <div class="pass-title">
           <span class="p-title">智能出入</span>
            <el-select 
                    placeholder="请选择"  
                    size="mini" 
                    style="width:40%"
                    v-model="currentPass"
                    value-key="id"
                    class="operationRight"
                    >
                <el-option
                    v-for="item in passDataList" 
                    :key="item.id" 
                    :label="item.name"
                    :value="item"
                >
                </el-option>
            </el-select>
            </div>
           <ul>
               <li>当前滞留人员: <span>{{currentPass.strandedPersonnelNum}}</span>
               </li>
               <li>本单位人员: <span>{{currentPass.staff}}</span></li>
               <li>访客:<span>{{currentPass.visitor}}</span></li>
           </ul>
       </div>
       <el-card class="real-time-information">
            <div slot="header" class="clearfix">
                <span>实时信息</span>
            </div>
            <div class="information">
                <div class="head-portrait">
                    <!-- <img src="../../../../../static/smartJ-headPortrait/test.jpg" alt="个人头像"> -->
                    <img :src="`../../../../../static/smartJ-headPortrait/${realTime.image}`" alt="个人头像">
                </div>
                <div class="pel-information">
                    <ul>
                        <!-- <li><span>{{time1}}</span>&nbsp;&nbsp;访客进入</li> -->
                        <li><span>{{realTime.realTime}}</span>&nbsp;&nbsp;访客进入</li>
                        <li>姓名：<span>{{realTime.name}}</span></li>
                        <li>接待人：<span>{{realTime.receiver}}</span></li>
                        <li>来访原因：<span>{{realTime.visitedReason}}</span></li>
                    </ul>
                </div>
            </div>
       </el-card>
   </div>

</template>

<script>  
    import dayjs from 'dayjs';
    export default {
        props:['passDataList','realTime'],   
        data() {
            return {
              currentPass: {},
            //   time1:dayjs().format('YYYY-MM-DD HH:mm')
            //   time1:'',
            //   timer
            };
        },
        created(){
        //   this.test()
        // this.getTime()
        // this. newTime()
        },
        methods:{
            // onSelectChange(value){
            //     console.log(value)
            //     this.$emit('onChange',value)
            // }
        //  test(){
        //      console.log("测试数据",this.passDataList)
        //  }
        // newTime(){
        //     this.timer=setInterval(()=>{
        //       this.time1=dayjs().format('YYYY-MM-DD HH:mm')
        //     },1000)
        // }
           
        },
        watch:{
            passDataList(newValue,oldValue){
                if(newValue){
                    this.currentPass = newValue[0];
                }
            },
            // time1(newValue,oldValue){
            //     if(newValue){
            //         this.time1=
            //     }
            // }
        },
        // beforeDestroy(){
        //   if(this.timer){
        //       clearInterval(this.timer)
        //   }
        // }
   }
</script>

<style scoped lang="scss">
   .pass-box{
       width: 100%;
       height: 100%;
       background: url(" ../../../../assets/smartJ-img/borders.png") no-repeat;
       background-size: 100% 100%;
       padding-top:20px;
       color:#fff; 
       .pass-main{
           .pass-title{
             margin:10px 0;
           }
           &>ul{
               width: 100%;
               text-align: left;
               list-style-type:none;
               margin:0;
               margin-left:-40px;
               font-size:14px;
               li{
                   margin: 10px 0;
               }
           }
            .p-title{
                display:inline-block;
                margin-right:20px;
            }
                padding-left:30px;
                color:#fff;
                margin-bottom:5px;
       }
       .real-time-information{
           width: 90%;
           margin:0 auto;
           font-size:14px;
        .information{
        display:flex;
        .head-portrait{
            height: 80px;
            width: 80px;
            img{
                height: 100%;
                width: 100%;
            }
        }
        .pel-information{
            ul{
                 list-style-type:none;
                 margin:0;
                 text-align: left;
                 li{
                     margin-bottom:4px;
                 }
            }
      
        }
        }
       }
   }
</style>
<style lang="scss">
.pass-box{
  .el-card__header{
    padding-top:14px;
    padding-bottom:14px;
    border-bottom: 1px solid #455A64;
  }

  .el-input__inner {
    background: url("../../../../assets/img/按钮.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    color: #fff;
  }
  .el-select .el-input .el-select__caret{
    color: #fff;
  }

}
</style>
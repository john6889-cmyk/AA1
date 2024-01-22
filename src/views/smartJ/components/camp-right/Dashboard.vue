<template>
  <div ref="dashboard" style="width: 100%;height: 100%;"></div>
</template>

<script>
    import { getDashboardOption } from './echartOption'
    export default {
        name: "Dashboard",
        props: ['value','desc'],
        data() {
            return {

            }
        },
        mounted() {
            this.creatDashboard()
        },
        methods: {
            creatDashboard() {
                let dashboard = this.$echarts.init(this.$refs.dashboard);
                let angle = 0;
                setInterval(() => {
                    angle = angle + 3
                    dashboard.setOption(getDashboardOption(this.value,this.desc,angle), true)
                }, 100);
            }
        }
    }
</script>

<style scoped>

</style>

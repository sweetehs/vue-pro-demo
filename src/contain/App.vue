<style lang="less">
    @import "../assets/less/reset.less";
    @import "../assets/less/fn.less";
    @import "../assets/less/element.less";
    @import "../assets/less/common.less";
    @import "../assets/less/var.less";
    html,body,#app{
        height: 100%;
    }
    
    .main-top{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: @topHeight;
    }
    .main-bottom{
        height: 100%;
        box-sizing: border-box;
        padding-top: @topHeight;
        display: flex;
        .main-left{
            min-width: 200px;
            height: 100%;
        }
        .main-right{
            flex: 1;
            height: 100%;
            overflow: auto;                        
            box-sizing: border-box;
            position: relative;
            overflow: auto;
        }
    }
</style>
<template>
    <div id="app">
        <div class="main-top">
            <Topbar></Topbar>
        </div>
        <div class="main-bottom">
            <div class="main-left">
                <Sidebar></Sidebar>
            </div>
            <div class="main-right">
                <Loading></Loading>
                <div class="main-content">
                    <router-view name="main"></router-view>    
                </div>                
            </div>
        </div>        
    </div>
</template>

<script>
    import Topbar from "./topbar.vue";
    import Sidebar from "./sidebar.vue";
    import Loading from "../common/loading.vue";
    export default {
        name: 'app',
        components: {
            "Topbar": Topbar,
            "Sidebar": Sidebar,
            "Loading": Loading
        }
    }
</script>

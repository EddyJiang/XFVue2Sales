<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >   <el-menu-item index="0" @click="homepage">
                <i class="el-icon-setting"></i>
                <span slot="title"  style="padding-left:20px;">工作台</span>
            </el-menu-item>
            <template v-for="item in items">
                <template v-if="item.children.length>0">
                   <el-submenu :index="'' + item.formid" :key="item.menuid">
                        <template slot="title">
                            <i :class="item.iconclass"></i>
                            <span slot="title">{{ item.menuname }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-submenu
                                v-if="subItem.children.length>0"
                                :index="'' + subItem.formid"
                                :key="subItem.formid"
                            >
                                <template slot="title">{{ subItem.menuname }}</template>
                                <el-menu-item
                                    v-for="(threeItem) in subItem.children"
                                    :key="threeItem.formid"
                                    :index=" '' + threeItem.formid"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="'' +subItem.formid"
                                :key="subItem.formid"
                            >{{ subItem.menuname }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <!-- <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template> -->
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: []
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods:{
        getleftdatas(moduleid){
            var alldatas=JSON.parse(localStorage.eleMenu||"[]");
            this.items=alldatas.filter(x=>x.moduleid==moduleid);
        },
        homepage(){
            this.$router.push("/");
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        bus.$on("tip",index=>{
            this.getleftdatas(index);
        });
    },
    mounted(){
        this.items=JSON.parse(localStorage.eleMenu||"[]").filter(x=>x.moduleid==="SalesBase")
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>

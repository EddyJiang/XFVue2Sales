<!-- 收款部门列表 组件 -->
<template>
    <div class="dialog">
        <!-- input框 -->
        <el-input
            :class="{ entertrue: entertrue }"
            :disabled="disable"
            v-model="str"
            @keyup.enter.native="inputEnterEvent"
            @input="inputChangeEvent"
            placeholder="收款部门编号"
        >
            <i
                slot="suffix"
                @click="showdiolog"
                style="font-weight: bold; color: rgb(143, 142, 142)"
                class="el-input__icon el-icon-search"
            ></i>
        </el-input>
        <!-- dialog组件 -->
        <el-dialog ref="dialogs" title="收款部门列表" append-to-body :visible.sync="show" :close-on-click-modal="false" width="50%">
            <el-row :gutter="10">
                <el-col :span="8">
                    <el-form-item label="公司编号" prop="companyid">
                        <!-- 整合下面方法，fieldname为字段名称，用于区分 -->
                        <PrcCompany
                            ref="companyid"
                            :modelname="searchform.companyid"
                            fieldname="companyid"
                            @selectData="searchInputEnterEvent"
                        ></PrcCompany>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 表格区域 -->
            <CommTable
                ref="table"
                :height="400"
                :dataSource="tableData"
                :tableColumn="tableColumn"
                :options="commEntity.options"
                :fetch="fetchTableData"
                :pagination="commEntity.pagination"
                :showindex="true"
                @cellClickEvent="cellClickEvent"
                @cellDBLClickEvent="cellDBLClickEvent"
            ></CommTable>
            <div style="margin-bottom: 50px; margin-top: 20px">
                <el-button type="primary" style="float: right; margin-right: 0px" size="mini" @click="importClickEvent">选定</el-button>
                <el-button type="info" style="float: right; margin-right: 20px" @click="show = false" size="mini">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
    
    
<script>
export default {
    data() {
        return {
            // dialog开关
            show: false,

            // 传递的参数
            str: this.modelname,

            // 通用数据
            commEntity: this.$api.identity.getCommEntity(),

            // 表格数据
            tableData: [],

            searchform: {
                companyid: '',
                cccode: ''
            },
            // 表格字段
            tableColumn: [
                { field: 'cccode', title: '收款部门编号' },
                { field: 'ccname', title: '收款部门名称' },
                { field: 'hrcode', title: '负责人编号' },
                { field: 'companyid', title: '所属公司编号' }
            ],

            // 选中的数据
            clickrow: []
        };
    },

    // 传递参数
    props: {
        modelname: String,
        fieldname: String,
        entertrue: { type: Boolean, default: true },
        disable: { type: Boolean, default: false }
    },

    // 创建完成
    created() {},

    // 执行方法
    methods: {
        // 查询方法
        fetchTableData() {
            this.commEntity.options.loading = true;
            this.$api.prccostcenter
                .getDataByPage(
                    this.commEntity.pagination.pageIndex,
                    this.commEntity.pagination.pageSize,
                    this.commEntity.sort,
                    this.commEntity.order,
                    this.searchform
                )
                .then((res) => {
                    this.tableData = res.rows;
                    this.commEntity.pagination.total = res.total;
                    this.commEntity.options.loading = false;
                });
        },

        // 打开diolog
        showdiolog() {
            if (!this.disable) {
                this.$emit('companyidIsNull', this.fieldname);
                if (this.searchform.companyid == '') {
                    return;
                }
                this.searchform.cccode = '';
                this.show = true;
                this.fetchTableData();
            }
        },

        // 回车事件
        inputEnterEvent() {
            this.$emit('companyidIsNull', this.fieldname);
            if (this.searchform.companyid == '') {
                return;
            }
            this.searchform.cccode = this.str;
            this.$api.prccostcenter.getDataByCccode(this.searchform).then((res) => {
                if (res.total == 0) {
                    this.$message.warning('部门未输入，请检查！');
                    return;
                }
                this.$emit('selectData', { row: res.rows[0], fieldname: this.fieldname });
            });
        },

        // 单击事件
        cellClickEvent(row) {
            this.clickrow = row.row;
        },

        // 双击事件
        cellDBLClickEvent(row) {
            this.show = false;
            this.$emit('selectData', { row: row.row, fieldname: this.fieldname });
        },

        // 选定操作
        importClickEvent() {
            if (this.clickrow.length == 0) {
                this.$message.warning('请先选中数据');
                return;
            }
            this.show = false;
            this.$emit('selectData', { row: this.clickrow, fieldname: this.fieldname });
        },
        // input值监听
        inputChangeEvent() {
            this.$emit('inputChangeEvent', this.fieldname);
        },

        searchInputEnterEvent(data) {
            this.$refs.companyid.str = data.row.companyid;
            this.searchform.companyid = data.row.companyid;
            this.fetchTableData();
        }
    }
};
</script>
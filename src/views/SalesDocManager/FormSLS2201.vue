<!-- 2201 -- 销售订单 -->
<template>
    <div class="container">
        <!-- 面包屑 -->
        <Breadcrumb></Breadcrumb>

        <div class="container2">
            <!-- 工具栏 -->
            <el-row class="self-margin-down" :gutter="20">
                <ActionTool @fetchTableData="fetchTableData" @aleTableData="aleTableData" @addTableData="addTableData"></ActionTool>
            </el-row>

            <template>
                <el-form label-width="100px" size="mini" class="formDatastyle">
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-form-item label="单据开始日期" prop="startdate">
                                <el-date-picker
                                    v-model="searchform.startdate"
                                    style="width: 100%"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="单据结束日期" prop="enddate">
                                <el-date-picker
                                    v-model="searchform.enddate"
                                    style="width: 100%"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="订单单号" prop="doccode">
                                <el-input
                                    v-model="searchform.doccode"
                                    placeholder="订单单号"
                                    @keyup.enter.native="fetchTableData"
                                ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="公司" prop="companyid">
                                <SaleCompany
                                    ref="companyid"
                                    :modelname="searchform.companyid"
                                    fieldname="companyid"
                                    placeholder="请输入公司编号"
                                    :entertrue="false"
                                    @selectData="inputEnterEvent"
                                    @inputChangeEvent="inputChangeEvent"
                                ></SaleCompany>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-form-item label="客户" prop="cltcode">
                                <SaleCltGeneral
                                    ref="cltcode"
                                    :modelname="searchform.cltcode"
                                    fieldname="cltcode"
                                    placeholder="请输入客户编号"
                                    :entertrue="false"
                                    @selectData="inputEnterEvent"
                                    @inputChangeEvent="inputChangeEvent"
                                ></SaleCltGeneral>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="经销商" prop="cltcode2">
                                <SaleCltCompany
                                    ref="cltcode2"
                                    :modelname="searchform.cltcode2"
                                    fieldname="cltcode2"
                                    placeholder="请输入经销商编号"
                                    :entertrue="false"
                                    @getSearchValue="getSearchValue"
                                    @selectData="inputEnterEvent"
                                    @inputChangeEvent="inputChangeEvent"
                                ></SaleCltCompany>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="供货公司" prop="supplycompanyid">
                                <SaleCompany
                                    ref="supplycompanyid"
                                    :modelname="searchform.supplycompanyid"
                                    fieldname="supplycompanyid"
                                    placeholder="请输入供货公司编号"
                                    :entertrue="false"
                                    @selectData="inputEnterEvent"
                                    @inputChangeEvent="inputChangeEvent"
                                ></SaleCompany>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="制单公司" prop="usertxthd3">
                                <SaleCompany
                                    ref="usertxthd3"
                                    :modelname="searchform.usertxthd3"
                                    fieldname="usertxthd3"
                                    placeholder="请输入制单公司编号"
                                    :entertrue="false"
                                    @selectData="inputEnterEvent"
                                    @inputChangeEvent="inputChangeEvent"
                                ></SaleCompany>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-form-item label="筛选" prop="status">
                                <div style="padding-left: 20px; padding-top: 3px">
                                    <el-radio-group v-model="searchform.docstatus" @change="fetchTableData">
                                        <el-radio :label="0">本阶段</el-radio>
                                        <!-- <el-radio :label="0">未确认</el-radio> -->
                                        <el-radio :label="50">已确认</el-radio>
                                        <el-radio :label="100">已审核</el-radio>
                                        <el-radio label>所有</el-radio>
                                    </el-radio-group>
                                    <el-divider direction="vertical"></el-divider>
                                    <span style="padding-left: 20px">
                                        <el-checkbox v-model="searchform.self" @change="fetchTableData" label="仅含自制单"></el-checkbox>
                                        <el-checkbox
                                            v-model="searchform.ifblscrap"
                                            @change="fetchTableData"
                                            label="隐藏作废单"
                                        ></el-checkbox>
                                    </span>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>

            <!-- 表格区域 -->
            <CommTable
                :tableColumn="columns"
                :dataSource="tableData"
                :options="commEntity.options"
                :fetch="fetchTableData"
                :pagination="commEntity.pagination"
                @cellClickEvent="cellClickEvent"
                @cellDBLClickEvent="cellDBLClickEvent"
            ></CommTable>
        </div>
        <Dialog2201 :dialog="commEntity.dialog" :hdData="rowdata" v-if="commEntity.dialog.show" @Refresh="fetchTableData"></Dialog2201>
    </div>
</template>

<script>
import Dialog2201 from '@views/SalesDocManager/components/Dialog2201'; //引用 Dialog

export default {
    // 数据
    data() {
        return {
            commEntity: this.$api.identity.getCommEntity(),

            tableData: [],

            // 查询参数
            searchform: {
                startdate: this.$moment().subtract('days', 60).format('YYYY-MM-DD'),
                enddate: this.$moment().subtract('days', 0).format('YYYY-MM-DD'),
                doccode: '',
                companyid: '',
                cltcode: '',
                cltcode2: '',
                supplycompanyid: '',
                usertxthd3: '',
                entername: '',
                self: false,
                blscrap: '',
                ifblscrap: true
            },

            columns: [
                {
                    field: 'doccode',
                    title: '申请单号',
                    width: 100
                },
                {
                    field: 'docdate',
                    title: '申购日期',
                    width: 100
                    // render: (row, index) => {
                    //   return (
                    //     <span>{XEUtils.toDateString(row.docdate, "yyyy-MM-dd")}</span>
                    //   );
                    // }
                },
                {
                    field: 'doctype',
                    title: '单据类型',
                    width: 100
                },
                {
                    field: 'docstatus',
                    title: '状态',
                    render: (row, index) => {
                        if (row.docstatus == 0) {
                            return <span>保存中</span>;
                        } else if (row.docstatus == 50) {
                            return <span>已确认</span>;
                        } else if (row.docstatus == 100) {
                            return <span>已审核</span>;
                        }
                    },
                    width: 100
                },
                {
                    field: 'companyid',
                    title: '公司编号',
                    width: 80
                },
                {
                    field: 'companyname',
                    title: '公司名称',
                    width: 250,
                    align: 'left'
                },
                {
                    field: 'cltcode',
                    title: '客户编号',
                    width: 100
                },
                {
                    field: 'cltname',
                    title: '客户名称',
                    width: 120
                },
                {
                    field: 'entername',
                    title: '录入人',
                    width: 100
                },
                {
                    field: 'hdcurrency',
                    title: '币种编号',
                    width: 100
                },
                {
                    field: 'hdcurrencyname',
                    title: '币种名称',
                    width: 100
                },
                {
                    field: 'sumtotalmoney',
                    title: '汇总金额',
                    width: 100
                },
                {
                    field: 'enterdate',
                    title: '申请时间',
                    width: 150
                }
            ]
        };
    },

    components: {
        //创建Dilog
        Dialog2201
    },

    // 操作方法
    methods: {
        // 查询按钮事件
        fetchTableData() {
            this.commEntity.options.loading = true;
            this.searchform.entername = this.searchform.self ? JSON.parse(localStorage.eleUser || '[]').usercode : '';
            this.searchform.blscrap = this.searchform.ifblscrap ? 'true' : 'false';

            this.$api.slssalesorderhd
                .getbypage(
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

        // 点击行事件
        cellClickEvent(row) {
            this.rowdata = row.row;
        },

        // 表格双击事件
        cellDBLClickEvent(row) {
            this.$router.push({
                name: '211010',
                params: {
                    formid: 211010,
                    multipleSelection: row.row,
                    type: 'fetch'
                }
            });
        },

        // 新增按钮事件
        addTableData() {
            this.commEntity.dialog.show = false;
            this.$nextTick(() => {
                this.commEntity.dialog.options = 'add';
                this.commEntity.dialog.title = '新增';
                this.commEntity.dialog.show = true;
            });
        },

        // 修改按钮事件
        aleTableData() {
            if (this.rowdata == null) {
                this.$message.warning('请选中数据');
                return;
            }
            this.$nextTick(() => {
                this.commEntity.dialog.options = 'update';
                this.commEntity.dialog.title = '修改';
                this.commEntity.dialog.show = true;
            });
        },

        // 客户事件
        inputEnterEvent(data) {
            switch (data.fieldname) {
                case 'companyid':
                    this.$refs.companyid.str = data.row.companyid;
                    this.searchform.companyid = data.row.companyid;
                    break;
                case 'cltcode':
                    this.$refs.cltcode.str = data.row.cltcode;
                    this.searchform.cltcode = data.row.cltcode;
                    break;
                case 'cltcode2':
                    this.$refs.cltcode2.str = data.row.parentcltcode;
                    this.searchform.cltcode2 = data.row.parentcltcode;
                    break;
                case 'supplycompanyid':
                    this.$refs.supplycompanyid.str = data.row.companyid;
                    this.searchform.supplycompanyid = data.row.companyid;
                    break;
                case 'usertxthd3':
                    this.$refs.usertxthd3.str = data.row.companyid;
                    this.searchform.usertxthd3 = data.row.companyid;
                    break;
            }
        },

        // 监听input事件
        inputChangeEvent() {
            this.searchform.cltcode = '';
            this.searchform.cltname = '';
        },

        getSearchValue(fieldname) {
            switch (fieldname) {
                case 'cltcode2':
                    this.$refs.cltcode2.searchform.companyid = this.$refs.companyid.str;
                    this.$refs.cltcode2.searchform.cltcode = this.$refs.cltcode.str;
                    break;
            }
        }
    },

    //创建完成
    created: function () {
        this.fetchTableData();
    }
};
</script>

<style scoped>
</style>
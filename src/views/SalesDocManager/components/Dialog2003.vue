<template>
    <div class="dialog">
        <!-- 弹出层 -->
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            width="80%"
            :close-on-click-modal="false"
            :close-on-press-eacape="false"
            :modal-append-to-body="false"
            :validate-on-rule-change="false"
        >
            <template>
                <el-form :rules="validrules" label-width="100px" size="mini" class="formDatastyle" style="padding-left: 10px">
                    <!-- 顶头部分 -->
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-form-item label="数据录入类型" prop="matcode">
                                <el-select
                                    v-model="HDData.matcode"
                                    :disabled="itemTypeDisabled"
                                    filterable
                                    clearable
                                    placeholder="请选择运输包装方式"
                                    style="width: 100%"
                                >
                                    <el-option v-for="item in itemTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="型材编号" prop="docitem">
                                <el-input disabled v-model="HDData.docitem"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="型材名称" prop="rowid">
                                <el-input disabled v-model="HDData.rowid"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <el-checkbox label="全锁"></el-checkbox>
                        </el-col>
                    </el-row>
                    <!-- 中间部分 -->
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <!-- 侧边列表同侧边表单 -->
                            <el-tabs tab-position="bottom" type="border-card">
                                <!-- 侧边列表 -->
                                <el-tab-pane label="一级BOM">
                                    <CommTable
                                        :tableColumn="matTableColumn"
                                        :dataSource="tableData"
                                        :options="commEntity.options"
                                        :height="500"
                                    ></CommTable>
                                </el-tab-pane>
                                <!-- 侧边表单 -->
                                <el-tab-pane label="客户订单明细">
                                    <div style="height: 490px">
                                        <el-row :gutter="20">
                                            <el-col :span="12">
                                                <el-form-item label="客户型号编号" prop="doccode">
                                                    <el-input disabled v-model="HDData.doccode"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="客户型号名称" prop="docitem">
                                                    <el-input disabled v-model="HDData.docitem"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :span="12">
                                                <el-form-item label="客户颜色编号" prop="doccode">
                                                    <el-input disabled v-model="HDData.doccode"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item label="客户颜色名称" prop="docitem">
                                                    <el-input disabled v-model="HDData.docitem"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :span="24">
                                                <el-form-item label="子客户公司" prop="doccode">
                                                    <el-input v-model="HDData.doccode"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :span="24">
                                                <el-form-item label="子客户单号" prop="doccode">
                                                    <el-input v-model="HDData.doccode"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row :gutter="20">
                                            <el-col :span="24">
                                                <el-form-item label="客户订单行号" prop="doccode">
                                                    <el-input v-model="HDData.doccode"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                        <el-col :span="14">
                            <div style="height: 580px; overflow-y: auto">
                                <el-row :gutter="20">
                                    <el-col :span="21">
                                        <el-form-item label="加工规格" prop="doccode">
                                            <el-input disabled v-model="HDData.doccode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="颜色编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="颜色名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="材质编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="材质名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="膜厚编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="膜厚名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="结算方式编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="结算方式名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="折扣类型编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="折扣类型名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="长度" prop="docitem">
                                            <el-input v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="长度可变"></el-checkbox>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="公差编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="公差名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="订单支数" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="客户接收损耗率" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="最小提货量" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="最大提货量" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="单支重量" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="单位面积" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="重量单价" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="金额" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="面积单价" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="单位" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="客户型号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="型号面积" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="单支实方" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="总实方" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="包装方式编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="包装方式名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="质量码编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="质量码名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="10">
                                        <el-form-item label="挤压工艺编号" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="挤压工艺名称" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="5">
                                        <el-checkbox label="是否打胶？"></el-checkbox>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-form-item label="型材标签备注" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :span="21">
                                        <el-form-item label="备注说明" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :span="7">
                                        <el-form-item label="行识" prop="docitem">
                                            <el-input disabled v-model="HDData.docitem"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="项次" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="加工码" prop="rowid">
                                            <el-input disabled v-model="HDData.rowid"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </template>

            <br />

            <!-- 表格数据-->
            <CommTable :tableColumn="tableColumn" :dataSource="tableData" :options="commEntity.options" :height="100"></CommTable>

            <!-- 弹出层操作按钮 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="save()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
export default {
    // 数据
    data() {
        return {
            // 通用数据
            commEntity: this.$api.identity.getCommEntity(),

            // 数据
            HDData: {
                doccode: this.headerFormData.doccode,
                matcode:'',
                docitem: '',
                rowid: '',
                accountid: '113101',
                accountname: '应收帐款－销售往来',
                acctfullname: '应收帐款_应收帐款－销售往来',
                money: '',
                natmoney: '',
                dtcurrency: this.headerFormData.hdcurrency,
                dtexchange_rate: this.headerFormData.hdexchange_rate,
                resume: '',
                usercode: JSON.parse(localStorage.eleUser || '[]').username
            },

            itemTypeDisabled: true,

            itemTypeOptions: [],

            matTableColumn: [
                { field: 'matcode', title: '型材编号' },
                { field: 'matname', title: '型材名称' }
            ],

            tableData: [],

            tableColumn: [
                {
                    field: 'docitem',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'matcode',
                    title: '型材编号',
                    width: 100
                },
                {
                    field: 'matname',
                    title: '型材名称',
                    width: 100
                },
                {
                    field: 'cv1',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'cv1name',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'cv2',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'cv2name',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'cv3',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'cv3name',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'cv4',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'cv5',
                    title: '项次',
                    width: 100
                }
            ],

            validrules: {}
        };
    },

    // 父页面传递过来的参数
    props: {
        dialog: Object,
        headerFormData: Object,
        hdData: Object
    },

    // 加载完成
    created() {
        console.log(this.headerFormData);
        console.log(this.hdData);
        if (this.hdData != '' && this.hdData != null && this.dialog.options == 'update') {
            //复制源数据出来，再赋值，否则会修改列表源数据
            const copyArray = JSON.parse(JSON.stringify(this.hdData));
            this.HDData = copyArray;
        }

        if (this.dialog.options == 'add') {
            this.itemTypeDisabled = false;
        }

        this.$api.slsitemtype
            .getDataByFormId({ formid: '21101' })
            .then((res) => {
                if (res.total > 0) {
                    for (var item in res.rows) {
                        this.itemTypeOptions.push({ label: res.rows[item].itemname, value: res.rows[item].itemcode });
                    }
                }
            })
            .catch(() => {});

        this.getData(this.dialog.options);
    },

    // 操作方法
    methods: {
        // 选择公司事件
        inputEnterEvent(data) {
            console.log(data);
            switch (data.fieldname) {
                case 'accountid':
                    this.$refs.accountid.str = data.row.acctcode;
                    this.HDData.accountid = data.row.acctcode;
                    this.HDData.accountname = data.row.acctname;
                    this.HDData.acctfullname = data.row.acctfullname;
                    this.$refs.dtcurrency.str = data.row.currency;
                    this.HDData.currency = data.row.currency;
                    this.HDData.dtexchange_rate = data.row.exchange_rate;
                    break;
                case 'dtcurrency':
                    this.$refs.dtcurrency.str = data.row.currency;
                    this.HDData.dtcurrency = data.row.currency;
                    this.HDData.dtexchange_rate = data.row.exchange_rate;
                    break;
            }
            this.getNatMoney();
        },

        // 监听input事件
        inputChangeEvent(fieldname) {
            switch (fieldname) {
                case 'accountid':
                    this.HDData.accountid = '';
                    this.HDData.accountname = '';
                    this.HDData.acctfullname = '';
                    break;
                case 'dtcurrency':
                    this.HDData.dtcurrency = '';
                    this.HDData.dtexchange_rate = '';
                    break;
            }
        },

        save() {
            this.HDData.docitem = Number(this.HDData.docitem);
            this.HDData.money = Number(this.HDData.money);
            this.HDData.natmoney = Number(this.HDData.natmoney);
            this.HDData.dtexchange_rate = Number(this.HDData.dtexchange_rate);
            this.$api.fcashdocitem
                .saveData(this.HDData)
                .then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success('保存成功');
                        this.dialog.show = false;
                    } else {
                        this.$alert(res.message);
                    }
                    this.$emit('Refresh');
                })
                .catch(function (error) {
                    this.$message.error('保存出错：' + error);
                    // alert('保存出错：' + error);
                    console.log(error);
                });
        },

        getData(aa)
        {
            
        }
    }
};
</script>


<style type="text/css">
.el-row {
    margin-top: 10px;
    width: 100%;
}

/* 表格选择框的样式 */
.vxe-checkbox > input + .vxe-checkbox--icon {
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 1px solid #918f90;
    background-color: #fff;
    vertical-align: middle;
    border-radius: 0.2em;
    font-size: 16px;
}
</style>
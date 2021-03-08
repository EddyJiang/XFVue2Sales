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
            <!-- 内部dialog组件 -->
            <el-dialog ref="dialogs" title="型材型号列表" append-to-body :visible.sync="show" :close-on-click-modal="false" width="70%">
                <!-- 表格区域 -->
                <CommTable
                    ref="table"
                    :height="400"
                    :dataSource="itemTypeTableData"
                    :tableColumn="itemTypeTableColumn"
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
            <template>
                <el-form :rules="validrules" label-width="100px" size="mini" class="formDatastyle" style="padding-left: 10px">
                    <!-- 顶头部分 -->
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-form-item label="数据录入类型" prop="itemcode">
                                <!-- <el-select
                                    v-model="HDData.itemcode"
                                    :disabled="itemTypeDisabled"
                                    filterable
                                    clearable
                                    placeholder="请选择运输包装方式"
                                    style="width: 100%"
                                >
                                    <el-option v-for="item in itemTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select> -->
                                <el-input disabled v-model="HDData.itemcode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="matCodeShow">
                            <el-form-item label="型材编号" prop="matcode">
                                <SaleMatGeneral
                                    ref="matcode"
                                    :modelname="HDData.matcode"
                                    fieldname="matcode"
                                    placeholder="请输入型材编号"
                                    @selectData="inputEnterEvent"
                                    @inputChangeEvent="inputChangeEvent"
                                ></SaleMatGeneral>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="matCodeShow">
                            <el-form-item label="型材名称" prop="matname">
                                <el-input disabled v-model="HDData.matname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :offset="matCodeShow ? 0 : 12" :span="2">
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
                                        :dataSource="matTableData"
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
                                <el-row :gutter="20" v-if="rowShow[0]">
                                    <el-col :span="21">
                                        <el-form-item label="加工规格" prop="doccode">
                                            <el-input disabled v-model="HDData.doccode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-checkbox v-if="false" v-model="checkaaa[14]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[1]">
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
                                        <el-checkbox v-model="checkaaa[13]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[2]">
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
                                        <el-checkbox v-model="checkaaa[12]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[3]">
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
                                        <el-checkbox v-model="checkaaa[11]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[4]">
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
                                        <el-checkbox v-model="checkaaa[10]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[5]">
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
                                        <el-checkbox v-model="checkaaa[9]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[6]">
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
                                        <el-checkbox v-model="checkaaa[8]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[7]">
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
                                        <el-checkbox v-if="false" v-model="checkaaa[7]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[15]">
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
                                        <el-checkbox v-if="false" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[8]">
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
                                        <el-checkbox v-model="checkaaa[6]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[9]">
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
                                        <el-checkbox v-model="checkaaa[5]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[10]">
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
                                        <el-checkbox v-model="checkaaa[4]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[11]">
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
                                        <el-checkbox v-model="checkaaa[3]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[12]">
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
                                        <el-checkbox v-model="checkaaa[2]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[13]">
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
                                        <el-checkbox v-model="checkaaa[1]" label="锁定"></el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20" v-if="rowShow[14]">
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
                                        <el-checkbox v-model="checkaaa[0]" label="锁定"></el-checkbox>
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
import { isNull, isEmpty, padStart } from 'xe-utils/methods';

export default {
    // 数据
    data() {
        return {
            // 通用数据
            commEntity: this.$api.identity.getCommEntity(),

            show: false,

            // 选中的数据
            clickrow: [],

            headerData: [],

            detailData: [],

            headerDataRow: {},

            itemBomData: [],

            mainData: [],

            // 数据
            HDData: {
                doccode: this.doccode,
                itemcode: '',
                matcode: '',
                matname: '',
                docitem: '',
                rowid: '',
                cltmatcode: '',
                cltmatname: '',
                cltcv1: '',
                cltcv1name: '',
                erpdfit: '',
                erpcpvr: '',
                usercode: JSON.parse(localStorage.eleUser || '[]').username
            },

            model: {},

            itemTypeTableColumn: [
                { field: 'itemcode', title: '' },
                { field: 'itemname', title: '' }
            ],

            itemTypeTableData: [],

            matTableColumn: [
                { field: 'pos', title: '序号' },
                { field: 'matcode', title: '型材编号' },
                { field: 'matname', title: '型材名称' }
            ],

            matTableData: [],

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

            itemTypeDataRow: null,

            itemCode: '',

            isReadMatBom: true,

            matCodeShow: true,

            rowShow: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],

            checkaaa: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

            validrules: {}
        };
    },

    // 父页面传递过来的参数
    props: {
        dialog: Object,
        doccode: String,
        hdData: Object
    },

    // 加载完成
    created() {
        console.log(this.hdData);
        if (this.hdData != '' && this.hdData != null && this.dialog.options == 'update') {
            //复制源数据出来，再赋值，否则会修改列表源数据
            const copyArray = JSON.parse(JSON.stringify(this.hdData));
            this.HDData = copyArray;
        }

        this.getData(this.dialog.options);

        console.log('2');

        if (this.dialog.options == 'add') {
            // console.log(this.mainData);
            this.mainData.push({ pos: 0, matcode: '', matname: '' });
            this.addData();
            // this.show = true;
            // this.fetchTableData();
        } else {
            this.show = false;
        }

        console.log('0');
    },

    // 操作方法
    methods: {
        // 选择公司事件
        inputEnterEvent(data) {
            console.log(data);
            switch (data.fieldname) {
                case 'matcode':
                    // if (data.row.length <= 0) {
                    //     this.$message.warning('您所输入的型号有误或已停用！');
                    //     return;
                    // }
                    if (data.row.inactived == '1') {
                        this.$message.warning('物料未激活，请找技术咨询室！');
                        return;
                    }
                    if (data.row.stoped == '1') {
                        this.$message.warning('该型号已经停用货作废，不能使用！');
                        return;
                    }
                    const bomyn = Number(isNull(data.row.bomyn) ? 0 : data.row.bomyn);
                    if (this.isReadMatBom == false && bomyn == 1) {
                        this.$message.warning('您所输入型材是断桥组合料，不能在普通型材录入类型里继续编辑，请重新选择型材或重选录入类型。');
                        return;
                    }
                    if (this.isReadMatBom && bomyn == 0) {
                        this.$message.warning('您所输入型材非断桥组合料，不能在断桥型材录入类型里继续编辑，请重新选择型材或重选录入类型。');
                        return;
                    }
                    this.$refs.matcode.str = data.row.matcode;
                    this.HDData.matcode = data.row.matcode;
                    this.HDData.matname = data.row.matname;
                    this.resetData();
                    if (this.isReadMatBom) {
                    }
                    break;
                case 'dtcurrency':
                    this.$refs.dtcurrency.str = data.row.currency;
                    this.HDData.dtcurrency = data.row.currency;
                    this.HDData.dtexchange_rate = data.row.exchange_rate;
                    break;
            }
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

        getData(openType) {
            this.getDocData();
            switch (openType) {
                case 'add':
                    this.setFormData();
                    this.setItemBomDataTable(this.model);
                    break;
            }
            this.matTableData = this.mainData;
        },

        resetData() {
            this.getDocData();
            if (this.dialog.options == 'add') {
                this.HDData.rowid = '';
            } else {
            }
            this.setItemBomDataTable();
        },

        getDocData() {
            this.$api.slssalesorderhd
                .getDataOfDocAndItem(this.doccode)
                .then((res) => {
                    if (res.total > 0) {
                        // console.log(res);
                        let hd = res.rows.header;
                        this.detailData = res.rows.detail;
                        if (isNull(hd)) {
                            return;
                        }
                        if (hd.length <= 0) {
                            return;
                        }
                        this.headerDataRow = hd[0];
                        console.log('3');
                        console.log(this.headerDataRow);
                        if (isEmpty(this.headerDataRow.scraprate)) {
                            this.headerDataRow.scraprate = 0;
                        }
                    }
                })
                .catch(() => {});
        },

        setFormData() {
            this.model = this.$api.slssalesorderitem.FormData();
            this.model.doccode = this.doccode;
            this.model.rowid = '';
            this.model.cltmatcode = this.HDData.cltmatcode;
            this.model.cltmatname = this.HDData.cltmatname;
            this.model.cltcv1 = this.HDData.cltcv1;
            this.model.cltcv1name = this.HDData.cltcv1name;
            this.model.matcode = this.HDData.matcode;
            this.model.matname = this.HDData.matname;
            this.model.itemcode = this.itemCode;
            this.model.erpdfit = this.HDData.erpdfit;
            this.model.erpcpvr = this.HDData.erpcpvr;
        },

        setItemBomDataTable(model) {
            this.$api.slssalesorderitem
                .getDataOfAddItemBom(model)
                .then((res) => {
                    console.log(res);
                    this.itemBomData = res.rows;
                    this.mainData = this.itemBomData;
                    if (!isNull(this.itemBomData)) {
                        let aa = this.itemBomData.filter((item) => item.profile === 1 && item.pvc === 0);
                        if (aa.length > 0) {
                            this.mainData = JSON.parse(JSON.stringify(aa));
                        }
                        this.mainData = this.mainData.filter((item) => item.matcode === this.HDData.matcode);
                    }
                })
                .catch(() => {});
        },

        addData() {
            let aa = this.mainData[0];
            aa.itemcode = this.itemcode;
            aa.cv4 = 6000;
            aa.wghtmethod = this.headerDataRow.settlemethodid;
            console.log('1');
            console.log(this.headerDataRow);
            console.log(aa);
        },

        // 查询方法
        fetchTableData() {
            this.commEntity.options.loading = true;
            this.$api.slsitemtype.getDataByFormId({ formid: '21101' }).then((res) => {
                this.itemTypeTableData = res.rows;
                this.commEntity.pagination.total = res.total;
                this.commEntity.options.loading = false;
            });
        },

        // 单击事件
        cellClickEvent(row) {
            this.clickrow = row.row;
        },

        // 双击事件
        cellDBLClickEvent(row) {
            this.show = false;
            this.chooseData(row.row);
        },

        // 选定操作
        importClickEvent() {
            if (this.clickrow.length == 0) {
                this.$message.warning('请先选中数据');
                return;
            }
            this.show = false;
            this.chooseData(this.clickrow);
        },

        chooseData(row) {
            this.itemTypeDataRow = row;
            this.itemCode = row.itemcode;
            this.isReadMatBom = Boolean(Number(row.readmatbomyn));
            if (this.itemCode == 'HQ') {
                this.isReadMatBom = false;
            }
            // 获取编辑权限
            let dataEditOP = Number(row.dataeditop);
            // 获取复制权限
            let dataCopyOP = Number(row.datacopyop);
            // 表单行控制
            if (dataEditOP > 0) {
                this.formRowControl(dataEditOP);
            }
            // 复选框控制
            this.checkBoxControl(dataCopyOP);
            this.aaa(this.itemCode);
        },

        /**
         * C\S表单行控制跟复选框控制不一定相同，且顺序相反，注意！
         */

        formRowControl(dataEditOP) {
            // 将编辑权限转换成二进制
            let bit = dataEditOP.toString(2);
            // 补全编辑权限二进制，长度根据实际需求来定
            bit = padStart(bit, 15, '0');
            // 控制组件显示，代码只能控制前14个，后2个没控制到，不知道有何意义
            for (var i = 1; i <= bit.length; i++) {
                let isVisible = Boolean(Number(bit.substr(i - 1, 1)));
                if (i == 1) {
                    this.matCodeShow = isVisible;
                    continue;
                }
                this.rowShow[i - 2] = isVisible;
                // console.log(isVisible);
            }
        },

        // 这里checkbox是按数组14->0，C\S是50->35
        checkBoxControl(dataCopyOP) {
            // 将复制权限转换成二进制
            let bit = dataCopyOP.toString(2);
            // 补全复制权限二进制，长度根据实际需求来定
            bit = padStart(bit, 15, '0');
            for (var i = bit.length; i > 0; i--) {
                let isCheck = Boolean(Number(bit.substr(i - 1, 1)));
                this.checkaaa[i - 1] = isCheck;
            }
            // console.log(bit);
        },

        aaa(itemCode) {
            //主数据为空，返回
            //主数据行数为0，返回

            if (isNull(this.itemTypeDataRow)) {
                this.$message.error('找不到功能窗体相应录入类型数据，请联系系统管理员。');
                return;
            }
            let DefFieldNames = this.itemTypeDataRow.deffieldnames;
            let DefFieldValues = this.itemTypeDataRow.deffieldvalues;
            console.log('name:' + DefFieldNames + '; value:' + DefFieldValues);
            if (isEmpty(DefFieldNames) || isEmpty(DefFieldValues)) {
                return;
            }
            let Arr1 = DefFieldNames.split('/');
            let Arr2 = DefFieldValues.split('/');
            for (var i = 0; i < Arr1.length; i++) {
                let name = Arr1[i];
            }
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
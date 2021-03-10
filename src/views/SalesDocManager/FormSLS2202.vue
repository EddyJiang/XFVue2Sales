<!-- 2202 -- 销售订单明细 -->
<template>
    <div class="container">
        <!-- 面包屑 -->
        <Breadcrumb></Breadcrumb>
        <div class="container2">
            <!-- 工具栏-->
            <el-row class="self-margin-down" :gutter="20">
                <ActionTool
                    :disTools="disTools"
                    :ifdistools="ifdistools"
                    @BackTo="BackTo"
                    @okTableData="okTableData"
                    @addTableData="addTableData"
                    @cancelTableData="cancelTableData"
                    @delTableData="delTableData"
                    @exportFrom="exportFrom"
                    @savTableData="savTableData"
                    @freeTableData="freeTableData"
                    @Headerchange="Headerchange"
                ></ActionTool>
            </el-row>

            <el-row>
                <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" @click="itemRebuild">重算粉油</el-button>
                <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" @click="itemMemo">备注修改</el-button>
                <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" @click="1">重算粉油</el-button>
                <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" @click="1">重算粉油</el-button>
                <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" @click="1">重算粉油</el-button>
                <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" @click="1">重算粉油</el-button>
            </el-row>

            <!-- 表头信息 -->
            <template>
                <el-form ref="addFormData" :model="addFormData" label-width="100px" size="mini" class="formDatastyle" style="width: 85%">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="单据号" prop="doccode">
                                <el-input disabled v-model="addFormData.doccode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="单据类型" prop="doctype">
                                <el-input disabled v-model="addFormData.doctype"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="单据日期" prop="docdate">
                                <el-date-picker
                                    disabled
                                    v-model="addFormData.docdate"
                                    style="width: 100%"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="单据状态" prop="docstatus">
                                <el-input disabled v-model="addFormData.docstatus"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="损耗率" prop="scraprate">
                                <el-input disabled v-model="addFormData.scraprate"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同号" prop="contractno">
                                <el-input disabled v-model="addFormData.contractno"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="制单公司" prop="usertxthd3">
                                <el-input disabled v-model="addFormData.usertxthd3"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="销售类型" prop="slstype">
                                <el-input disabled v-model="addFormData.slstype"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="提货交货" prop="deldate">
                                <el-input disabled v-model="addFormData.deldate"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="计划交货" prop="planpickdate">
                                <el-input disabled v-model="addFormData.planpickdate"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="铝锭价" prop="alprice">
                                <el-input disabled v-model="addFormData.alprice"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <!-- <el-form-item label="" prop="hrname"> -->
                            <el-checkbox v-model="autoCombin" label="重复项自动合并"></el-checkbox>
                            <!-- </el-form-item> -->
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="公司编号" prop="companyid">
                                <el-input disabled v-model="addFormData.companyid"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="公司名称" prop="companyname">
                                <el-input disabled v-model="addFormData.companyname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="客户编号" prop="cltcode">
                                <el-input disabled v-model="addFormData.cltcode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="客户名称" prop="cltname">
                                <el-input disabled v-model="addFormData.cltname"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="提货仓库编号" prop="stcode">
                                <el-input disabled v-model="addFormData.stcode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="提货仓库名称" prop="stname">
                                <el-input disabled v-model="addFormData.stname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="业务员编号" prop="sdgroup">
                                <el-input disabled v-model="addFormData.sdgroup"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="业务员姓名" prop="sdgroupname">
                                <el-input disabled v-model="addFormData.sdgroupname"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="目的地省份" prop="shipstatename">
                                <el-input disabled v-model="addFormData.shipstatename"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="目的地城市" prop="shipcityname">
                                <el-input disabled v-model="addFormData.shipcityname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="目的地址1" prop="shipaddr1">
                                <el-input disabled v-model="addFormData.shipaddr1"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="目的地址2" prop="shipaddr2">
                                <el-input disabled v-model="addFormData.shipaddr2"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>

            <!-- 状态图片 -->
            <DocStatusImg :docstatus="addFormData.docstatus"></DocStatusImg>

            <br />

            <!-- 表格数据-->
            <EditTable
                ref="table"
                :dataSource="tableData"
                :tableColumn="tableColumn"
                :pagination="commEntity.pagination"
                :options="commEntity.options"
                :fetch="fetchTableData"
                :showfooter="true"
                @cellClickEvent="cellClickEvent"
                @saveRowEvent="saveRowEvent"
                :operationstate="operationstate"
                @cv1_edit="cv1_edit"
                :showindex="true"
                :entercolumn="entercolumn"
                :footerMethod="footerMethod"
            ></EditTable>
        </div>

        <Dialog2201
            :dialog="docDialog.dialog"
            :hdData="addFormData"
            @Refresh="refreshHeader(addFormData.doccode)"
            v-if="docDialog.dialog.show"
        ></Dialog2201>

        <Dialog2003
            :dialog="commEntity.dialog"
            :doccode="addFormData.doccode"
            :hdData="rowdata"
            @Refresh="fetchTableData(addFormData.doccode)"
            v-if="commEntity.dialog.show"
        ></Dialog2003>

        <Dialog2207 :dialog="memoDialog.dialog" :hdData="rowdata" v-if="memoDialog.dialog.show"></Dialog2207>
    </div>
</template>

<script>
import Dialog2201 from '@views/SalesDocManager/components/Dialog2201';
import Dialog2003 from '@views/SalesDocManager/components/Dialog2003';
import Dialog2207 from '@views/SalesDocManager/components/Dialog2207';
import { isEmpty, isNull } from 'xe-utils/methods';

export default {
    // 数据
    data() {
        return {
            // 通用数据
            commEntity: this.$api.identity.getCommEntity(),

            // 表头表单
            docDialog: this.$api.identity.getCommEntity(),

            // 备注表单
            memoDialog: this.$api.identity.getCommEntity(),

            rowdata: null,

            // 主表实体
            addFormData: this.$api.slssalesorderhd.addFormData(),

            //修改实体
            FormData: this.$api.slssalesorderitem.FormData(),

            list: {
                doccode: '' //传入dialog的条件
            },

            operationstate: false, //操作栏状态

            tableData2: [], //获取第一次输入框的数据

            // 表格数据
            tableData: [],

            entercolumn: ['digit', 'cv1', 'cv1name'],

            // 验证规则
            validrules: {
                matcode: [
                    {
                        required: true,
                        message: '物料编码不能为空',
                        trigger: 'blur'
                    }
                ],
                matname: [
                    {
                        required: true,
                        message: '物料名称不能为空',
                        trigger: 'blur'
                    }
                ],
                matgroup: [
                    {
                        required: true,
                        message: '物料组不能为空',
                        trigger: 'blur'
                    }
                ],
                digit: [
                    {
                        required: true,
                        message: '订单支数不能为空',
                        trigger: 'blur'
                    }
                ],

                cv1: [
                    {
                        required: true,
                        message: '颜色不能为空',
                        trigger: 'blur'
                    }
                ],
                cv1name: [
                    {
                        required: true,
                        message: '颜色名称不能为空',
                        trigger: 'blur'
                    }
                ],
                planddate: [
                    {
                        required: true,
                        message: '计划交期不能为空',
                        trigger: 'blur'
                    }
                ]
            },

            // 表格字段
            tableColumn: [
                {
                    field: 'docitem',
                    title: '项次',
                    width: 100
                },
                {
                    field: 'stcode',
                    title: '仓库',
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
                    title: '颜色编号',
                    width: 100
                },
                {
                    field: 'cv1name',
                    title: '颜色名称',
                    width: 100
                },
                {
                    field: 'cv2',
                    title: '材质编号',
                    width: 100
                },
                {
                    field: 'cv2name',
                    title: '材质名称',
                    width: 100
                },
                {
                    field: 'cv3',
                    title: '膜厚编号',
                    width: 100
                },
                {
                    field: 'cv3name',
                    title: '膜厚名称',
                    width: 100
                },
                {
                    field: 'cv4',
                    title: '长度',
                    width: 100
                },
                {
                    field: 'cv4varyyn',
                    title: '长度可变',
                    width: 100
                },
                {
                    field: 'isptyn',
                    title: '打胶',
                    width: 100
                },
                {
                    field: 'cv5',
                    title: '公差编号',
                    width: 100
                },
                {
                    field: 'cv5name',
                    title: '公差名称',
                    width: 100
                },
                {
                    field: 'cv8',
                    title: '包装方式编号',
                    width: 100
                },
                {
                    field: 'cv8name',
                    title: '包装方式名称',
                    width: 100
                },
                {
                    field: 'itemmemo',
                    title: '明细备注',
                    width: 100
                },
                {
                    field: 'usrtxt1',
                    title: '胶条类别',
                    width: 100
                },
                {
                    field: 'usrtxt6',
                    title: '文本ID',
                    width: 100
                },
                {
                    field: 'digit',
                    title: '支数订单',
                    width: 100
                },
                {
                    field: 'predigit',
                    title: '支数原订购数',
                    width: 100
                },
                {
                    field: 'pickdigit',
                    title: '支数出货',
                    width: 100
                },
                {
                    field: 'canceldigit',
                    title: '支数取消',
                    width: 100,
                    align: 'left'
                },
                {
                    field: 'opendigit',
                    title: '支数欠数',
                    width: 100
                },
                {
                    field: 'sfcdigit',
                    title: '支数已排产',
                    width: 100
                },
                {
                    field: 'min_digit',
                    title: '最小提货量',
                    width: 100
                },
                {
                    field: 'max_digit',
                    title: '最大提货量',
                    width: 100
                },
                {
                    field: 'discounttype',
                    title: '折扣编号',
                    width: 100
                },
                {
                    field: 'discounttypename',
                    title: '折扣名称',
                    width: 100
                },
                {
                    field: 'pricedigit',
                    title: '重量计价数量',
                    width: 100
                },
                {
                    field: 'price',
                    title: '重量单价',
                    width: 100
                },
                {
                    field: 'unitwght',
                    title: '重量单重',
                    width: 100
                },
                {
                    field: 'theorywght',
                    title: '重量理论重',
                    width: 100
                },
                {
                    field: 'totalmoney',
                    title: '重量金额',
                    width: 120
                },
                {
                    field: 'otherprice',
                    title: '面积单价',
                    width: 100
                },
                {
                    field: 'othermoney',
                    title: '面积金额',
                    width: 100
                },
                {
                    field: 'unitarea',
                    title: '面积单支',
                    width: 100
                },
                {
                    field: 'prdarea',
                    title: '面积总面积',
                    width: 100
                },
                {
                    field: 'actunitsqm',
                    title: '实方单价',
                    width: 100
                },
                {
                    field: 'actsqm',
                    title: '实方实方',
                    width: 100
                },
                {
                    field: 'theorysqm',
                    title: '实方理论方',
                    width: 100
                },
                {
                    field: 'totalmoney2',
                    title: '总金额',
                    width: 100
                },
                {
                    field: 'wghtmethod',
                    title: '结算编号',
                    width: 100
                },
                {
                    field: 'wghtmethodname',
                    title: '结算名称',
                    width: 100
                },
                {
                    field: 'uom',
                    title: '单位',
                    width: 100
                },
                {
                    field: 'pgroupcode',
                    title: '型材价格组编号',
                    width: 100
                },
                {
                    field: 'pgroupname',
                    title: '型材价格组名称',
                    width: 100
                },
                {
                    field: 'contractno',
                    title: '合同号码',
                    width: 100
                },
                {
                    field: 'contractrowid',
                    title: '合同标识',
                    width: 100
                },
                {
                    field: 'pvcitemcode',
                    title: '胶条号',
                    width: 100
                },
                {
                    field: 'itemcode',
                    title: '型材标识',
                    width: 100
                },
                {
                    field: 'scraprate',
                    title: '客户接收损耗率（%）',
                    width: 100
                },
                {
                    field: 'cltmatcode',
                    title: '客户型号',
                    width: 100
                },
                {
                    field: 'cltmatname',
                    title: '客户型号名称',
                    width: 100
                },
                {
                    field: 'erpmatcode',
                    title: '型材流水号',
                    width: 100
                },
                {
                    field: 'cltcv1',
                    title: '客户颜色',
                    width: 100
                },
                {
                    field: 'cltcv1name',
                    title: '客户颜色名称',
                    width: 100
                },
                {
                    field: 'labelmemo',
                    title: '型号标签',
                    width: 100
                },
                {
                    field: 'custpono',
                    title: '客户订单行号',
                    width: 100
                },
                {
                    field: 'qmcode',
                    title: '质量编号',
                    width: 100
                },
                {
                    field: 'qmname',
                    title: '质量名称',
                    width: 100
                },
                {
                    field: 'erpdfit',
                    title: '子客户公司',
                    width: 100
                },
                {
                    field: 'erpcpvr',
                    title: '子客户单号',
                    width: 100
                },
                {
                    field: 'alprice',
                    title: '铝锭价',
                    width: 100
                }
            ],

            // 工具栏动态操作
            disTools: [
                {
                    name: 'BackTo',
                    value: true
                },
                {
                    name: 'okTableData',
                    value: false
                },
                {
                    name: 'cancelTableData',
                    value: true
                },
                {
                    name: 'addTableData',
                    value: false
                },
                {
                    name: 'exportFrom',
                    value: false
                },
                {
                    name: 'delTableData',
                    value: false
                },
                {
                    name: 'saveRowEvent',
                    value: false
                }
            ],

            // 是否启用按钮验证
            ifdistools: '',

            autoCombin: ''
        };
    },

    // 加载完成
    created() {
        console.log(this.$route.params.multipleSelection);
        // 渲染表头数据
        if (this.$route.params.multipleSelection) {
            this.addFormData = this.$route.params.multipleSelection;
            // 如果状态大于等于50，隐藏 新增，修改，确认
            if (this.addFormData.docstatus >= 50) {
                this.ifdistools = 'true';
                this.operationstate = true;
            }
            this.fetchTableData(this.addFormData.doccode);
        } else {
            // var dateNow=,
            (this.addFormData.DocDate = this.$moment().subtract('days', 0).format('YYYY-MM-DD')),
                (this.addFormData.DelDate = this.$moment().subtract('days', 0).format('YYYY-MM-DD')),
                (this.addFormData.AlPriceDate = this.$moment().subtract('days', 0).format('YYYY-MM-DD')),
                (this.addFormData.AlPrice = 0),
                (this.addFormData.FormID = 21101),
                (this.addFormData.DocStatus = 0),
                (this.addFormData.SLSType = 'P'),
                (this.addFormData.EnterName = JSON.parse(localStorage.eleUser || '[]').usercode),
                (this.addFormData.EnterDate = this.$moment().subtract('days', 0).format('YYYY-MM-DD')),
                (this.addFormData.Companyid = JSON.parse(localStorage.eleUser || '[]').companyid),
                (this.addFormData.CompanyName = JSON.parse(localStorage.eleUser || '[]').companyname),
                (this.addFormData.Usertxthd3 = JSON.parse(localStorage.eleUser || '[]').companyid),
                (this.addFormData.Hdcurrency = 'RMB'),
                (this.addFormData.HdCurrencyName = '人民币'),
                (this.addFormData.Hdcurrencyrate = 1),
                (this.addFormData.ProcMethodId = 'H003'),
                (this.addFormData.ProcMethodName = ''),
                (this.addFormData.AlpriceMethod = 1),
                (this.addFormData.QMCode = '001'),
                (this.addFormData.QMName = ''),
                (this.addFormData.TPPackageType = 0);
        }
    },
    // 引用组件
    components: {
        Dialog2201,
        Dialog2003,
        Dialog2207
    },
    // 操作方法
    methods: {
        // 返回按钮
        BackTo() {
            this.$router.push({
                name: '2002',
                params: {
                    formid: 2002
                }
            });
        },

        // 选择公司事件
        inputEnterEvent(row) {
            this.$refs.ocompany.str = row.companyid;
            this.addFormData.companyid = row.companyid;
            this.addFormData.companyname = row.companyname;
        },

        // 选择部门事件
        ocostcenterEvent(row) {
            this.$refs.ocostcenter.str = row.cccode;
            this.addFormData.cccode = row.cccode;
            this.addFormData.ccname = row.ccname;
        },

        // 选择仓库事件
        stcodeEvent(row) {
            this.$refs.stcode.str = row.stcode;
            this.addFormData.stcode = row.stcode;
            this.addFormData.stname = row.stname;
        },

        // 查询按钮
        fetchTableData(doccode) {
            this.rowdata = null;
            this.$api.slssalesorderitem.getbydoc(doccode).then((res) => {
                this.tableData = res.rows;
                this.commEntity.pagination.total = res.total;
            });
        },
        // 表尾合计
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                        return '和值';
                    }
                    // if (["digit", "totalmoney"].includes(column.property)) {
                    //   return XEUtils.sum(data, column.property);
                    // }
                    return '';
                })
            ];
        },
        // 新增按钮
        exportFrom() {
            this.commEntity.dialog.show = false;
            this.$nextTick(() => {
                this.list.doccode = this.addFormData.doccode;
                this.commEntity.dialog.options = 'Assign';
                this.commEntity.dialog.title = '物料';
                this.commEntity.dialog.show = true;
            });
        },
        splitNum(num, n, symbol) {
            if (!num) throw new Error('splitNum需要传入一个待转换的数据');
            if (typeof num !== 'number') throw new TypeError('num参数应该是一个number类型');
            if (n < 0) throw new Error('参数n不应该小于0');
            var hasDot = parseInt(num) != num; //这里检测num是否为小数，true表示小数
            var m = n != undefined && n != null ? n : 1;
            num = m == 0 ? num.toFixed(m) + '.' : hasDot ? (n ? num.toFixed(n) : num) : num.toFixed(m);
            symbol = symbol || ',';
            num = num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function (match, p1, p2) {
                return p1 + symbol;
            });
            if (n == 0 || (!hasDot && !n)) {
                //如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
                num = num.substring(0, num.indexOf('.'));
            }
            return num;
        },
        // 点击行事件
        cellClickEvent(row) {
            this.rowdata = row.row;
        },
        addTableData() {
            // console.log(this.addFormData.doccode);
            // if (this.addFormData.doccode == null || this.addFormData.doccode == '') {
            //     this.$message.warning('请生成单据 才能添加');
            // } else {
            //     this.$refs.table.insertEvent();
            // }
            if (this.addFormData.doccode == null || this.addFormData.doccode == '') {
                this.$message.warning('请生成单据 才能添加');
            } else {
                // this.$refs.table.insertEvent();
                this.$nextTick(() => {
                    this.commEntity.dialog.options = 'add';
                    this.commEntity.dialog.title = '新增';
                    this.commEntity.dialog.show = true;
                });
            }
        },
        // 修改明细按钮
        saveRowEvent(row) {
            this.FormData.doccode = row.row.doccode;
            this.FormData.rowid = row.row.rowid;
            this.FormData.matcode = row.row.matcode;
            this.FormData.matgroup = row.row.matgroup;
            this.FormData.matname = row.row.matname;
            this.FormData.cv1 = row.row.cv1;
            this.FormData.cv1name = row.row.cv1name;
            this.FormData.cv2 = row.row.cv2;
            this.FormData.cv2name = row.row.cv2name;
            this.FormData.cv3 = row.row.cv3;
            this.FormData.cv3name = row.row.cv3name;
            this.FormData.cv4 = row.row.cv4;
            this.FormData.cv5 = row.row.cv5;
            this.FormData.digit = row.row.digit;

            const array = [];
            array.push(this.FormData);
            if (row.type == 'update') {
                this.$api.slssalesorderitem
                    .update(row.row)
                    .then((res) => {
                        if (res.code == 200) {
                            this.$message.success('修改成功');
                            this.fetchTableData(row.row.doccode);
                            return;
                        } else {
                            this.$message.warning('修改失败：' + res.message);
                            this.fetchTableData(row.row.doccode);
                            return;
                            this.form.console.warn('hes');
                        }
                    })
                    .catch(function (error) {
                        this.$message.success('修改出错：' + error);
                        console.log(error);
                    });
                return;
            } else if (row.type == 'add') {
                if (this.addFormData.doccode != '' && this.addFormData.doccode != null) {
                    this.$api.slssalesorderitem
                        .add(this.addFormData.doccode, row.row)
                        .then((res) => {
                            this.$message.success('新增成功');
                            this.fetchTableData(this.addFormData.doccode);
                        })
                        .catch(function (error) {
                            this.$message.success('新增出错：' + error);
                            console.log(error);
                        });
                } else {
                    this.$message.warning('请生成单据');
                }
            }
        },
        // 删除明细按钮
        delTableData() {
            if (this.rowdata == null) {
                this.$message.warning('请选中数据');
                return;
            } else {
                this.$confirm('是否删除当前记录？一旦删除，单据记录将无法进行恢复！', '单据记录删除')
                    .then(() => {
                        this.$api.slssalesorderitem
                            .delete(this.rowdata.doccode, this.rowdata.rowid)
                            .then((res) => {
                                console.log(res);
                                if (!isEmpty(res) && res.code == '200') {
                                    this.$message.success('删除成功');
                                    this.fetchTableData(this.rowdata.doccode);
                                } else {
                                    //     this.$message.warning('删除失败：' + res.message);
                                    //     return;
                                    //     this.form.console.warn('hes');
                                }
                            })
                            .catch((error) => {
                                this.$alert('保存出错：' + error);
                                console.log(error);
                            });
                    })
                    .catch(() => {});
            }
        },

        // 确认按钮
        okTableData() {
            this.$api.slssalesorderhd.conifrmdoc(this.addFormData.doccode, 1, this.addFormData.hrcode, '').then((res) => {
                if (res.code == 200) {
                    this.$message.success('确认成功');
                    this.ifdistools = 'true';
                    this.operationstate = true;
                    this.addFormData.docstatus = 50;
                    return;
                } else {
                    this.$alert(
                        '确认失败:' + JSON.parse(res.message)[0].Memo == null ? res.message : JSON.parse(res.message)[0].Memo,
                        '错误提示',
                        {
                            confirmButtonText: '确定',
                            callback: (action) => {
                                //方法
                            }
                        }
                    );
                    return;
                    this.form.console.warn('hes');
                }
            });
        },
        // 取消按钮
        cancelTableData() {
            if (this.addFormData.docstatus == 50) {
                this.$api.slssalesorderhd.examinedoc(this.addFormData.doccode, this.addFormData.hrcode, '', '', '').then((res) => {
                    if (res.code == 200) {
                        this.$message.success('取消确认成功');
                        this.ifdistools = 'false';
                        this.operationstate = false;
                        this.addFormData.docstatus = 0;
                        return;
                    } else {
                        this.$alert('取消确认失败:' + res.message, '错误提示', {
                            confirmButtonText: '确定',
                            callback: (action) => {}
                        });
                        return;
                        this.form.console.warn('hes');
                    }
                });
            } else {
                this.$message({
                    message: '单据已审核,不能做取消操作',
                    type: 'warning'
                });
            }
        },
        //保存表头
        savTableData() {
            this.$api.slssalesorderhd
                .save(this.addFormData)
                .then((res) => {
                    // if (res.status == 201) {
                    //   // this.$message.success("保存成功");
                    //  this.addFormData=res;
                    if (res != undefined) {
                        this.addFormData = res;
                        alert('保存成功');
                    } else {
                        this.$alert(res.message);
                    }
                })
                .catch(function (error) {
                    // this.$message.success('修改出错：'+error);
                    alert('修改出错：' + error);
                    console.log(error);
                });
        },

        freeTableData() {
            this.$api.slssalesorderhd
                .getby(this.addFormData.doccode)
                .then((res) => {
                    if (isEmpty(res) || res.total < 1 || res.rows[0].docstatus != 0) {
                        this.$message.warning('单据状态不正确，不允许作废！');
                        return;
                    }
                    this.$api.slssalesorderhd
                        .scrapdoc()
                        .then((res) => {
                            // console.log(res);
                            if (!isEmpty(res)) {
                                if (res.code == 200) {
                                    this.addFormData.blscrap = 1;
                                    this.ifdistools = '';
                                    this.$message.success('单据作废成功！');
                                }
                            }
                        })
                        .catch((error) => {
                            alert(error);
                        });
                })
                .catch(() => {});
        },

        Headerchange() {
            this.$nextTick(() => {
                this.docDialog.dialog.options = 'update';
                this.docDialog.dialog.title = '修改';
                this.docDialog.dialog.show = true;
            });
        },

        // 重算粉油
        itemRebuild() {
            if (isEmpty(this.addFormData.doccode)) {
                this.$message.warning('单号不能为空！');
                return;
            }
            this.$api.slssalesorderitem
                .itemRebuild({ doccode: this.addFormData.doccode })
                .then((res) => {
                    if (!isEmpty(res) && res.code == 200) {
                        this.$message.success('重算成功！');
                    } else {
                        this.$message.error('重算失败，请联系管理员！');
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        },

        // 备注修改
        itemMemo() {
            if (isNull(this.rowdata)) {
                this.$message.warning('请选中数据');
                return;
            }
            let rowid = this.rowdata.rowid;
            let itemcode = this.rowdata.itemcode;
            let doccode = this.addFormData.doccode;
            if (!isEmpty(doccode) && !isEmpty(rowid)) {
                this.$nextTick(() => {
                    this.memoDialog.dialog.options = 'update';
                    this.memoDialog.dialog.title = '修改';
                    this.memoDialog.dialog.show = true;
                });
            }
        },

        //机型弹窗 获取数据
        cv1_edit(row, nul) {
            if (nul.isTrusted == true) {
                this.tableData2 = row;
                this.$nextTick(() => {
                    this.$refs.Log.showdiolog();
                });
            } else {
                row.row.cv1 = nul;
            }
        },
        cv1name_edit(row, nul) {
            row.row.cv1name = nul;
        }
    }
};
</script>
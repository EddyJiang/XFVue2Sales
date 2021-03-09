<template>
    <div class="dialog">
        <!-- 弹出层 -->
        <!-- 多层级关系，添加append-to-body，保证内外层 Dialog 和遮罩层级关系的正确 -->
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            width="50%"
            :close-on-click-modal="false"
            :close-on-press-eacape="false"
            :modal-append-to-body="false"
            :validate-on-rule-change="false"
            append-to-body
        >
            <template>
                <el-form label-width="100px" size="mini" class="formDatastyle" style="padding-left: 10px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="价目表编号" prop="plistid">
                                <!-- 整合下面方法，fieldname为字段名称，用于区分 -->
                                <Spricelist
                                    ref="plistid"
                                    :modelname="HDData.plistid"
                                    fieldname="plistid"
                                    placeholder="请输入价目表编号"
                                    @selectData="inputEnterEvent"
                                    @inputChangeEvent="inputChangeEvent"
                                ></Spricelist>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="价目表名称" prop="plistname">
                                <el-input class="entertrue" disabled v-model="HDData.plistname" placeholder="请输入价目表名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="铝锭取价" prop="alpricemethod">
                                <el-select
                                    class="entertrue"
                                    v-model="HDData.alpricemethod"
                                    placeholder="请选择铝锭取价方式"
                                    @change="alPriceMethodChangeEvent"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="item in alPriceMethodOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-form-item label="铝锭取价日" prop="alpricedate">
                                <el-date-picker
                                    :disabled="this.alPriceDateDiabled"
                                    v-model="HDData.alpricedate"
                                    style="width: 100%"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选择铝锭取价日"
                                    @change="alPriceDateChangeEvent"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="铝锭价" prop="alprice">
                                <el-input :disabled="this.alPriceDiabled" v-model="HDData.alprice" placeholder="计算得出铝锭价"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-button :disabled="this.btnCalcAlPriceDisabled" size="mini" @click="calcAlPrice">计算铝锭价</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
            <!-- 弹出层操作按钮 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="save()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { isEmpty } from 'xe-utils/methods';
export default {
    // 数据
    data() {
        return {
            // 通用数据
            commEntity: this.$api.identity.getCommEntity(),

            //组件disabled默认值
            alPriceDateDiabled: false,
            alPriceDiabled: false,
            btnCalcAlPriceDisabled: false,

            // 数据
            HDData: {
                formid: 21101,
                doccode: '',
                docstatus: 0,
                companyid: JSON.parse(localStorage.eleUser || '[]').companyid,
                companyname: JSON.parse(localStorage.eleUser || '[]').companyName,
                slstype: 'P',
                doctype: '',
                sdgroup: '',
                sdgroupname: '',
                docdate: this.$moment().format('YYYY-MM-DD'),
                deldate: '',
                alpricemethod: '',
                usertxthd3: JSON.parse(localStorage.eleUser || '[]').companyid,
                cltcode: '',
                cltname: '',
                cltcode2: '',
                cltname2: '',
                prncltcode: '',
                prncltname: '',
                sdorgid: '',
                sdorgname: '',
                stcode: '',
                stname: '',
                supplycompanyid: '',
                supplycompanyname: '',
                supplyabbrname: '',
                plistid: '',
                plistname: '',
                settlemethodid: '',
                settlemethodname: '',
                hdcurrency: '',
                hdcurrencyname: '',
                hdcurrencyrate: '',
                qmcode: '',
                qmname: '',

                //选填部分
                doctype2: '',
                followcode: '',
                followname: '',
                labeltype: '',
                projectno: '',
                projectname: '',
                cprj: '',
                scraprate: '',
                citt: '',
                cittname: '',
                contractno: '',
                paymentcode: '',
                paymentname: '',
                alpricedate: '',
                alprice: '',
                picktype: '',
                picktypename: '',
                procmethodid: '',
                procmethodname: '',
                vattype: '',
                vatname: '',
                vatrate: '',
                shipstate: '',
                shipstatename: '',
                shipcity: '',
                shipcityname: '',
                shipaddr1: '',
                shipaddr2: '',
                usertxthd1: '',
                custpoorder: '',
                usertxthd2: '',
                tppackagetype: '0',
                entername: JSON.parse(localStorage.eleUser || '[]').username,
                enterdate: this.$moment().format('YYYY-MM-DD')
            },

            // 铝锭取价方式下拉数组
            alPriceMethodOptions: []

            // 按订单铝锭价 1
            // 按铝锭取价日定价 2
            // 按合同固定价 3
            // 按装车发货日定价 4
            // 按本周平均价 6
        };
    },
    // 父页面传递过来的参数
    props: {
        dialog: Object,
        hdData: Object,
        currentType: String
    },
    // 加载完成
    created() {
        console.log(this.hdData);
        if (!isEmpty(this.hdData)) {
            //复制源数据出来，再赋值，否则会修改列表源数据
            const copyArray = JSON.parse(JSON.stringify(this.hdData));
            this.HDData = copyArray;
        }
        this.getOptionsData();
        console.log(this.HDData);
    },

    // 操作方法
    methods: {
        // 选择公司事件
        inputEnterEvent(data) {
            console.log(data);
            switch (data.fieldname) {
                case 'plistid':
                    this.$refs.plistid.str = data.row.plistid;
                    this.HDData.plistid = data.row.plistid;
                    this.HDData.plistname = data.row.plistname;
                    this.calcAlPrice();
                    break;
            }
        },

        // 监听input事件
        inputChangeEvent(fieldname) {
            switch (fieldname) {
                case 'plistid':
                    this.HDData.plistid = '';
                    this.HDData.plistname = '';
                    break;
            }
            console.log(fieldname);
        },

        getOptionsData() {
            // 获取铝锭取价方式
            this.$api.salesysdict.getDataByDictId('-275105').then((res) => {
                for (var index in res.rows) {
                    this.alPriceMethodOptions.push({ label: res.rows[index].dictvalue, value: res.rows[index].intervalue });
                }
            });
        },

        save() {
            if (isEmpty(this.HDData.plistid) || isEmpty(this.HDData.plistname)) {
                this.$message.warning('请输入正确的价目表！');
                return;
            }
            if (isEmpty(this.HDData.alpricemethod)) {
                this.$message.warning('请选择正确的铝锭取价方式！');
                return;
            }
            if (
                this.HDData.alpricemethod == '2' &&
                (isEmpty(this.HDData.alpricedate) || this.$moment(this.HDData.alpricedate).isSame('0001-01-01 00:00:00'))
            ) {
                this.$message.warning('请输入铝锭取价日期！');
                return;
            }
            if (Number(this.HDData.alprice) <= 0) {
                this.$message.warning('请输入正确的铝锭价！');
                return;
            }
            this.$api.slssalesorderhd
                .updateAlPrice(this.HDData)
                .then((res) => {
                    if (!isEmpty(res) && res.code == '200') {
                        this.$message.success('保存成功');
                        this.dialog.show = false;
                    } else {
                        this.$alert(res.message);
                    }
                    this.$emit('Refresh');
                })
                .catch((error) => {
                    this.$alert('保存出错：' + error);
                    console.log(error);
                });
        },

        alPriceMethodChangeEvent(value) {
            if (value == '1') {
                if (this.currentType == '1') {
                    this.alPriceDateDiabled = false;
                    this.alPriceDiabled = false;
                    this.HDData.alpricedate = this.HDData.docdate;
                } else if (this.currentType == '2') {
                    this.alPriceDateDiabled = true;
                    this.alPriceDiabled = false;
                    this.HDData.alpricedate = '';
                }
            } else if (value == '2' || value == '6') {
                this.alPriceDateDiabled = false;
                this.alPriceDiabled = false;
                if (this.$moment(this.HDData.alpricedate).isSameOrBefore('0001-01-01 00:00:00')) {
                    this.HDData.alpricedate = this.HDData.docdate;
                }
            } else {
                this.HDData.alpricedate = '';
                this.HDData.alprice = 0;
                this.alPriceDateDiabled = true;
                this.alPriceDiabled = true;
            }
        },

        alPriceDateChangeEvent(value) {
            // console.log(value);
            if (
                this.$moment(this.HDData.alpricedate).isSame('0001-01-01 00:00:00') ||
                this.$moment(this.HDData.alpricedate).isSame('1980-01-01 00:00:00')
            ) {
                this.HDData.alpricedate = '';
            } else {
                this.calcAlPrice();
            }
        },

        calcAlPrice() {
            let alpricemethod = this.HDData.alpricemethod;
            if (isEmpty(alpricemethod)) {
                this.$message.warning('请选择铝锭取价方式！');
                return;
            }

            if (alpricemethod == '2') {
                // if (this.HDData.hdcurrency == '') {
                //     this.$message.warning('请先输入币种信息！');
                //     return;
                // }
                this.$api.spricingmetaprice
                    .getBilledPrice({ plistid: this.HDData.plistid, purdate: this.HDData.alpricedate, currency: this.HDData.hdcurrency })
                    .then((res) => {
                        // console.log(res);
                        if (res.total > 0) {
                            this.HDData.alprice = res.rows[0].billedprice;
                        } else {
                            this.$message.warning('没有找到相应的铝锭价，请联系采购部维护数据！');
                        }
                    })
                    .catch(() => {});
            } else if (alpricemethod == '6') {
                // 对monment.week设置星期日为第一天，与后端同步
                this.$moment.updateLocale('en', {
                    week: {
                        dow: 0, // 星期的第一天是星期日
                        doy: 6 // 年份的第一周必须包含1月1日 (7 + 0 - 1)
                    }
                });
                // 定义一个铝锭取价日期
                let alPriceDate = this.$moment(this.HDData.alpricedate);
                // 获取铝锭取价日期所在星期属于第几天
                let weekday = alPriceDate.weekday();
                // 获取铝锭取价日期所在星期的第一天
                let begindate = alPriceDate.subtract(weekday, 'days').format('YYYY-MM-DD');
                // 获取铝锭取价日期所在星期最后一天，由于moment源数据会改变，直接+6就好
                let enddate = alPriceDate.add(6, 'days').format('YYYY-MM-DD');
                // 获取铝锭周平均价
                this.$api.spricingmetaprice
                    .getBilledPriceAvg({ begindate, enddate, plistid: this.HDData.plistid })
                    .then((res) => {
                        if (res.total > 0) {
                            this.HDData.alprice = res.rows[0].avgvalue;
                        }
                    })
                    .catch(() => {});
            }
        }
    }
};
</script>
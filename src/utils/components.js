// 全局通用组件
import ActionTool from "@components/ActionTool";
import Breadcrumb from "@components/Breadcrumb";
import CommTable from "@components/CommTable";
import Currencyrate from "@components/Dialog/Currencyrate"; // 币种列表组件
import Departmental from "@components/Dialog/Departmental"; // 部门组件
import DocStatusImg from "@components/DocStatusImg";
import EditTable from "@components/EditTable";
import Gopcodesystem from "@components/Dialog/Gopcodesystem"; // 客户对照系统列表组件
import Gsettlemethod from "@components/Dialog/Gsettlemethod"; // 重量结算方式列表组件
import Ocompany from "@components/Dialog/Ocompany"; // 公司列表组件
import Osdgroup from "@components/Dialog/Osdgroup"; // 业务员列表组件
import Ostorage from "@components/Dialog/Ostorage"; // 仓库列表组件
import PrcAccctCodeAccessList from "@components/Dialog/price/PrcAccctCodeAccessList"; // 结算--公司会计科目列表组件
import PrcCashAccount from "@components/Dialog/price/PrcCashAccount"; // 结算--资金账户列表组件
import PrcCompany from "@components/Dialog/price/PrcCompany"; // 结算--公司列表组件
import PrcCostCenter from "@components/Dialog/price/PrcCostCenter"; // 结算--收款部门列表组件
import PrcCurrency from "@components/Dialog/price/PrcCurrency"; // 结算--币种汇率列表组件
import PrcSDGroup from "@components/Dialog/price/PrcSDGroup"; // 结算--业务员列表组件
import PrcSDOrg from "@components/Dialog/price/PrcSDOrg"; // 结算--组织列表组件
import PrcCltCompany from "@components/Dialog/price/PrcCltCompany"; // 结算--客户列表组件
import QMSlevel from "@components/Dialog/QMSlevel"; // 质量码清单列表组件
import Scltgeneral from "@components/Dialog/Scltgeneral"; // 客户列表组件
import Slscontracthd from "@components/Dialog/Slscontracthd"; // 合同组件
import Slscltproject from "@components/Dialog/Slscltproject"; // 客户项目组件
import Spricelist from "@components/Dialog/Spricelist"; // 物料价目表  
import Vcltcompany from "@components/Dialog/Vcltcompany"; // 经销商列表组件
// import Typedata from "@components/Dialog/Typedata";//机型
// import Pvndgeneral from "@components/Dialog/Pvndgeneral"; // 供应商列表组件
// import Gpaytype from "@components/Dialog/Gpaytype"; // 付款方式列表组件
// import Gvattype from "@components/Dialog/Gvattype"; // 税票列表组件
// import Picktype from "@components/Dialog/Picktype"; // 收货方式
// import Reference from "@components/Dialog/Reference";//可收货的采购订单
// import ReadBaoFeiMatcode from "@components/Dialog/ReadBaoFeiMatcode";//可报废模具信息
// import MdReason from "@components/Dialog/MdReason";//可报废模具信息
// import Ostoragebin from "@components/Dialog/Ostoragebin";//查询库位
// import Workcenter from "@components/Dialog/Workcenter";//查询车间
// import Machine from "@components/Dialog/Machine";//查询车间机台
// import GetMjMatStOragelots from "@components/Dialog/GetMjMatStOragelots";//查询可用模具
// import Frequency from "@components/Dialog/Frequency";//查询班次组件
// import Factoryinformation from "@components/Dialog/Factoryinformation";//查询班次组件
// import Accountcanbemodified from "@components/Dialog/Accountcanbemodified";//查询可修改的台账
// import XdXatCaseBox from "@components/Dialog/XdXatCaseBox";//查询模框组件
// import UsreNvironment from "@components/Dialog/UsreNvironment";//查询模框组件
// import GetDtData from "@components/Dialog/GetDtData";//查询模框组件




//首页组件
// import ChartCard from "@components/Dialog/homepage/ChartCard";//卡片组件
// import Trend from "@components/Dialog/homepage/Trend";//头部图片组件
// import RankList from "@components/Dialog/homepage/RankList";//中部表格组件



export default (Vue) => {
        Vue.component("ActionTool", ActionTool);
        Vue.component("Breadcrumb", Breadcrumb);
        Vue.component("CommTable", CommTable);
        Vue.component("Currencyrate", Currencyrate);
        Vue.component("Departmental", Departmental);
        Vue.component("DocStatusImg", DocStatusImg);
        Vue.component("EditTable", EditTable);
        Vue.component("Gopcodesystem", Gopcodesystem);
        Vue.component("Gsettlemethod", Gsettlemethod);
        Vue.component("Ocompany", Ocompany);
        Vue.component("Osdgroup", Osdgroup);
        Vue.component("Ostorage", Ostorage);
        Vue.component("PrcAccctCodeAccessList", PrcAccctCodeAccessList);
        Vue.component("PrcCashAccount", PrcCashAccount);
        Vue.component("PrcCompany", PrcCompany);
        Vue.component("PrcCostCenter", PrcCostCenter);
        Vue.component("PrcCurrency", PrcCurrency);
        Vue.component("PrcSDGroup", PrcSDGroup);
        Vue.component("PrcSDOrg", PrcSDOrg);
        Vue.component("PrcCltCompany", PrcCltCompany);
        Vue.component("QMSlevel", QMSlevel);
        Vue.component("Scltgeneral", Scltgeneral);
        Vue.component("Slscontracthd", Slscontracthd);
        Vue.component("Slscltproject", Slscltproject);
        Vue.component("Spricelist", Spricelist);
        Vue.component("Vcltcompany", Vcltcompany);
        // Vue.component("Typedata", Typedata),
        // Vue.component("Pvndgeneral", Pvndgeneral),
        // Vue.component("Gpaytype", Gpaytype),
        // Vue.component("Gvattype", Gvattype),
        // Vue.component("Currencyrate", Currencyrate),
        // Vue.component("Picktype", Picktype),                
        // Vue.component("Reference", Reference),
        // Vue.component("ReadBaoFeiMatcode", ReadBaoFeiMatcode),
        // Vue.component("MdReason", MdReason),
        // Vue.component("Ostoragebin", Ostoragebin)
        // Vue.component("GetMjMatStOragelots", GetMjMatStOragelots)
        // Vue.component("Workcenter",Workcenter)
        // Vue.component("Machine",Machine)
        // Vue.component("Frequency",Frequency)
        // Vue.component("XdXatCaseBox",XdXatCaseBox)
        // Vue.component("UsreNvironment",UsreNvironment)
        // Vue.component("GetDtData",GetDtData)

        // Vue.component("Accountcanbemodified",Accountcanbemodified)
        // Vue.component("Factoryinformation",Factoryinformation)

        // Vue.component("ChartCard", ChartCard),
        // Vue.component("Trend", Trend),
        // Vue.component("RankList", RankList)



}
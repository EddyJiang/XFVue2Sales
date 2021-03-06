/** 
 * api接口的统一出口
 */
import currency from '../api/cmmApi/currency';
import fcashdoc from '../api/priceApi/fcashdoc';
import fcashdocitem from '../api/priceApi/fcashdocitem';
import gdeliveryterm from '../api/cmmApi/gdeliveryterm';
import gopcodesystem from '../api/cmmApi/gopcodesystem';
import gpaytype from '../api/cmmApi/gpaytype';
import gsettlemethod from '../api/cmmApi/gsettlemethod';
import gvattype from '../api/cmmApi/gvattype';
import identity from '../api/sysAdmin/identity';
import imatspec from '../api/cmmApi/imatspec';
import mid_actiontype from '../api/sysAdmin/mid_actiontype';
import mid_gform from '../api/sysAdmin/mid_gform';
import mid_menu from '../api/sysAdmin/mid_menu';
import mid_module from '../api/sysAdmin/mid_module';
import ocity from '../api/cmmApi/ocity';
import oprovince from '../api/cmmApi/oprovince';
import osdgroup from '../api/cmmApi/osdgroup';
import osdorg from '../api/cmmApi/osdorg';
import prccltcompany from '../api/priceApi/prccltcompany';
import prccompany from '../api/priceApi/prccompany';
import prccostcenter from '../api/priceApi/prccostcenter';
import prcsdgroup from '../api/priceApi/prcsdgroup';
import prcsdorg from '../api/priceApi/prcsdorg';
import qmslevel from '../api/cmmApi/qmslevel';
import salecltcompany from '../api/SalesApi/salecltcompany';
import salecltgeneral from '../api/SalesApi/salecltgeneral';
import salecompany from '../api/SalesApi/salecompany';
import salecontracthd from '../api/SalesApi/salecontracthd';
import salematgeneral from '../api/SalesApi/salematgeneral';
import salestorage from '../api/SalesApi/salestorage';
import salesysdict from '../api/SalesApi/salesysdict';
import slscltproject from '../api/cmmApi/slscltproject';
import slsitemtype from '../api/SalesApi/slsitemtype';
import slssaledoctype from '../api/SalesApi/slssaledoctype';
import slssalesorderhd from '../api/SalesApi/slssalesorderhd';
import slssalesorderitem from '../api/SalesApi/slssalesorderitem';
import slssaletype from '../api/SalesApi/slssaletype';
import spricelist from '../api/cmmApi/spricelist';
import spricingmetaprice from '../api/cmmApi/spricingmetaprice';

export default {
    currency,
    fcashdoc,
    fcashdocitem,
    gdeliveryterm,
    gopcodesystem,
    gpaytype,
    gsettlemethod,
    gvattype,
    identity,
    imatspec,
    mid_actiontype,
    mid_gform,
    mid_menu,
    mid_module,
    ocity,
    oprovince,
    osdgroup,
    osdorg,
    prccltcompany,
    prccompany,
    prccostcenter,
    prcsdgroup,
    prcsdorg,
    qmslevel,
    salecltcompany,
    salecltgeneral,
    salecompany,
    salecontracthd,
    salematgeneral,
    salestorage,
    salesysdict,
    slscltproject,
    slsitemtype,
    slssaledoctype,
    slssalesorderhd,
    slssalesorderitem,
    slssaletype,
    spricelist,
    spricingmetaprice
}
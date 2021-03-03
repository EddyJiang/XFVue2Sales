import base from '@utils/base';
import service from '@utils/request';

const slsitemtype = {
    getDataByFormId(searchform) {
        return service.post(`${base.iSalesUrl}/sls_itemtype/GetDataByFormId`, searchform);
    },
    getDataByPage(page, rows, sort, order, searchform) {
        return service.post(`${base.iSalesUrl}/sls_itemtype/GetDataByPage?page=` + page + '&rows=' + rows + '&sort=' + sort + '&order=' + order, searchform);
    },
}
export default slsitemtype;
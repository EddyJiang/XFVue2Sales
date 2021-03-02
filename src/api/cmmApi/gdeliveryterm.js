import base from '@utils/base';
import service from '@utils/request';

const gdeliveryterm = {
    getDataByPage(index, size, sort, order, searchform) {
        return service.post(`${base.iCMMUrl}/gdeliveryterm/GetDataByPage?page=` + index + '&rows=' + size + '&sort=' + sort + '&order=' + order, searchform);
    },
}
export default gdeliveryterm;
import base from '@utils/base';
import service from '@utils/request';

const ocompany = {
    getDataByPage(index, size, sort, order, searchform) {
        return service.post(`${base.iCMMUrl}/ocompany/GetDataByPage?page=` + index + '&rows=' + size + '&sort=' + sort + '&order=' + order, searchform);
    },
}
export default ocompany;
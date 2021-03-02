import base from '@utils/base';
import service from '@utils/request';

const gvattype = {
    getDataByPage(index, size, sort, order, searchform) {
        return service.post(`${base.iCMMUrl}/gvattype/GetDataByPage?page=` + index + '&rows=' + size + '&sort=' + sort + '&order=' + order, searchform);
    },
}
export default gvattype;
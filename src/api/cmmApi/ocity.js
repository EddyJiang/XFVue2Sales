import base from '@utils/base';
import service from '@utils/request';

const ocity = {
    getAll() {
        return service.get(`${base.iCMMUrl}/ocity/GetAll`);
    },
    getDataByProvinceCode(searchform) {
        return service.post(`${base.iCMMUrl}/ocity/GetDataByProvinceCode`, searchform);
    }
}
export default ocity;
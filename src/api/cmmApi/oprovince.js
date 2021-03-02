import base from '@utils/base';
import service from '@utils/request';

const oprovince = {
    getAll() {
        return service.get(`${base.iCMMUrl}/oprovince/GetAll`);
    },
}
export default oprovince;
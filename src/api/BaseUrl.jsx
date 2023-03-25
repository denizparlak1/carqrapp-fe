const BASE_URL = "https://qrcarapp-akzshgayzq-uc.a.run.app"
//const BASE_URL = "http://localhost:8000"
export const API_URLS = {
    getUserData: BASE_URL +'/users/',
    updateUserEmail: BASE_URL+'/user/update/email/',
    updateUserMessage: BASE_URL+'/user/update/message/',
    updateUserPlate: BASE_URL+'/user/update/plate/',
    updateUserPhone: BASE_URL+'/user/update/phone/',
    updatePhoto: BASE_URL+'/users/add/avatar/',
    generateBulkQr: BASE_URL +'/bulk_register/'
};


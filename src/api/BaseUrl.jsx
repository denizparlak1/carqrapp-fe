const BASE_URL = "https://qrcarapp-akzshgayzq-uc.a.run.app"
//const BASE_URL = "http://localhost:8001"
export const API_URLS = {
    getUserData: BASE_URL +'/users/',
    updateUserEmail: BASE_URL+'/user/update/email/',
    updateUserMessage: BASE_URL+'/user/update/message/',
    updateUserPlate: BASE_URL+'/user/update/plate/',
    updateUserPhone: BASE_URL+'/user/update/phone/',
    updatePhoto: BASE_URL+'/users/add/avatar/',
    updateTelegramLink: BASE_URL+'/user/update/telegram/',
    updateTelegramPermission: BASE_URL+'/user/update/telegram/permission/',
    updateWhatsappPermission: BASE_URL+'/user/update/whatsapp/permission/',
    updatePhonePermission: BASE_URL+'/user/update/phone/permission/',
    updateUserNamePermission: BASE_URL+'/user/update/name/permission/',
    updateUserSMSPermission: BASE_URL+'/user/update/sms/permission/',

    updatePassword: BASE_URL+'/user/update/password/',
    updateLoginPermission: BASE_URL+'/user/update/login/permission/',
    generateBulkQr: BASE_URL +'/bulk_register/',

    getReports: BASE_URL +'/reports/',
    downloadReport: BASE_URL +'/download/',

    //Corp route
    getCorpQrData: BASE_URL+'/qrcode/',
    addCorpUser: BASE_URL+'/create/corp/user/',
    getCorpUser: BASE_URL+'/corp/user/',
    deleteCorpUser: BASE_URL+'/corp/user/delete/',

    //admin
    createSampleQr: BASE_URL+'/admin/qr/create/sample/'


};


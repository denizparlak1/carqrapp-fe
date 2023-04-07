import {API_URLS} from "../api/BaseUrl";

const getUserDataApi = async (userId) => {
    const response = await fetch(API_URLS['getUserData']+`${userId}`);
    return response;
};


const updateUserEmailApi = async (userId,email) => {
    const response = await fetch(API_URLS['updateUserEmail'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserMessageApi = async (userId,message) => {
    const response = await fetch(API_URLS['updateUserMessage'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            message: message
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserPlateApi = async (userId,plate) => {
    const response = await fetch(API_URLS['updateUserPlate'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            plate: plate
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserPhoneApi = async (userId,phone) => {
    const response = await fetch(API_URLS['updateUserPhone'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            phone: phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserProfileApi = async (userId, formData) => {
    const response = await fetch(API_URLS['updatePhoto'] + userId, {
        method: 'PUT',
        body: formData,
    });

    return response;
};

const updateUserTelegramLinkApi = async (userId,telegram) => {
    const response = await fetch(API_URLS['updateTelegramLink'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            telegram: telegram
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};


const updateUserTelegramPermissionApi = async (userId,permission) => {
    const response = await fetch(API_URLS['updateTelegramPermission'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            permission: permission
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserWhatsappPermissionApi = async (userId,permission) => {
    const response = await fetch(API_URLS['updateWhatsappPermission'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            permission: permission
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserPhonePermissionApi = async (userId,permission) => {
    const response = await fetch(API_URLS['updatePhonePermission'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            permission: permission
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserPasswordApi = async (userId,password) => {
    const response = await fetch(API_URLS['updatePassword'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const updateUserLoginPermissionApi = async (userId) => {
    const response = await fetch(API_URLS['updateLoginPermission'],{
        method: 'PUT',
        body: JSON.stringify({
            user_id: userId,
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    return response;
};

const getAdminReportApi = async () => {
    const response = await fetch(API_URLS['getReports']);
    return response;
};


const downloadReportApi = async (filename) => {
    const response = await fetch(API_URLS['downloadReport'] + `${filename}`);
    return response;
};

export { getUserDataApi,updateUserEmailApi,updateUserMessageApi,updateUserTelegramPermissionApi,
    updateUserPlateApi,updateUserPhoneApi,updateUserProfileApi,
    updateUserLoginPermissionApi,
    updateUserTelegramLinkApi,updateUserWhatsappPermissionApi,downloadReportApi,
    updateUserPhonePermissionApi,updateUserPasswordApi,getAdminReportApi };
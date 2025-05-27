import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register content-type application-json
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody)

}
//login api
export const LoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

//google login api
export const googleoogleLoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/google-login`, reqBody)
}

//get home book
export const homeBookApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-home-book`)
}

//get all jobs
export const getAllJObsApi = async (searchkey) => {
    return await commonApi('GET', `${serverUrl}/all-jobs?search=${searchkey}`)
}




//---------------users apis----------------------
//upload book

export const uploadBookApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-book`, reqBody, reqHeader)
}


//get all books
export const getAllBookApi = async (searchkey, reqHeader) => {
    //query parameter syntax==>baseurl?key=value
    return await commonApi('GET', `${serverUrl}/all-books?search=${searchkey}`, '', reqHeader)
}

//api to view a book
export const viewABookApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/view-book/${id}`)
}
//api to apply a job
export const addApplicationApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/apply-job`, reqBody, reqHeader)
}
//user profile update api
export const updateUserProfile = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/userprofile-update`, reqBody, reqHeader)
}

//api to get all book by a auser
export const getAllUserBookApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/user-book`, "", reqHeader)
}
//api to get all book brought bya auser
export const getAllUserBroughtBookApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/user-brought-book`, "", reqHeader)
}
//delete a user book

export const deleteUserBookApi = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/delete-user-books/${id}`)
}
//api to make payment
export const makepaymentApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/make-payment`, reqBody, reqHeader)
}


//------------------------Admin
//Api to get all books admin
export const getAllBookAdminApi = async (reqHeader) => {
    //query parameter syntax==>baseurl?key=value
    return await commonApi('GET', `${serverUrl}/admin-all-books`, '', reqHeader)
}
//api to approve admin
export const approveBookApi = async (reqBody, reqHeader) => {
    //query parameter syntax==>baseurl?key=value
    return await commonApi('PUT', `${serverUrl}/approve-books`, reqBody, reqHeader)
}
//to get all users
export const getAllUsersApi = async (reqHeader) => {
    //query parameter syntax==>baseurl?key=value
    return await commonApi('GET', `${serverUrl}/all-users`, '', reqHeader)
}
//to add new job
export const addJobApi = async (reqBody) => {
    //query parameter syntax==>baseurl?key=value
    return await commonApi('POST', `${serverUrl}/add-job`, reqBody)
}

//path to delete a job
export const deleteJobApi = async (id) => {
    //query parameter syntax==>baseurl?key=value
    return await commonApi('DELETE', `${serverUrl}/delete-job/${id}`)
}

//get all applications
export const getAllApplicationsApi = async () => {
    //query parameter syntax==>baseurl?key=value
    return await commonApi('GET', `${serverUrl}/all-application`)
}
//api to update profile
export const updateProfile = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/adminprofile-update`, reqBody, reqHeader)
}

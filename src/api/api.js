import axios from 'axios'
axios.defaults.baseURL = "http://120.79.66.43:8081/api/v1";
export const login = params => {
    return axios.post('/user/login', params).then(res => res.data)
}
export const registeres = (verityCode,params) =>{
    return axios.post(`/user/register/${verityCode}`,params).then(res=>res.data)
}
//增加记录
export const expend = params => {
    return axios.post('/expend', params).then(res => res.data)
}
export const incomelist = userId =>{
    return axios.get(`/income?userId=${userId}`).then(res => res.data)
}
export const expendlist = userId =>{
    return axios.get(`/expend?userId=${userId}`).then(res => res.data)
}
export const income = params => {
    return axios.post('/income', params).then(res => res.data)
}
export const expendType = userId =>{
    return axios.get(`/expend/type/${userId}`).then(res => res.data)
}
export const incomeType = userId =>{
    return axios.get(`/income/type/${userId}`).then(res => res.data)
}
export const userExpendType = userId =>{
    return axios.get(`/expend/type/user/${userId}`).then(res => res.data)
}
export const userIncomeType = userId =>{
    return axios.get(`/income/type/user/${userId}`).then(res => res.data)
}
export const postexpendType = params =>{
    return axios.post('/expend/type',params).then(res => res.data)
}
export const postincomeType = params =>{
    return axios.post('/income/type',params).then(res => res.data)
}
export const updateexpendType = (id,typename)=>{
    return axios.put(`/expend/type/${id}`,{typeName:typename}).then(res => res.data)
}
export const updateincomeType = (id,typename)=>{
    return axios.put(`/income/type/${id}`,typename).then(res => res.data)
}
export const updateexpend = (id,typename)=>{
    return axios.put(`/expends/${id}`,{remark:typename}).then(res => res.data)
}
export const updateincome = (id,typename)=>{
    return axios.put(`/incomes/${id}`,{remark:typename}).then(res => res.data)
}
export const getincomes= userId =>{
    return axios.get(`/graph/incomes?userId=${userId}`).then(res => res.data);
}
export const getexpends= userId =>{
    return axios.get(`/graph/expends?userId=${userId}`).then(res => res.data);
}
export const deleteexpendType = id=>{
    return axios.delete(`/expend/type/${id}`).then(res => res.data)
}
export const deleteincomeType = id=>{
    return axios.delete(`/income/type/${id}`).then(res => res.data)
}
export const deleteincome = id=>{
    return axios.delete(`/incomes/${id}`).then(res => res.data)
}
export const deleteexpend = id=>{
    return axios.delete(`/expends/${id}`).then(res => res.data)
}
//query
export const query = id =>{
    return axios.get(`/query/${id}`).then(res => res.data)
}
//个人信息
export const getuser = id =>{
    return axios.get(`/user/${id}`).then(res=>res.data)
}
export const putuser = (id,params) =>{
    return axios.put(`/user/${id}`,params).then(res=>res.data)
}
//家庭
export const familyinfo = id =>{
    return axios.get(`/familys/${id}`).then(res=>res.data)
}
export const familyuser = id =>{
    return axios.get(`/family/members/${id}`).then(res=>res.data)
}
export const editfamily = (userId,id,parmas) =>{
    return axios.put(`/familys/${userId}/${id}`,parmas).then(res=>res.data)
}
export const postfamily = (userId,parmas) =>{
    return axios.post(`/familys/${userId}`,{familyName:parmas}).then(res=>res.data)
}
export const deletefamily = (userId,id) =>{
    return axios.delete(`/familys/${userId}/${id}`).then(res=>res.data)
}
export const addmember = (userId,id,parmas) =>{
    return axios.post(`/family/${userId}/${id}/add`,parmas).then(res =>res.data)
}
export const deletemember = (userId,familyId,delId)=>{
    return axios.delete(`/family/${userId}/${familyId}/del/${delId}`).then(res=>res.data)
}
//留言 公告
export const getnotices = familyId =>{
    return axios.get(`/family/announces/${familyId}`).then(res=>res.data)
}
export const updatenotices = (familyId,userId,aid,params) =>{
    return axios.put(`/family/${familyId}/announces/${userId}/${aid}`,params).then(res=>res.data)
}
export const createnotices = (familyId,userId,params) =>{
    return axios.post(`/family/${familyId}/announces/${userId}`,params).then(res=>res.data)
}
export const deletenotices=(familyId,userId,aid) =>{
    return axios.delete(`/family/${familyId}/announces/${userId}/${aid}`).then(res=>res.data)
}

export const getmessage = familyId =>{
    return axios.get(`/family/message/${familyId}`).then(res=>res.data)
}
export const updatemessage = (familyId,userId,aid,params) =>{
    return axios.put(`/family/${familyId}/message/${userId}/${aid}`,params).then(res=>res.data)
}
export const createmessage = (familyId,userId,params) =>{
    return axios.post(`/family/${familyId}/message/${userId}`,params).then(res=>res.data)
}
export const deletemessage=(familyId,userId,aid) =>{
    return axios.delete(`/family/${familyId}/message/${userId}/${aid}`).then(res=>res.data)
}
export const updatepassword=(userId,password) =>{
    return axios.put(`/user/password/${userId}`,password).then(res=>res.data)
}
export const userinfo = (id)=>{
    return axios.get(`/user/${id}`).then(res=>res.data)
}
export const getcode = phone =>{
    return axios.get(`/user/captcha/${phone}`).then(res=>res.data)
}
export const updatephone = (id,params)=>{
    return axios.put(`/user/${id}/phone`,params).then(res=>res.data)
}
export const updateuser=(id,parmas)=>{
    return axios.put(`/user/${id}`,parmas).then(res=>res.data)
}
export const findpw=(phone,verifyCode)=>{
    return axios.get(`/user/${phone}/${verifyCode}`).then(res=>res.data)
}
export const updatepass=(string)=>{
    return axios.post('/user/repw',string).then(res=>res.data)
}


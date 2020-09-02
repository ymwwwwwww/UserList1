import { request } from 'umi';
import {message} from 'antd';
export const getRemoteList = async params => {
    //注意 return
    return request('api/users', {
        method:'get'
    })
    .then(function(response){
        return response
    })
    .catch(function(error){
        message.error("刷新失败");
        return false
    })
}

export const editRecord = async ({values,id})=> {
    //注意 return
    return request(`api/users/${id}`, {
        method:'put',
        data:values,
    })
    .then(function(response){
        message.success('Edit Successfully');
        return true
    })
    .catch(function(error){
        message.error('Edit Failed');
        return false
    })
}

export const deleteRecord = async ({id})=> {
    //注意 return
    return request(`api/users/${id}`, {
        method:'delete'
    })
    .then(function(response){
        message.success('Delete Successfully');
        return true
    })
    .catch(function(error){
        message.error('Delete Failed');
        return false
    })
}

export const addRecord = async ({values})=> {
    //注意 return
    return request(`api/users/`, {
        method:'post',
        data:values
    })
    .then(function(response){
        message.success('Add Successfully');
        return true
    })
    .catch(function(error){
        message.error('Add Failed');
        return false
    })
}
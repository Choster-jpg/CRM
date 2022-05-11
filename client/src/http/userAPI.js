import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password, name, lastName, phone, company) =>
{
    try
    {
        const {data} = await $host.post('api/user/register', {email, password, name, lastName, phone, company});
        return jwtDecode(data.accessToken);
    }
    catch(e)
    {
        console.log(e);
    }
}

export const login = async (email, password) =>
{
    try
    {
        const {data} = await $host.post('api/user/login', {email, password});
        localStorage.setItem('token', data.accessToken);
        return jwtDecode(data.accessToken);
    }
    catch(e)
    {
        console.log(e);
    }

}

export const reset = async (email) =>
{
    try
    {
        const response = await $host.post('api/user/reset', {email});
        return response;
    }
    catch (e)
    {
        console.log(e);
    }

}

export const resetPassword = async (email, password) =>
{
    try {
        const response = await $host.post('api/user/reset/password', {email, password});
        return response;
    }
    catch(e)
    {
        console.log(e);
    }
}

export const check = async () =>
{
    try
    {
        const {data} = await $authHost.get('api/user/refresh');
        localStorage.setItem('token', data.accessToken);
        return data;
    }
    catch (e)
    {
        console.log(e);
    }
}
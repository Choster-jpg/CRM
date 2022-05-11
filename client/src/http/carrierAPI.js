import {$authHost} from "./index";

export const createCarrier = async (product) =>
{
    const {data} = await $authHost.post('api/carrier', {data});
    return data;
}

export const fetchCarrier = async () =>
{
    const {data} = await $authHost.get('api/carrier');
    return data;
}

export const removeCarrier = async (id) =>
{
    const {data} = await $authHost.delete('api/carrier', { headers: {}, data: {id}});
    return data;
}
import {$authHost} from "./index";

export const createCarrier = async (carrier) =>
{
    const {data} = await $authHost.post('api/carrier', {name: carrier.name, city: carrier.city});
    return data;
}

export const fetchCarrier = async (limit, page) =>
{
    const {data} = await $authHost.get('api/carrier', {params: {limit, page}});
    return data;
}

export const removeCarrier = async (id) =>
{
    const {data} = await $authHost.delete('api/carrier', { headers: {}, data: {id}});
    return data;
}
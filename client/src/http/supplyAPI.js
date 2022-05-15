import {$authHost} from "./index";

export const createSupply = async (supply) =>
{
    const {data} = await $authHost.post('api/supply', {address_from: supply.address_from, address_to: supply.address_to, date: supply.date, carrier_id: supply.carrier_id});
    return data;
}

export const fetchSupply = async () =>
{
    const {data} = await $authHost.get('api/supply');
    return data;
}
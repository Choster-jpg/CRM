import {$authHost} from "./index";

export const createProduct = async (product) =>
{
    console.log(product);
    const {data} = await $authHost.post('api/product', {name: product.name, amount: product.amount, price: product.price});
    return data;
}

export const fetchProducts = async (minPrice, maxPrice, name, limit, page) =>
{
    const response = await $authHost.get('api/product', {params: {
            minPrice, maxPrice, name, limit, page
        }})

    console.log(response);
    return response.data;
}

export const removeProduct = async (id) =>
{
    const {data} = await $authHost.delete('api/product', { headers: {}, data: {id}});
    return data;
}

export const incrementProduct = async (id, amount) =>
{
    const {data} = await $authHost.put(`api/product/${amount}`, {id});
    return data;
}

export const  updateProduct = async (id, value) =>
{
    const {data} = await $authHost.put(`api/product/price/${value}`, {id});
    return data;
}
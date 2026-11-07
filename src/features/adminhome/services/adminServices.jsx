import apiConfig from "../../../config/apiConfig";


export async function getProduct(){
    let response=await apiConfig.get('/admin/product')
    return response.data
}

export async function createProduct(formData){
   for (const [key, value] of formData.entries()) {
  console.log(key, value);
}
    let response=await apiConfig.post('/admin/product',formData)
    return response.data
}

// id ,data
export async function updateProduct(id,data){
    let response= await apiConfig.put(`/admin/product/${id}`,data)
    return response.data
}

export async function deleteProduct(id){
    let response=await apiConfig.delete(`/admin/product/${id}`)
    return response.data
}


export async function getProductDetial(id){
    let response=await apiConfig.get(`/admin/product/${id}`)
    return response.data
}

// order 



export async function getOrders(){
    let response= await apiConfig.get('/order/orders')
    return response.data;
}

export async function updateOrderStatus(id,status){
    let response= await apiConfig.put(`/order/order/${id}`,{status})
    return response.data;
}

export async function deleteOrder(id){
    let response= await apiConfig.delete(`/order/order/${id}`)
    return response.data;
}


export async function dashboard(){
    let response=await apiConfig.get('/admin/dashboard')
    return response.data
}


export async function getUsers(){
    let response=await apiConfig.get('/admin/get-users')
    return response.data
}

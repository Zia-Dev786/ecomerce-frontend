import apiConfig from "../../../config/apiConfig";


export async function getProduct(){
    let response=await apiConfig.get('/user/product')
    return response.data
}

export async function getDetialProduct(id){
    let response=await apiConfig.get(`/user/product/${id}`)
    return response.data
}

export async function getProductByCategory(categroy){
    let response=await apiConfig.get(`/user/productbycategory/${categroy}`)
    return response.data
}


export async function getsearchProducts(data){
    let response=await apiConfig.post('/user/searchproduct',data)
    return response.data
}


export async function UserplaceOrder(data){
    let response=await apiConfig.post('/order/placeorder',data)
    return response.data
}


export async function getUserOrders(){
    let response= await apiConfig.get('/order/userorder')
    return response.data;
}

export async function getUserOrdersDetail(id){
    let response= await apiConfig.get(`/order/userorder/${id}`)
    return response.data;
}






export async function groqchatbot(query){
    let response= await apiConfig.post(`groq/groq-ai`,{query})
    return response.data;
}


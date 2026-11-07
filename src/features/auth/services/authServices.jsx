import apiConfig from "../../../config/apiConfig";


export async  function login(data){

    let response= await apiConfig.post('/common/login',data)
    return response.data

}

export async function register(data){
      let response= await apiConfig.post('/common/register',data)
    return response.data
}


export async function forgetPassword(data){
      let response= await apiConfig.post('/common/forget',data)
    return response.data
}


// axios  api get(url) post(url,data) put(url,data) delete(url)
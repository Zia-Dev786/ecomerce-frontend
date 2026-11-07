import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import { getUserOrdersDetail } from '../services/homeServices'

function OrderDetail() {
 let [orderDetail,setOrderDetial]=useState({})
 let {id}=useParams()

 async function getOrderDetail(){
    try{
        let response=await getUserOrdersDetail(id)
        console.log(response)

    }catch(e){
        console.log('error :',e)
    }
 }

 getOrderDetail()
  return (
    <div>OrderDetail</div>
  )
}

export default OrderDetail
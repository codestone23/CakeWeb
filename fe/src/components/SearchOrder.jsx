import React, { useState } from 'react'
import '../assets/styles/searchOrder.css';
import { useEffect } from "react";
import { getBillById } from "../services/bill";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
 
    const [idBill,setIdBill] = useState("#");
    const [showError,setShowError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if(Number.parseInt(idBill.substring(1))){
            const data = await getBillById(Number.parseInt(idBill.substring(1)));
            console.log(data);
            if(data.data.data !== null && idBill.substring(0,1) === "#"){
                localStorage.setItem("bill",JSON.stringify(data.data.data[0]));
                navigate("/show-bill");
            }else{
                setShowError(true);
            }
        }
        else{
            setShowError(true);
        }
        
        
    }
    
  return (
    <div className="search__order">
        <div className="search__order--container">
            <div className="search__order--title">TRA CỨU ĐƠN HÀNG</div>
            <div className="search__order--info">
                <div>
                    <input className="search__order--input" placeholder="Mã đơn hàng" type="text" defaultValue={idBill} onChange={(e) => {
                        setShowError(false);
                        setIdBill(e.target.value)}
                    }/>
                    {
                        showError && (
                            <span className="error">Mã đơn hàng không hợp lệ</span>
                        )
                    }
                    
                </div>
            </div>
            {/* <div className="search__order--info">
                <div>
                    <input className="search__order--input" placeholder="Số điện thoại" type="text" />
                </div>
            </div> */}
            <div className="search__order--footer">
                <button className="search__order--btn btn" onClick={() => handleSubmit()}>
                    Tra cứu đơn hàng
                </button>
            </div>
        </div>
    </div>
  )
}

export default SearchOrder
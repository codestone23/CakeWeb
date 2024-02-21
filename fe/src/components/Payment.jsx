import React, { Fragment } from 'react'
import '../assets/styles/payment.css';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import  { createTotalBill } from "../services/bill";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;
  // const [totalProducts,setTotalProducts] = useState(0);

    cart.forEach((e) => {
        totalPrice += e.moreInfo.price*e.quantity;
    });



  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone_number: "",
      address: "",
      notice: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5, "Minimum 5 characters").required("Required!"),
      phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      address: Yup.string().min(10, "Minimum 10 characters").required("Required!"),
    }),
    onSubmit: (values) => {
      values.delivery_date = new Date();
      let list_order = [];
      cart.map((e,i)=>{
        let rel = {};
        rel.id_cake = e.id;
        rel.size = e.moreInfo.size;
        rel.quantity = e.quantity;
        list_order.push(rel);
      })
      values.list_order = list_order;
      console.log(values);
      createTotalBill(values).then((response) => {
        console.log(response);
        localStorage.removeItem("cart");
        if (response.data === null) {
          // 
        } else {
          // 
        }
        navigate("/homepage");
      })
    },
  });

  return (
    <main className="payment">
      <div className="payment__container">
        <div className="payment__container--form">
          <div className="payment__container--form__body">
            <form action="" className="form__cake" onSubmit={formik.handleSubmit}>
              <div className="form__title">Thông tin giao hàng</div>
              <div className="form__input">
                <div>
                  <input className="name" type="text" name="name" placeholder="Họ và tên" 
                  value={formik.values.name}
                  onChange={formik.handleChange}/>
                </div>
                {formik.errors.name && formik.touched.name && (
                  <p className="error">{formik.errors.name}</p>
                )}
              </div>
              <div className="form__input">
                <div>
                  <input className="phone_number" name="phone_number" type="text" placeholder="Số điện thoại" value={formik.values.phone_number}
                  onChange={formik.handleChange}/>
                </div>
                {formik.errors.phone_number && formik.touched.phone_number && (
                  <p className="error">{formik.errors.phone_number}</p>
                )}
              </div>
              <div className="form__input">
                <div>
                  <input className="address" name="address" type="text" placeholder="Địa chỉ nhân hàng" value={formik.values.address}
                  onChange={formik.handleChange}/>
                </div>
                {formik.errors.address && formik.touched.address && (
                  <p className="error">{formik.errors.address}</p>
                )}
              </div>
              <div className="form__input">
                <div>
                  <input className="notice" name="notice" type="text" placeholder="Ghi chú" value={formik.values.notice}
                  onChange={formik.handleChange}/>
                </div>
              </div>
              <div className="form__title">Phương thức giao hàng</div>
              <div className="form__input--else">
                <div className="form__input--date">
                  <input type="checkbox" name="" id="" checked/>
                  <span>Tốc độ tiêu chuẩn (từ 2 - 5 ngày làm việc) </span>
                </div>
              </div>
              <div className="form__title">Phương thức thanh toán</div>
              <div className="form__input--else">
                <div className="form__input--date">
                  <input type="checkbox" name="" id="" checked />
                  <span>Thanh toán trục tiếp khi nhận hàng</span>
                </div>
              </div>
              <div>
                <button className="btn__submit" type="submit">HOÀN TẤT ĐẶT HÀNG</button>
              </div>
            </form>
          </div>
        </div>
        <div className="payment__container--order">
          <span></span>
          <ul className="list-group">
            <li className="list-group-item title">ĐƠN HÀNG</li>
            <li className="list-group-item divider"></li>
            <div className="list__product">
              {cart.map((e,i)=>{
                    return (
                      <Fragment key={i}>
                        <li className="list-group-item text-1">
                        <span className="title-6">{e.name}</span>
                        <span className="title-6-1">{e.moreInfo.price * e.quantity + " VND"}</span>
                    </li>
                    <li className="list-group-item text-1-1">
                        <span className="title-6-2">Size: {e.moreInfo.size}</span>
                        <span className="title-6-3">x {e.quantity}</span>
                    </li>
                      </Fragment>
                      
                    )
                  })}
            </div>
                  
                  
                
                
                <li className="list-group-item divider-1"></li>
                <li className="list-group-item text-1">
                    <span className="title-3">Đơn hàng</span>
                    <span className="title-3-1"><span className="current-price"> {totalPrice}</span> VND</span>
                </li>
                <li className="list-group-item text-2-2">
                    <span className="title-3">Giảm</span>
                    <span className="title-4-1">- <span className="discount">0</span> VND</span>
                </li>
                <li className="list-group-item text-2-3">
                    <span className="title-21">Phí vận chuyển</span>
                    <span className="title-22"><span className="shipping-fee">0</span> VND</span>
                </li>
                <li className="list-group-item text-2-3 payment-fee-input">
                    <span className="title-21">Phí thanh toán</span>
                    <span className="title-22"><span className="card-fee">0</span> VND</span>
                </li>

                <li className="list-group-item divider-1"></li>
                <li className="list-group-item">
                    <span className="title-5">TỔNG CỘNG</span>
                    <span className="title-5-2"><span className="total-price">{totalPrice}</span> VND</span>
                </li>
              </ul>
        </div>
      </div>
    </main>
  )
}

export default Payment
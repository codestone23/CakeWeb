import React, { useEffect, useState } from 'react';
import { GiMilkCarton } from "react-icons/gi";

const Cart = () => {
    const [openCart, setOpenCart] = useState(true);
    const handleOpenCart = () => {
        console.log(openCart);
        setOpenCart(!openCart);
    }
    useEffect(()=>{
        setOpenCart(true);
    },[])


  return (
    <div className="cart">
        <div className="cart__container" onClick={() => handleOpenCart()}>
            <span className="cart__number">2</span>
            <GiMilkCarton />
        </div>
    
            <div id="cart" className={`cart__products ${openCart ? 'cart__display' : 'cart__visible'}`}
        >
            <span className="caret"></span>
            <ul className="list-group">
                <li className="list-group-item title">
                    GIỎ HÀNG (
                    <span className="countProduct">2</span>
                    )
                </li>
                <li className="list-group-item divider"></li>
                <li className="list-group-item item">
                    <div className="item__container">
                        <div>
                            <div>
                                <img className="item__img" src="src/assets/images/cake.png" alt="" />
                            </div>
                        </div>
                        <div className="item__body">
                            <h4 className="item__heading">Mousse Xoai</h4>
                            <h5><span className="item__price">625.000 VND</span></h5>
                            <h5><span className="item__size">Size</span>
                            <span className="item__size--value">14x5</span>
                            </h5>
                            <h5><spa className="item__quantity">so luong</spa>
                            <span className="item__quantity--value">3</span>
                            </h5>
                        </div>
                    </div>
                    
                    <div className="divider"></div>
                    <div className="item__container">
                        <div>
                            <div>
                                <img className="item__img" src="src/assets/images/cake.png" alt="" />
                            </div>
                        </div>
                        <div className="item__body">
                            <h4 className="item__heading">Mousse Xoai</h4>
                            <h5><span className="item__price">625.000 VND</span></h5>
                            <h5><span className="item__size">Size</span>
                            <span className="item__size--value">14x5</span>
                            </h5>
                            <h5><spa className="item__quantity">so luong</spa>
                            <span className="item__quantity--value">3</span>
                            </h5>
                        </div>
                    </div>
                </li>
                <li className="list-group-item divider-1"></li>
                <li className="list-group-item total">
                    <span className="tleft">Tổng cộng:</span>
                    <span className="tright">7.440.000 VNĐ</span>
                </li>
                <li className="list-group-item butn">
                    <a href="" className="btn btn-checkout">
                        Thanh Toán
                    </a>
                </li>
            </ul>
        </div>
        
        
        
    </div>
  )
}

export default Cart
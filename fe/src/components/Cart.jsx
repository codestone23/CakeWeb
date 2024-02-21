import React, { useEffect, useState } from 'react';
import { GiMilkCarton } from "react-icons/gi";
import { FaRegTrashCan } from "react-icons/fa6";

const Cart = ({openCart,handleIsCart,changeCart}) => {
    // const [openCart, setOpenCart] = useState(true);
    const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [totalPrice,setTotalPrice] = useState(0);
    const handleOpenCart2 = () => {
        console.log(openCart);
        // setOpenCart(!openCart);
        setCart(JSON.parse(localStorage.getItem('cart'))|| []);
        handleIsCart();
    }
    useEffect(()=>{
        setCart(JSON.parse(localStorage.getItem('cart'))|| []);
        handleChangeTotalPrice();
    },[changeCart]);
    console.log(cart);
    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);
        setCart(JSON.parse(localStorage.getItem('cart'))|| []);
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        }
      }, [localStorage]); 
      
      const handleStorageChange = () => {
        setCart(JSON.parse(localStorage.getItem('cart')));
      }

    const handleRemoveCake = (index) => {
        const ans = cart.filter((c,i) => i !== index);
        setCart(ans);
        console.log(ans);
        localStorage.setItem("cart",JSON.stringify(ans));
        handleChangeTotalPrice();
    }
    const handleChangeTotalPrice = () => {
        let total = 0;
        cart.forEach((e) => {
            total += e.moreInfo.price;
        });
        setTotalPrice(total);
        console.log(total);
    }

  return (
    <div className="cart">
        <div className="cart__container" onClick={() => handleOpenCart2()}>
            <span className="cart__number">{cart.length}</span>
            <GiMilkCarton />
        </div>
    
            <div id="cart" className={`cart__products ${openCart ? 'cart__display' : 'cart__visible'}`}
        >
            <span className="caret"></span>
            <ul className="list-group">
                <li className="list-group-item title">
                    GIỎ HÀNG (
                    <span className="countProduct">{cart.length}</span>
                    )
                </li>
                <li className="list-group-item divider"></li>
                <li className="list-group-item item">
                    {cart.map((item,index)=>(
                        <>
                            <div key={index} className="item__container">
                                <div>
                                    <div>
                                        <img className="item__img" src={item.list_image[0].image} alt="" />
                                    </div>
                                </div>
                                <div className="item__body">
                                    <div className="cart__item-trash">
                                        <h4 className="item__heading">{item.name}</h4>
                                        <span onClick={() => handleRemoveCake(index)}><FaRegTrashCan /></span>
                                    </div>
                                    
                                    <h5><span className="item__price">{item.quantity * item.moreInfo.price+ " VND"} </span></h5>
                                    <h5><span className="item__size">Kích thước</span>
                                    <span className="item__size--value">{item.moreInfo.size}</span>
                                    </h5>
                                    <h5><spa className="item__quantity">Số lượng</spa>
                                    <span className="item__quantity--value">{item.quantity}</span>
                                    </h5>
                                </div>
                            </div>
                            <div className="divider"></div>
                        </>
                        
                    ))}
                
                </li>
                <li className="list-group-item divider-1"></li>
                <li className="list-group-item total">
                    <span className="tleft">Tổng cộng:</span>
                    <span className="tright">{totalPrice + " VNĐ"}</span>
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
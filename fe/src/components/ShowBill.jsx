import React from 'react'
import "../assets/styles/showBill.css";

const ShowBill = () => {

    const bill = JSON.parse(localStorage.getItem('bill'));
    console.log(bill);
   
  return (
    <>
    <div className="wrapper">
    <div className="container">
      <div className="container__header">
        <h1><i className="fa-solid fa-book-open-reader"></i> Cakes Shop </h1>
      </div>
      <div className="container__body">
        <h2>Cảm ơn rất nhiều về đơn hàng của ban!</h2>
        <p> Chào {bill.name_client},</p><p>Chúng tôi đã nhận được đơn đặt hàng #{bill.id} của bạn và đơn hàng hiện đang được xử lý.</p>
        <div className="container__list">
          <p>Đơn hàng của bạn: #{bill.id} ({bill.delivery_date})</p>
          <div className="table-container" role="table">
            {bill?.list_order?.map((cake,i)=>{
                return (
                    <div key={i} className="flex-table row" role="rowgroup">
                        <div className="flex-row first" role="cell">
                            <img className="img__cake" src={cake.img_cake} alt="Harry potter" />
                        </div>
                        <div className="flex-row" role="cell">{cake.name_cake}<br/> <span>Quantity: {cake.quantity}</span></div>
                        <div className="flex-row" role="cell">{cake.price + " VND"}</div>
                    </div>                  
                )
                
            })}
            
            <div className="flex-table row" role="rowgroup">
              <div className="flex-row first" role="cell">Tổng cộng: </div>
              <div className="flex-row" role="cell">{bill.total_price + " VND"}</div>
            </div>
          </div>
        </div>
        <div className="container__barcode">
          <p>Theo dõi đơn hàng của bạn</p>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZf4UVrvG5gug1icYjer-V09hsxxatJa1hFQ&usqp=CAU" alt="barcode" />
          <p>SH4538879444760733</p>
        </div>
        <div className="container__social">
         Follow us <br/>
          <i className="fa-brands fa-facebook"></i> <i className="fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default ShowBill
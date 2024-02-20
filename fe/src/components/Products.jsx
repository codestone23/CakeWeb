import React, { Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from "react";
import { getCakesByIdType } from "../services/product";

const Products = ({type}) => {
    console.log(type);
    console.log(type.id_type);
    const [slidesPerView, setSlidesPerView] = useState(5);
    const [cakes,setCakes] = useState([]);
    const [idType,setIdType] = useState(0);
    useEffect(()=>{
        setIdType(type.id_type);
        const fetchData = async () => {
            try {
              const data = await getCakesByIdType(idType);
              console.log("Cakes data:", data.data.data);
              handleGetCakes(data.data.data);
            } catch (error) {
              console.error("Error fetching type:", error);
            }
          };
      
          const handleGetCakes = (data) => {
            setCakes(data);
          };
      
          fetchData();
    },[type])
    useEffect(() => {
        function handleResize() {
          const windowWidth = window.innerWidth;
          if (windowWidth >= 1508) {
            setSlidesPerView(5);
          }else if (windowWidth >= 1248) {
            setSlidesPerView(4);
          } else if (windowWidth >= 800) {
            setSlidesPerView(3);
          } else if (windowWidth >= 600) {
            setSlidesPerView(2);
          } else if (windowWidth >= 500) {
            setSlidesPerView(1);
          }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
      }, []);
  return (
    <div className="category__cake--content">
            <h3 className="category__cake--title">{type.type}</h3>
            <div className="category__cake--body">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={slidesPerView}
                        navigation
                        pagination
                        onSlideChange={() => console.log('slide change')}
                        >
                            {cakes?.map((cake,i)=>(
                                    <SwiperSlide key={i}>
                                    <div className="product__body">
                                        <div className="product__body--content">
                                            <div className="product__image">
                                                <img className="image__cake" src={cake.list_image[0].image} alt="" />
                                            </div>
                                            <div className="product__content">
                                                <h3 className="product__title">{cake.name}</h3>
                                                <div className="product__description">{cake.description}</div>
                                            </div>
                                            <div className="product__content">
                                                <div>
                                                    <span className="product__price">Giá: 
                                                    {cake.list_size[0].old_price !== null && (
                                                        <span className="product__old--price">{cake.list_size[0].old_price} VND</span>
                                                    )} {cake.list_size[0].price} VND</span>
                                                    <div  className="product__size">
                                                        <h3>Kích thước</h3>
                                                        <div className="product__size--info">
                                                            {cake.list_size.map((size,i)=>  (<div key={i}>{size.size}</div>)
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="btn__add--cart">
                                                        <button className="btn__cart">Thêm vào giỏ hàng</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </SwiperSlide>
                                
                            ))} 
                            
                            <div className="three__dot">...</div>
                            

                    </Swiper>
            </div>
        </div>
  )
}

export default Products
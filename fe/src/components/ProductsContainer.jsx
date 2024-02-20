import { useEffect, useState } from "react";
import Products from "./Products";
import { getAllTypes } from "../services/type";

const ProductsContainer = () => {
    const [types,setTypes] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const data = await getAllTypes();
              console.log("Type data:", data.data);
              handleGetTypes(data.data);
            } catch (error) {
              console.error("Error fetching type:", error);
            }
          };
      
          const handleGetTypes = (data) => {
            setTypes(data);
          }; 
      
          fetchData();
    },[])
  return (
    <div className="category__cake">
        {
            types.length !==0 && 
            types.map((type,i) =>(
                <>
                    <Products type={type} key={i} />
                </>
                )
            )
        }
    </div>
  )
}

export default ProductsContainer
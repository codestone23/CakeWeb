import axios from "axios";

axios.defaults.baseURL = "localhost:3000/bills";

export async function createTotalBill(values) {
    return await axios.post("http://localhost:3000/bills/createTotal",
        values
    );
}

export async function getBillById(id_bill) {
    console.log(id_bill);
    return await axios.get("http://localhost:3000/bills/getById?id="+id_bill);
}
import axios from "axios";

axios.defaults.baseURL = "localhost:3000/bills";

export async function createTotalBill(values) {
    return await axios.post("http://localhost:3000/bills/createTotal",{
        values
    });
}
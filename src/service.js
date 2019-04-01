import axios from "axios";

export function getAllFarmers() {
    return axios.get("https://jsonplaceholder.typicode.com/users")
}
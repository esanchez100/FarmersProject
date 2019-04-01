import axios from "axios";

export function getAllFarmers() {
    return axios.get("https://jsonplaceholder.typicode.com/users")
}
export function getByEmail(email) {
    return axios.get("https://jsonplaceholder.typicode.com/users?email=" + email)
}
export function getInfoById(id) {
    return axios.get("https://jsonplaceholder.typicode.com/users")
}

export function getPostsById() {
    return axios.get("https://jsonplaceholder.typicode.com/users")
}
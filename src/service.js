import axios from "axios";

export function getAllFarmers() {
    return axios.get("https://jsonplaceholder.typicode.com/users")
}
export function getByEmail(email) {
    return axios.get("https://jsonplaceholder.typicode.com/users?email=" + email)
}
export function getByUserId(id) {
    return axios.get("https://jsonplaceholder.typicode.com/users/" + id)
}
export function getPostsById(id) {
    return axios.get("https://jsonplaceholder.typicode.com/posts?userId=" + id)
}
export function getAllComments() {
    return axios.get("https://jsonplaceholder.typicode.com/comments")
}
export function getCommentsByPostId(postId) {
    return axios.get("https://jsonplaceholder.typicode.com/comments?postId=" + postId)
}
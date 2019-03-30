import axios from "axios";

export function getAllFarmers(pageIndex, pageSize) {
    return axios.get("/api/farmers");
}
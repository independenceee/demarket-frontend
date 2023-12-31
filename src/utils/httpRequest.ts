import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const httpRequest = axios.create({
    baseURL: process.env.NEXT_APP_BASE_URL! || "https://demarket-backend.vercel.app/api/v1",
});

export const get = async function (path: string, options = {}) {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async function (path: string, options = {}) {
    const response = await httpRequest.post(path, options);
    return response.data;
};

export const patch = async function (path: string, options = {}) {
    const response = await httpRequest.patch(path, options);
    return response.data;
};

export const del = async function (path: string, options = {}) {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;

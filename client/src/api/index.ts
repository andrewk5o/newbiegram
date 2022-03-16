import axios from "axios";

const url = "https://newbiegram-server-app.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost:any) => axios.post(url, newPost);
export const updatePost = (id:string, updatedPost:any) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id:string) => axios.delete(`${url}/${id}`);
export const likePost = (id:string) => axios.patch(`${url}/${id}/likePost`);
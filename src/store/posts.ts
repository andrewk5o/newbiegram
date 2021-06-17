import { makeAutoObservable, runInAction } from "mobx";
import * as api from "../api";

class Posts {
    
    private _posts: any = [];

    constructor() {
        makeAutoObservable(this);
    };

    async fetchPosts () {
        try {
            const { data } = await api.fetchPosts();
            runInAction(() => {
                this._posts = data;
            })
        } catch(error: any) {
            runInAction(() => {
                console.log(error);
            })
        }
    };

    async createPost (post: any) {
        try {
            const { data } = await api.createPost(post);
            runInAction(() => {
                this._posts = [...this._posts, data];
            });
        } catch(error: any) {
            runInAction(() => {
                console.log(error);
            })
        }
    };
    
    async updatePost (id:string, post:any) {
        try {
            const { data } = await api.updatePost(id, post);
            runInAction(() => {
                this._posts = this._posts.map((post:any) => post._id === data._id ? data : post);
            });
        } catch (error: any) {
            runInAction(() => {
                console.log(error);
            })
        }
    }

    async deletePost(id:string) {
        await api.deletePost(id);
        try {
            runInAction(() => {
                this._posts = this._posts.filter((post:any) => post._id !== id);
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
            });
        };
    };
    
    async likePost(id:string) {
        const { data } = await api.likePost(id);
        try {
            runInAction(() => {
                this._posts = this._posts.map((post:any) => post._id === data._id ? data : post);
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
            });
        }
    };

    get posts () {
        return this._posts;
    };

}

export default new Posts();
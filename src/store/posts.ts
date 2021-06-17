import { makeAutoObservable, runInAction } from "mobx";
import * as api from "../api";

class Posts {
    
    _posts: any = [];
    state = "pending";

    constructor() {
        makeAutoObservable(this);
    };

    async fetchPosts () {
        this.state = "penging";
        try {
            const { data } = await api.fetchPosts();
            runInAction(() => {
                this._posts = data;
                this.state = "done";
            })
        } catch(error: any) {
            runInAction(() => {
                console.log(error);
                this.state = "error";
            })
        }
    };

    async createPost (post: any) {
        this.state = "pending";
        try {
            const { data } = await api.createPost(post);
            runInAction(() => {
                this.state = "done";
                this._posts = [...this._posts, data];
            });
        } catch(error: any) {
            runInAction(() => {
                console.log(error);
                this.state = "error";
            })
        }
    };
    
    async updatePost (id:string, post:any) {
        this.state = "pending";
        try {
            const { data } = await api.updatePost(id, post);
            runInAction(() => {
                this._posts = this._posts.map((post:any) => post._id === data._id ? data : post);
                this.state = "done";  
            });
        } catch (error: any) {
            runInAction(() => {
                console.log(error);
                this.state = "error";
            })
        }
    }

    async deletePost(id:string) {
        this.state = "pending";
        await api.deletePost(id);
        try {
            runInAction(() => {
                this._posts = this._posts.filter((post:any) => post._id !== id);
                this.state = "done";  
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.state = "error";
            });
        };
    };
    
    async likePost(id:string) {
        this.state = "pending";
        const { data } = await api.likePost(id);
        try {
            runInAction(() => {
                this._posts = this._posts.map((post:any) => post._id === data._id ? data : post);
                this.state = "done";  
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.state = "error";
            });
        }
    };

    get posts () {
        return this._posts;
    };

}

export default new Posts();
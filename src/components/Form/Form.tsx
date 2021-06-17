import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { useState, useEffect } from "react";
import FileBase64 from 'react-file-base64';
import posts from "../../store/posts";
import { observer } from "mobx-react-lite";

interface PostData {
    creator: string,
    title: string,
    message: string,
    tags: string[],
    selectedFile: string,
};

const Form = observer(({currentId, setCurrentId}:any) => {
    const [postData, setPostData] = useState<PostData>({
        creator: "",
        title: "",
        message: "",
        tags: [],
        selectedFile: ""
    });
    const post = currentId ? posts.posts.find((p: any) => p._id === currentId) : null
    const classes = useStyles();

    useEffect(() => {
       if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (currentId) {
            posts.updatePost(currentId, postData);
        } else {
            posts.createPost(postData)
        }
        clear();
    };

    const clear = () => {
        setPostData({
            creator: "",
            title: "",
            message: "",
            tags: [],
            selectedFile: "",
        });
        setCurrentId(null)
    };

    return(
        <Paper className={classes.paper}>
            <form 
                autoComplete="off" 
                noValidate 
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Post</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
                <TextField 
                    name="title" 
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField 
                    name="message" 
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField 
                    name="tags" 
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(",")})}/>
                <div className={classes.fileInput}>
                    <FileBase64 
                        type="file"
                        multiple={false}
                        onDone={(({base64}: {base64:any}) => setPostData({ ...postData, selectedFile: base64}))}
                        />
                </div>
                <Button 
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth>Submit</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
})

export default Form;
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";
import posts from '../../store/posts';
import { observer } from "mobx-react-lite";

const Posts = observer(({setCurrentId}:any) => {
    const postsArray = posts.posts;
    const classes = useStyles();
    return (
        !postsArray.length ? <CircularProgress /> : (
            <Grid 
                className={classes.mainContainer}
                container
                alignItems="stretch"
                spacing={3}
                >
                {postsArray.map( (post:any) => (
                    <Grid
                    key={post._id}
                    xs={12}
                    sm={6}
                    item><Post post={post} setCurrentId={setCurrentId}/></Grid>
                ))}
            </Grid>
        )
    );
});

export default Posts; 
import { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import logo from "./images/logo.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import posts from "./store/posts";

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    useEffect(() => {
        posts.fetchPosts();
    },[]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Newbiegram</Typography>
                 <img className={classes.image} src={logo} alt="logo" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid 
                        container 
                        justify="space-between" 
                        alignItems="stretch"
                        spacing={3}
                        className={classes.mainContainer}
                        >
                        <Grid 
                            item
                            xs={12}
                            sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid 
                            item
                            xs={12}
                            sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;
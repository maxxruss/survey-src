import React from "react";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Title } from "@mui/icons-material";

type Props = {
    title: string;
    children: JSX.Element;
};

const useStyles = makeStyles((theme) => ({
    container: {
        // margin: "15px",
        padding: "15px",
        // position: "relative",
        // overflow: "hidden",
    },
    title: {
        // paddingLeft: '15px',
    },
    content: {
        // paddingLeft: '15px',
    },
}));

const PageLayout = ({ title, children }: Props) => {
    const classes = useStyles();

    return (
        <Grid container direction="column" className={classes.container}>
            <Grid item className={classes.title}>
                <h1>{title}</h1>
            </Grid>
            <Grid item className={classes.content}>
                {children}
            </Grid>
        </Grid>
    );
};

export default PageLayout;

import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    title: string;
    children: JSX.Element;
};

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "15px",
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

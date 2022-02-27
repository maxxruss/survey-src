import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as actions from "../../../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import withRequestService from "../../hoc/with-request-service";
import compose from "../../../utils/compose";
import { Link } from "react-router-dom";
import withRouter from "../../hoc/with-router";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" to="/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function SignIn({
    requestService,
    authDataLoaded,
    authDataError,
    id,
    navigate,
}) {
    const [checked, setChecked] = React.useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const params = {
            remember: checked,
            name: data.get("name"),
            password: data.get("password"),
            method: "auth",
        };

        var response = await requestService.auth(params);

        // if (response.result == "success") {
        //     navigate("/");
        // }


        if ((response.result == "success")) {
            authDataLoaded(response.data);
        }
    };

    const check = async () => {
        const params = {
            method: "check",
        };

        var response = await requestService.auth(params);
    };

    const test = async () => {
        const params = {
            method: "test",
        };

        var response = await requestService.auth(params);
        response = response.data;
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Авторизация
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => {
                                    setChecked(event.target.checked);
                                }}
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Отправить
                    </Button>
                </Box>
                <Grid container>
                    <Grid item xs>
                        <Button onClick={() => check()}>check</Button>
                        <Button onClick={() => test()}>test</Button>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" variant="body2">
                            Регистрация
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
const mapStateToProps = ({ id, role, token, org, login }) => {
    return { id, role, token, org, login };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default compose(
    withRequestService(),
    withRouter(),
    connect(mapStateToProps, mapDispatchToProps)
)(SignIn);

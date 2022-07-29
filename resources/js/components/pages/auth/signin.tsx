import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { authLogOut, authDataLoaded } from "../../../redux/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import withRequestService from "../../hoc/with-request-service";
import compose from "../../../utils/compose";
import { Link, useHistory } from "react-router-dom";
import { Props } from "../../interfaces";
import Dictionary from "../../../dictionary";

// useRef
// import * as React,

type StateProps = {
    id: string;
    role: string;
    token: string;
    org: string;
    login: string;
};

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" to="/">
                Survey services
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const SignIn: React.FC<Props> = ({ requestService, authDataLoaded }) => {
    const [checked, setChecked] = React.useState<boolean>(true);
    const ref = React.useRef(null);
    const history = useHistory();
    const [errors, setErrors] = React.useState({
        login: false,
        password: false,
    });
    const dict = Dictionary();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            login: formData.get("login"),
            password: formData.get("password"),
        };

        const fieldsErrors = { login: !data.login, password: !data.password };

        setErrors(fieldsErrors);

        // собираем массив значений с ошибками
        const errorsArr = Object.values(fieldsErrors);

        // если есть хоть одна ошибка - запрос не выполняется
        if (errorsArr.find((el) => el === true)) return;

        const params = {
            ...data,
            remember: checked,
            method: "auth",
        };

        var response = await requestService.auth(params);

        if (response.result == "success") {
            authDataLoaded(response.data);
            history.push("/");
        }
    };

    const rmError = (field: string) => {
        setErrors((prev) => {
            return { ...prev, [field]: false };
        });

        console.log("field: ", field);
        console.log("errors: ", errors);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    paddingTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    {dict.auth.title}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        error={errors.login}
                        helperText={
                            errors.login ? dict.error.fieldRequired : ""
                        }
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label={dict.auth.login}
                        name="login"
                        autoComplete="login"
                        autoFocus
                        onFocus={() => rmError("login")}
                    />
                    <TextField
                        error={errors.password}
                        helperText={
                            errors.password ? dict.error.fieldRequired : ""
                        }
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={dict.auth.password}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onFocus={() => rmError("password")}
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
                        label={dict.auth.remember}
                    />
                    <Button
                        ref={ref}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {dict.auth.send}
                    </Button>
                </Box>
                <Grid container>
                    <Grid item>
                        <Link to="/signup"> {dict.reg.title}</Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

const mapStateToProps = ({ id, role, token, org, login }: StateProps) => {
    return { id, role, token, org, login };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ authLogOut, authDataLoaded }, dispatch);

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispatchToProps)
)(SignIn);

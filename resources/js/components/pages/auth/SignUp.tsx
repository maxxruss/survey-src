import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import withRequestService from "../../hoc/with-request-service";
import compose from "../../../utils/compose";
import * as actions from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import Dictionary from "../../../dictionary";

type Props = {
    requestService: {
        auth: (method: object) => { result: string; data: string };
    };
    authDataLoaded: (data: any) => {};
};

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
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

const SignUp = ({ authDataLoaded, requestService }: Props) => {
    const history = useHistory();
    const dict = Dictionary();
    const [errors, setErrors] = React.useState({
        title: false,
        inn: false,
        kpp: false,
        address: false,
        manager: false,
        phone: false,
        email: false,
        login: false,
        password: false,
    });

    const [fields, setFields] = React.useState({
        title: "",
        inn: "",
        kpp: "",
        address: "",
        manager: "",
        phone: "",
        email: "",
        login: "",
        password: "",
    });

    const handleSubmit = async () => {
        let innError = false;
        let kppError = false;

        if (fields.inn && fields.inn.toString().length != 20) {            
            innError = true;
        }

        if (fields.kpp && fields.kpp.toString().length != 20) {
            kppError = true;
        }

        // валидация
        const fieldsErrors = {
            title: !fields.title,
            inn: innError,
            kpp: kppError,
            address: !fields.address,
            manager: !fields.manager,
            phone: !fields.phone,
            email: !fields.email,
            login: !fields.login,
            password: !fields.password,
        };

        setErrors(fieldsErrors);

        // собираем массив значений с ошибками
        const errorsArr = Object.values(fieldsErrors);

        // если есть хоть одна ошибка - запрос не выполняется
        if (errorsArr.find((el) => el === true)) return;

        const params = {
            method: "register",
            ...fields,
        };

        var response = await requestService.auth(params);

        if ((response.result = "success")) {
            // console.log(response.data)
            authDataLoaded(response.data);
            history.push("/");
        }
    };

    const handleChange = (value: string | number, field: string) => {
        setFields((prev) => {
            return { ...prev, [field]: value };
        });
    };

    const rmError = (field: string) => {
        setErrors((prev) => {
            return { ...prev, [field]: false };
        });
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
                    {dict.reg.title}1
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.title}
                                helperText={
                                    errors.title ? dict.error.fieldRequired : ""
                                }
                                name="title"
                                required
                                fullWidth
                                id="title"
                                label={dict.reg.company_title}
                                autoFocus
                                onFocus={() => rmError("title")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "title")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type={"number"}
                                error={errors.inn}
                                helperText={
                                    errors.inn ? dict.error.fieldRequired : ""
                                }
                                name="inn"
                                fullWidth
                                id="inn"
                                label={dict.reg.inn}
                                autoFocus
                                onFocus={() => rmError("inn")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "inn")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.kpp}
                                helperText={
                                    errors.kpp ? dict.error.fieldRequired : ""
                                }
                                name="kpp"
                                fullWidth
                                id="kpp"
                                label={dict.reg.kpp}
                                autoFocus
                                onFocus={() => rmError("kpp")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "kpp")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.address}
                                helperText={
                                    errors.address
                                        ? dict.error.fieldRequired
                                        : ""
                                }
                                name="address"
                                fullWidth
                                id="address"
                                label={dict.reg.company_address}
                                autoFocus
                                onFocus={() => rmError("address")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "address")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.manager}
                                helperText={
                                    errors.manager
                                        ? dict.error.fieldRequired
                                        : ""
                                }
                                name="manager"
                                required
                                fullWidth
                                id="manager"
                                label={dict.reg.company_manager}
                                autoFocus
                                onFocus={() => rmError("manager")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "manager")
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={errors.phone}
                                helperText={
                                    errors.phone ? dict.error.fieldRequired : ""
                                }
                                required
                                fullWidth
                                id="phone"
                                label={dict.reg.phone}
                                name="phone"
                                autoComplete="phone"
                                onFocus={() => rmError("phone")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "phone")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.email}
                                helperText={
                                    errors.email ? dict.error.fieldRequired : ""
                                }
                                required
                                fullWidth
                                id="email"
                                label={dict.reg.email}
                                name="email"
                                autoComplete="email"
                                onFocus={() => rmError("email")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "email")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.login}
                                helperText={
                                    errors.login ? dict.error.fieldRequired : ""
                                }
                                name="login"
                                required
                                fullWidth
                                id="login"
                                label={dict.reg.login}
                                autoFocus
                                onFocus={() => rmError("login")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "login")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.password}
                                helperText={
                                    errors.password
                                        ? dict.error.fieldRequired
                                        : ""
                                }
                                required
                                fullWidth
                                name="password"
                                label={dict.reg.password}
                                type="password"
                                id="password"
                                onFocus={() => rmError("password")}
                                onChange={(e) =>
                                    handleChange(e.target.value, "password")
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleSubmit()}
                    >
                        {dict.reg.send}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signin">{dict.auth.title}</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
};

const mapStateToProps = ({ id, role, token, org, login }: StateProps) => {
    return { id, role, token, org, login };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(actions, dispatch);

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispatchToProps)
)(SignUp);

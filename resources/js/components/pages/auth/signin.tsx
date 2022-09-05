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
import { DictTypes } from "../../TS/Types";

type AuthTypes = {
    authLogOut: () => void;
    requestService: {
        auth: (method: object) => {
            result: string;
            data: { [v: string]: string | number };
        };
    };
    authDataLoaded: (data: { [v: string]: string | number }) => void;
    lang: string;
}


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

const dict: DictTypes = {
    title: { en: "Auth", ru: 'Авторизация' },
    login: { en: "Login", ru: 'Логин' },
    password: { en: "Password", ru: 'Пароль' },
    remember: { en: "Remember me", ru: 'Запомнить меня' },
    send: { en: "Send", ru: 'Отправить' },
    fieldRequired: { en: "Required field", ru: 'Обязательное поле' },
    regTitle: { en: "Registration", ru: 'Регистрация' },
};

const SignIn: React.FC<AuthTypes> = ({ requestService, authDataLoaded, lang }) => {
    const [checked, setChecked] = React.useState<boolean>(true);
    const ref = React.useRef(null);
    const history = useHistory();
    const [errors, setErrors] = React.useState({
        login: false,
        password: false,
    });

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
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    paddingTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    {dict.title[lang]}
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
                            errors.login ? dict.fieldRequired[lang] : ""
                        }
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label={dict.login[lang]}
                        name="login"
                        autoComplete="login"
                        autoFocus
                        onFocus={() => rmError("login")}
                    />
                    <TextField
                        error={errors.password}
                        helperText={
                            errors.password ? dict.fieldRequired[lang] : ""
                        }
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={dict.password[lang]}
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
                        label={dict.remember[lang]}
                    />
                    <Button
                        ref={ref}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {dict.send[lang]}
                    </Button>
                </Box>
                <Grid container>
                    <Grid item>
                        <Button component={Link} to="/signup">
                            {dict.regTitle[lang]}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
    );
};

const mapStateToProps = ({ lang }: { lang: string }) => {
    return { lang };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ authLogOut, authDataLoaded }, dispatch);

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispatchToProps)
)(SignIn);

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
import Spinner from "../../spinner";
import { DictTypes } from "../../TS/Types";

type RegTypes = {
    requestService: {
        auth: (method: object) => { result: string; data: string };
    };
    lang: string;
};

const dict: DictTypes = {
    title: { en: "Registration", ru: 'Регистрация' },
    login: { en: "Login", ru: 'Логин' },
    password: { en: "Password", ru: 'Пароль' },
    remember: { en: "Remember me", ru: 'Запомнить меня' },
    send: { en: "Send", ru: 'Отправить' },
    fieldRequired: { en: "Required field", ru: 'Обязательное поле' },
    authTitle: { en: "Auth", ru: 'Авторизация' },
    companyTitle: { en: "Title", ru: 'Наименование' },
    inn: { en: "INN", ru: 'ИНН' },
    kpp: { en: "KPP", ru: 'КПП' },
    companyAddress: { en: "Address of company", ru: 'Адрес компании' },
    companyManager: { en: "Manager of company", ru: 'ФИО менеджера компании' },
    phone: { en: "Phone of company", ru: 'Телефон компании' },
    email: { en: "User's E-mail", ru: 'Электронная почта пользователя' },
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

const theme = createTheme();

const SignUp = ({ requestService, lang }: RegTypes) => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);

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

        setLoading(true);

        var response = await requestService.auth(params);

        if ((response.result = "success")) {
            setLoading(false);
            history.push("/pleaseConfirm");
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

    if (loading) return <Spinner />;

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
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.title}
                                helperText={
                                    errors.title ? dict.fieldRequired[lang] : ""
                                }
                                name="title"
                                required
                                fullWidth
                                id="title"
                                label={dict.companyTitle[lang]}
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
                                    errors.inn ? dict.fieldRequired[lang] : ""
                                }
                                name="inn"
                                fullWidth
                                id="inn"
                                label={dict.inn[lang]}
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
                                    errors.kpp ? dict.fieldRequired[lang] : ""
                                }
                                name="kpp"
                                fullWidth
                                id="kpp"
                                label={dict.kpp[lang]}
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
                                        ? dict.fieldRequired[lang]
                                        : ""
                                }
                                name="address"
                                fullWidth
                                id="address"
                                label={dict.companyAddress[lang]}
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
                                        ? dict.fieldRequired[lang]
                                        : ""
                                }
                                name="manager"
                                required
                                fullWidth
                                id="manager"
                                label={dict.companyManager[lang]}
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
                                    errors.phone ? dict.fieldRequired[lang] : ""
                                }
                                required
                                fullWidth
                                id="phone"
                                label={dict.phone[lang]}
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
                                    errors.email ? dict.fieldRequired[lang] : ""
                                }
                                required
                                fullWidth
                                id="email"
                                label={dict.email[lang]}
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
                                    errors.login ? dict.fieldRequired[lang] : ""
                                }
                                name="login"
                                required
                                fullWidth
                                id="login"
                                label={dict.login[lang]}
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
                                        ? dict.fieldRequired[lang]
                                        : ""
                                }
                                required
                                fullWidth
                                name="password"
                                label={dict.password[lang]}
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
                        {dict.send[lang]}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button component={Link} to="/signin">
                                {dict.authTitle[lang]}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
    );
};

const mapStateToProps = ({ lang }: {lang: string}) => {
    return { lang };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(actions, dispatch);

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispatchToProps)
)(SignUp);

import React, { useState, useEffect } from "react";
import PageLayout from "../../../ui/PageLayout";
import withRequestService from "../../../hoc/with-request-service";
import compose from "../../../../utils/compose";
import { connect } from "react-redux";
import {
    Grid,
    Button,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { DictTypes } from "../../../TS/Types";


const dict: DictTypes = {
    title: { en: "Registration", ru: 'Регистрация' },
    login: { en: "Login", ru: 'Логин' },
    password: { en: "Password", ru: 'Пароль' },
    remember: { en: "Remember me", ru: 'Запомнить меня' },
    send: { en: "Send", ru: 'Отправить' },
    fieldRequired: { en: "Required field", ru: 'Обязательное поле' },
    email: { en: "User's E-mail", ru: 'Электронная почта пользователя' },
};

type Props = {
    requestService: {
        request: (method: object) => {
            result: string;
            data: UserTypes;
        };
    };
    id: number | string | null;
    open: boolean;
    close: () => {};
    onSuccess: () => {};
    lang: string
};

type UserTypes = {
    id: number | string | null;
    email: string;
    last_name: string;
    middle_name: string;
    first_name: string;
    is_active: boolean;
};

const ResponderEdit = ({ requestService, id, open, close, lang, onSuccess }: Props) => {
    const initData = {
        id,
        first_name: "",
        middle_name: "",
        last_name: "",
        is_active: false,
        email: "",
    };
    const [data, setData] = useState<UserTypes>(initData);
    const [loading, setloading] = useState(false)
    const [errors, setErrors] = React.useState({
        first_name: false,
        email: false
    });

    const validate = () => {
        let first_name = false;
        let email = false;

        if (!data.first_name) {
            first_name = true;
        }

        if (!data.email) {
            email = true;
        }

        // валидация
        const errors = { first_name, email };
        setErrors(errors);

        // собираем массив значений с ошибками
        const errorsArr = Object.values(errors);

        if (errorsArr.find((el) => el === true)) {
            return false
        } else {
            return true
        };
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);
        if (!validate()) return

        const response = await requestService.request({
            url: "asker/responder/save",
            params: data
        });

        if (response.result == "success") {
            onSuccess()
        }
    };

    const getData = async (respondent_id: number | string | null) => {
        const response = await requestService.request({
            url: "asker/getResponder/" + respondent_id,
            method: "get",
        });

        if (response.result == "success") {
            setData(response.data);
        }
    };

    useEffect(() => {
        setData(initData);
        if (open && id && id != "new") getData(id);
    }, [id, open]);

    const onChange = (value: string | number, field: string) => {
        setData((prev) => {
            return { ...prev, [field]: value };
        });
    };

    return (
        <Dialog
            open={open}
            onClose={() => close()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <form onSubmit={submit} noValidate>
                <DialogTitle id="alert-dialog-title">
                    {data.id == "new" ? "Новый респондент" : "Респондент №" + data.id}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4} direction="row">
                        <Grid item xs={12} mt={2}>
                            <TextField
                                error={errors.first_name}
                                size="small"
                                label="Имя"
                                fullWidth
                                multiline
                                value={data.first_name}
                                onChange={(e) =>
                                    onChange(e.target.value, "first_name")
                                }
                                helperText={
                                    errors.first_name ? dict.fieldRequired[lang] : ""
                                }

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                label="Отчество"
                                fullWidth
                                multiline
                                value={data.middle_name}
                                onChange={(e) =>
                                    onChange(e.target.value, "middle_name")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                label="Фамилия"
                                fullWidth
                                multiline
                                value={data.last_name}
                                onChange={(e) =>
                                    onChange(e.target.value, "last_name")
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.email}
                                size="small"
                                label="Email"
                                fullWidth
                                multiline
                                value={data.email}
                                onChange={(e) => onChange(e.target.value, "email")}
                                helperText={
                                    errors.email ? dict.fieldRequired[lang] : ""
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => close()}>Отмена</Button>
                    <Button type="submit" autoFocus>
                        Сохранить
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

const mapStateToProps = ({ lang }: { lang: string }) => {
    return { lang };
};

export default compose(
    withRequestService(),
    connect(mapStateToProps)
)(ResponderEdit);

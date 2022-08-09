import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import withRequestService from "../../../hoc/with-request-service";
import PageLayout from "../../../ui/PageLayout";
import { connect } from "react-redux";
import compose from "../../../../utils/compose";
import { makeStyles } from "@mui/styles";
import { Snackbar, Alert } from "@mui/material";
import { setUser } from "../../../../redux/actions";
import { bindActionCreators } from "redux";

type Props = {
    requestService: {
        request: (method: object) => { result: string; data: any };
    };
    id: string;
    login: string;
    email: string;
    role: string;
};

type StateProps = {
    id: string;
    login: string;
    email: string;
    role: string;
};

type PropsItem = {
    title: string;
    value: string;
    disabled: boolean;
};

type SnackProps = {
    open: boolean;
    message: string;
};

type PropsData = {
    [date: string]: PropsItem;
};

const useStyles = makeStyles({
    titleGrid: {
        paddingRight: "35px",
        textAlign: "right",
        alignSelf: "center",
        fontWeight: "600",
        fontSize: "20px",
    },
    dataGrid: {
        // paddingLeft: '15px',
    },
});

const AskerProfile = ({ requestService, id, login, email, role }: Props) => {
    const classes = useStyles();
    const [disabledSave, setDisabledSave] = useState<boolean>(true);
    const [snack, setSnack] = useState<SnackProps>({
        open: false,
        message: "",
    });
    const initData = {
        id: { title: "id", value: id, disabled: true },
        login: { title: "login", value: login, disabled: false },
        email: { title: "email", value: email, disabled: true },
        role: { title: "role", value: role, disabled: true },
    };

    const [newData, setNewData] = useState<PropsData>(initData);

    const setField = (value: string, field: string) => {
        // сохраняем обновленные данные в отдельную константу, чтобы передать ее аргументом в функцию проверки на изменения.
        const updatedData = {
            ...newData,
            [field]: { ...newData[field], value },
        };
        setNewData(updatedData);
        checkForChanges(updatedData);
    };

    const save = async () => {
        const params = {
            login: newData.login.value,
        };

        const response = await requestService.request({
            url: "asker/saveProfile",
            params,
        });

        switch (response.result) {
            case "success":
                setSnack({ open: true, message: "Сохранено" });
                setUser({ login: response.data.login });
                break;
            case "failed":
                setSnack({ open: true, message: "Ошибка сохранения" });
                break;
            case "no_changes":
                setSnack({
                    open: true,
                    message: "Нет изменений для сохранения",
                });
                break;
            default:
                setSnack({
                    open: true,
                    message: "Неизвестная ошибка",
                });
        }
        checkForChanges(initData);
    };

    const reset = () => {
        setNewData(initData);
        checkForChanges(initData);
    };

    const checkForChanges = (updatedData: PropsData) => {
        if (initData.login.value == updatedData.login.value) {
            setDisabledSave(true);
        } else {
            setDisabledSave(false);
        }
    };

    const RowData = (item: PropsItem) => {
        // const { item } = props;
        return (
            <Grid item container direction={"row"}>
                <Grid item className={classes.titleGrid} xs={6}>
                    {item.title}
                </Grid>
                <Grid item className={classes.dataGrid} xs={3}>
                    <TextField
                        size="small"
                        disabled={item.disabled}
                        value={item.value}
                        onChange={(e) => setField(e.target.value, item.title)}
                        variant="outlined"
                        style={{
                            width: "100%",
                        }}
                    />
                </Grid>
            </Grid>
        );
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snack.open}
                autoHideDuration={5000}
                onClose={() => setSnack({ ...snack, open: false })}
            >
                <Alert
                    onClose={() => setSnack({ ...snack, open: false })}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {snack.message}
                </Alert>
            </Snackbar>
            <PageLayout title="Главная">
                <Grid container spacing={4}>
                    <Grid item container direction={"column"} spacing={3}>
                        {/* элементы в виде js функции а не в виде jsx элемента, чтобы измегать перерисовки всех полей после изменения и потери фокуса на инпуте */}
                        {RowData(newData.title)}
                        {RowData(newData.active)}
                        {RowData(newData.inn)}
                        {RowData(newData.kpp)}
                        {RowData(newData.manager)}
                        {RowData(newData.phone)}
                        {RowData(newData.create)}
                    </Grid>
                    <Grid item container justifyContent="center" spacing={4}>
                        <Grid item>
                            <Button variant="outlined" onClick={() => reset()}>
                                Сбросить
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                disabled={disabledSave}
                                onClick={() => save()}
                            >
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </PageLayout>
        </>
    );
};

const mapStateToProps = ({ id, login, email, role }: StateProps) => {
    return { id, login, email, role };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ setUser }, dispatch);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRequestService()
)(AskerProfile);

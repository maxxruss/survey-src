import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import withRequestService from "../../../hoc/with-request-service";
import PageLayout from "../../../ui/PageLayout";
import { connect } from "react-redux";
import compose from "../../../../utils/compose";
import { makeStyles } from "@mui/styles";
import { Snackbar, Alert } from "@mui/material";
import { setCompany } from "../../../../redux/actions";
import { bindActionCreators } from "redux";

type CompanyProps = { [v: string]: any };

type Props = {
    requestService: {
        request: (method: object) => { result: string; data: any };
    };
    setCompany: { (v: CompanyProps): void };
    company: CompanyProps;
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

const AskerMain = ({ requestService, setCompany, company }: Props) => {
    const classes = useStyles();
    const [disabledSave, setDisabledSave] = useState<boolean>(true);
    const [snack, setSnack] = useState<SnackProps>({
        open: false,
        message: "",
    });
    const { title, is_active, kpp, inn, manager, phone, created_at } = company;
    const initData = {
        title: { title: "title", value: title, disabled: false },
        active: {
            title: "active",
            value: is_active ? "Активна" : "Неактивна",
            disabled: true,
        },
        kpp: { title: "kpp", value: kpp, disabled: false },
        inn: { title: "inn", value: inn, disabled: false },
        manager: { title: "manager", value: manager, disabled: false },
        phone: { title: "phone", value: phone, disabled: false },
        create: { title: "create", value: created_at, disabled: true },
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
            title: newData.title.value,
            inn: newData.inn.value,
            kpp: newData.kpp.value,
            manager: newData.manager.value,
            phone: newData.phone.value,
        };

        const response = await requestService.request({
            url: "asker/saveCompany",
            params,
        });

        switch (response.result) {
            case "success":
                setSnack({ open: true, message: "Сохранено" });
                setCompany({ company: response.data });
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

    // в функцию передаем данные для сравнения. Если сравнивать со state (state асинхронен) - то сравнение производится с предыдущим состоянием, а не с актуальным.
    const checkForChanges = (updatedData: PropsData) => {
        if (
            initData.title.value == updatedData.title.value &&
            initData.inn.value == updatedData.inn.value &&
            initData.kpp.value == updatedData.kpp.value &&
            initData.manager.value == updatedData.manager.value &&
            initData.phone.value == updatedData.phone.value
        ) {
            setDisabledSave(true);
        } else {
            setDisabledSave(false);
        }
    };

    const RowData = (item: PropsItem) => {
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

const mapStateToProps = ({ company }: CompanyProps) => {
    return { company };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ setCompany }, dispatch);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRequestService()
)(AskerMain);

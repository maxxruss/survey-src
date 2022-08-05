import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import withRequestService from "../../../hoc/with-request-service";
import PageLayout from "../../../ui/PageLayout";
import { connect } from "react-redux";
import compose from "../../../../utils/compose";
import { makeStyles } from "@mui/styles";

type Props = {
    requestService: {
        request: (method: object) => { result: string; data: any };
    };
    auth: boolean;
    id: string;
    login: string;
    email: string;
    role: string;
    company: { [v: string]: any };
};

type StateProps = {
    auth: boolean;
    id: string;
    login: string;
    email: string;
    role: string;
    company: { [v: string]: any };
};
type PropsData =
    | {
          title: string;
          disabled: boolean;
          value: string;
      }[]
    | [];

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

const MainAsker = ({
    requestService,
    auth,
    id,
    login,
    email,
    role,
    company,
}: Props) => {
    const classes = useStyles();
    const [needSave, setNeedSave] = useState<boolean>(true);
    const initData = [
        { title: "id", value: id, disabled: true },
        { title: "login", value: login, disabled: false },
        { title: "email", value: email, disabled: true },
        { title: "role", value: role, disabled: true },
        { title: "active", value: company.is_active, disabled: true },
        { title: "kpp", value: company.kpp, disabled: false },
        { title: "inn", value: company.inn, disabled: false },
        { title: "manager", value: company.manager, disabled: false },
        { title: "phone", value: company.phone, disabled: false },
        { title: "title", value: company.title, disabled: false },
        { title: "create", value: company.created_at, disabled: true },
    ];

    const [newData, setNewData] = useState<PropsData>([
        { title: "id", value: id, disabled: true },
        { title: "login", value: login, disabled: false },
        { title: "email", value: email, disabled: true },
        { title: "role", value: role, disabled: true },
        { title: "active", value: company.is_active, disabled: true },
        { title: "kpp", value: company.kpp, disabled: false },
        { title: "inn", value: company.inn, disabled: false },
        { title: "manager", value: company.manager, disabled: false },
        { title: "phone", value: company.phone, disabled: false },
        { title: "title", value: company.title, disabled: false },
        { title: "create", value: company.created_at, disabled: true },
    ]);

    const setField = (value: string, field: string) => {
        const updatedData = newData.map((el) => {
            return el.title == field ? { ...el, value } : el;
        });

        setNewData(updatedData);
        checkForChanges(updatedData);
    };

    const save = async () => {
        const params = {
            newData,
        };

        const response = await requestService.request({
            url: "asker/saveProfile",
            params,
        });
        
        console.log("response: ", response);
    };



    const reset = () => {
        setNewData(initData);
    };

    const checkForChanges = (updatedData: PropsData) => {
        let changesCount = 0;
        initData.forEach((initEl) => {
            updatedData.forEach((newEl) => {
                if (
                    initEl.title == newEl.title &&
                    initEl.value != newEl.value
                ) {
                    changesCount++;
                }
            });
        });

        changesCount ? setNeedSave(false) : setNeedSave(true);
    };

    return (
        <PageLayout title="Главная">
            <Grid container spacing={4}>
                <Grid item container direction={"column"} spacing={3}>
                    {newData.map((item, i) => {
                        return (
                            <Grid
                                item
                                container
                                direction={"row"}
                                key={item.title + i}
                            >
                                <Grid item className={classes.titleGrid} xs={6}>
                                    {item.title}
                                </Grid>
                                <Grid item className={classes.dataGrid} xs={3}>
                                    <TextField
                                        size="small"
                                        disabled={item.disabled}
                                        value={item.value}
                                        onChange={(e) =>
                                            setField(e.target.value, item.title)
                                        }
                                        variant="outlined"
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        );
                    })}
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
                            disabled={needSave}
                            onClick={() => save()}
                        >
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

const mapStateToProps = ({
    auth,
    id,
    login,
    email,
    role,
    company,
}: StateProps) => {
    return { auth, id, login, email, role, company };
};

export default compose(
    connect(mapStateToProps),
    withRequestService()
)(MainAsker);

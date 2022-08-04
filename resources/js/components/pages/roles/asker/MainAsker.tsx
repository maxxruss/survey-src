import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
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
type PropsUseState = {
    title: string;
    disabled: boolean;
    value: { [v: string]: any };
} | [];

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
    const [data, setData] = useState<PropsUseState>([]);

    const getData = async () => {
        const params = {
            id: 1,
            name: "max",
            password: 12345,
            method: "test",
        };

        let response = await requestService.request({
            url: "asker/test",
            params,
        });
        console.log("response: ", response);
    };

    useEffect(() => {
        getData();
    }, []);

    // let response = await getData(requestService)

    // var response = ;
    // console.log("response: ", response);

    // if (response.result == "success") {
    //     console.log("response.data: ", response.data.params);
    // }
    setData([
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
        const index = data.findIndex((el) => {
            return el.title == field;
        });

        setData([...data, data[index].value : value])

        data[index].value = value;

        console.log("data: ", data);
    };

    return (
        <PageLayout title="Главная">
            <Grid container direction={"column"} spacing={3}>
                {data.map((item, i) => {
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

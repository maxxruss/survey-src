import React, { useState, useEffect } from "react";
import PageLayout from "../../../ui/PageLayout";
import withRequestService from "../../../hoc/with-request-service";
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
};

type UserTypes = {
    id: number | string | null;
    email: string;
    last_name: string;
    middle_name: string;
    first_name: string;
    is_active: string;
};

const ResponderEdit = ({ requestService, id, open, close }: Props) => {
    const initData = {
        id,
        first_name: "",
        middle_name: "",
        last_name: "",
        is_active: "",
        email: "",
    };
    const [data, setData] = useState<UserTypes>(initData);

    const save = async () => {
        // const response = await requestService.request({
        //     url: "asker/survey/add",
        //     params,
        // });
        // if (response.result == "success") {
        //     setId(response.data.id);
        // }
    };

    const getData = async () => {
        const response = await requestService.request({
            url: "asker/getResponder/" + id,
            method: "get",
        });

        if (response.result == "success") {
            setData(response.data);
            // console.log(response.data)
            // const { id, title, questions } = response.data;
            // setId(id);
            // setTitle(title);
            // setQuestions(questions);
        }
    };

    useEffect(() => {
        setData(initData);
        if (id != "new") getData();
    }, [id]);

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
            <DialogTitle id="alert-dialog-title">
                {id == "new" ? "Новый респондент" : "Респондент №" + id}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={4} direction="row">
                    <Grid item xs={12} mt={2}>
                        <TextField
                            size="small"
                            label="Имя"
                            fullWidth
                            multiline
                            value={data.first_name}
                            onChange={(e) =>
                                onChange(e.target.value, "first_name")
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
                            size="small"
                            label="Email"
                            fullWidth
                            multiline
                            value={data.email}
                            onChange={(e) => onChange(e.target.value, "email")}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close()}>Отмена</Button>
                <Button onClick={() => save()} autoFocus>
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withRequestService()(ResponderEdit);

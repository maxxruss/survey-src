import React, { useState, useEffect } from "react";
import PageLayout from "../../../ui/PageLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Grid,
    Button,
} from "@mui/material";
import withRequestService from "../../../hoc/with-request-service";
import ConfirmDialog from "../../../ui/ConfirmDialog";
import { Delete, Edit } from "@mui/icons-material";
import ResponderEdit from "./ResponderEdit";

type UsersTypes = {
    id: number;
    login: string;
    email: string;
    last_name: string;
    middle_name: string;
    first_name: string;
    is_active: string;
}[];

type UserIdTypes = number | string | null;

type PropTypes = {
    requestService: {
        request: (method: object) => {
            result: string;
            data:  UsersTypes ;
        };
    };
};

const RespondersList = ({ requestService }: PropTypes) => {
    const [data, setData] = useState<UsersTypes>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [userId, setUserId] = useState<UserIdTypes>(null);

    const getData = async () => {
        const response = await requestService.request({
            url: "asker/responders/getlist",
            method: "get",
        });

        if (response.result == "success") {
            setData(response.data);
        }
    };

    const onDelete = async (id: UserIdTypes) => {
       const response = await requestService.request({
            url: "asker/responders/delete/" + id,
            method: "get",
        });

        if (response.result == "success") {
            getData();
        }
    };

    const saveSuccess = () => {
        setOpenEdit(false)
        getData();
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <ConfirmDialog
                open={dialogOpen}
                title="Удаление"
                text="Удалить пользователя?"
                onConfirm={() => onDelete(userId)}
                onClose={() => setDialogOpen(false)}
            />
            <ResponderEdit
                open={openEdit}
                id={userId}
                close={() => setOpenEdit(false)}
                onSuccess={() => saveSuccess()}
            />
            <PageLayout title="Участники">
                <Grid container spacing={2} direction="row">
                    <Grid item container justifyContent={"end"}>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setUserId("new"), setOpenEdit(true);
                                }}
                            >
                                Добавить
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>E-mail</TableCell>
                                        <TableCell align="right">
                                            Фамилия
                                        </TableCell>
                                        <TableCell align="right">Имя</TableCell>
                                        <TableCell align="right">
                                            Отчество
                                        </TableCell>
                                        <TableCell align="right">
                                            Активность
                                        </TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((user) => (
                                        console.log('user: ', user),
                                        <TableRow
                                            key={'user' + user.id}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {user.email}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.last_name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.middle_name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.first_name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {user.is_active
                                                    ? "Активен"
                                                    : "Неактивен"}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="upload picture"
                                                    component="span"
                                                    onClick={() => {
                                                        setUserId(user.id),
                                                            setDialogOpen(true);
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="upload picture"
                                                    component="span"
                                                    onClick={() => {
                                                        setUserId(user.id),
                                                            setOpenEdit(true);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </PageLayout>
        </>
    );
};

export default withRequestService()(RespondersList);

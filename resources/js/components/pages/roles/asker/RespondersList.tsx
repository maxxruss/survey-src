import React, { useState, useEffect } from "react"
import PageLayout from "../../../ui/PageLayout"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import withRequestService from "../../../hoc/with-request-service";
import ConfirmDialog from "../../../ui/ConfirmDialog"
import { Delete, Edit } from "@mui/icons-material";


type UsersTypes = {
    id: number;
    login: string;
    email: string;
    last_name: string;
    middle_name: string;
    first_name: string;
    is_active: string;
}[];

type UserIdTypes = number | null;

type PropTypes = {
    requestService: {
        request: (method: object) => {
            result: string;
            data: UsersTypes;
        };
    };
};

const RespondersList = ({ requestService }: PropTypes) => {
    const [data, setData] = useState<UsersTypes>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<UserIdTypes>(null);
    const [action, setAction] = useState();

    const getData = async () => {
        const response = await requestService.request({
            url: "asker/responders/getlist",
            method: "get"
        });

        if (response.result == "success") {
            setData(response.data);
        }
    };

    const onDelete = async (id: UserIdTypes) => {
        // const params = { id };
        console.log('onDelete: ', id)

        // const response = await requestService.request({
        //     url: "asker/survey/delete",
        //     params,
        // });

        // if (response.result == "success") {
        //     getData();
        // }
    };


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

            <PageLayout title="Участники">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>E-mail</TableCell>
                                <TableCell align="right">Фамилия</TableCell>
                                <TableCell align="right">Имя</TableCell>
                                <TableCell align="right">Отчество</TableCell>
                                <TableCell align="right">Активность</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.email}
                                    </TableCell>
                                    <TableCell align="right">{user.last_name}</TableCell>
                                    <TableCell align="right">{user.middle_name}</TableCell>
                                    <TableCell align="right">{user.first_name}</TableCell>
                                    <TableCell align="right">{user.is_active ? 'Активен' : 'Неактивен'}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                            onClick={() => {
                                                setUserId(user.id),
                                                    setDialogOpen(true)
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                        // onClick={() => setUserId(user.id) () => setShow(true)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PageLayout>
        </>)
}

export default withRequestService()(RespondersList)
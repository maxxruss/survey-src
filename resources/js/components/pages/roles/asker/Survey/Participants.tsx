import React, { useState, useEffect } from 'react'
import { Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Paper } from '@mui/material';
import withRequestService from "../../../../hoc/with-request-service";

type UsersTypes = UserTypes[];

type UserTypes = {
    id: number;
    login: string;
    email: string;
    last_name: string;
    middle_name: string;
    first_name: string;
    is_active: string;
    created_at: string;
};

type PropTypes = {
    surveyId: number | string;
    requestService: {
        request: (method: object) => {
            result: string;
            participants: UsersTypes;
            responders: UsersTypes;
        };
    };
};


function not(a: UsersTypes, b: UsersTypes) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: UsersTypes, b: UsersTypes) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const Participants = ({ surveyId, requestService }: PropTypes) => {
    const [checked, setChecked] = useState<UsersTypes>([]);
    const [left, setLeft] = useState<UsersTypes>([]);
    const [right, setRight] = useState<UsersTypes>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const getData = async () => {
        const response = await requestService.request({
            url: "asker/responders/getListBySurvey/" + surveyId,
            method: "get",
        });

        if (response.result == "success") {
            setLeft(response.responders);
            setRight(response.participants);
        }
    };

    const handleToggle = (user: UserTypes) => () => {
        const currentIndex = checked.indexOf(user);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(user);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const save = () => {
        console.log('save')
        getData();
    };

    useEffect(() => {
        getData();
    }, []);

    const customList = (users: UsersTypes) => (
        <Paper>
            <List dense component="div" role="list">
                {users.map((user: UserTypes) => {
                    const labelId = `transfer-list-item-${user}-label`;

                    return (
                        <ListItem
                            key={user.id}
                            role="listitem"
                            button
                            onClick={handleToggle(user)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(user) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${user.last_name} ${user.first_name} ${user.middle_name}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={5}>{customList(left)}</Grid>
            <Grid item xs={2}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={save}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        Сохранить
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={5}>{customList(right)}</Grid>
        </Grid>
    );
}

export default withRequestService()(Participants)
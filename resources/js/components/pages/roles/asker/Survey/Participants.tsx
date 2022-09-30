import React, { useState, useEffect, useCallback } from "react";
import {
    TextField,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Button,
    Paper,
    Autocomplete,
} from "@mui/material";
import withRequestService from "../../../../hoc/with-request-service";
import debounce from "lodash/debounce";

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
            candidates: UsersTypes;
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
    const [query, setQuery] = useState<string | null>("");
    const [checked, setChecked] = useState<UsersTypes>([]);
    const [candidates, setCandidates] = useState<UsersTypes>([]);
    const [participants, setParticipants] = useState<UsersTypes>([]);

    const candidatesChecked = intersection(checked, candidates);
    const participantsChecked = intersection(checked, participants);

    const getData = async () => {
        loadCandidates();
        loadParticipants();
    };

    const loadCandidates = async (query = "") => {
        const params = {
            id: surveyId,
            query,
        };
        const response = await requestService.request({
            url: "asker/responders/getListCandidats",
            params,
        });

        if (response.result == "success") {
            setCandidates(response.candidates);
        }
    };

    const loadParticipants = async () => {
        const response = await requestService.request({
            url: "asker/responders/getListParticipants/" + surveyId,
            method: "get",
        });

        if (response.result == "success") {
            setParticipants(response.participants);
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

    const handleAllParticipants = () => {
        setParticipants(participants.concat(candidates));
        setCandidates([]);
    };

    const handleCheckedParticipants = () => {
        setParticipants(participants.concat(candidatesChecked));
        setCandidates(not(candidates, candidatesChecked));
        setChecked(not(checked, candidatesChecked));
    };

    const handleCheckedCandidates = () => {
        setCandidates(candidates.concat(participantsChecked));
        setParticipants(not(participants, participantsChecked));
        setChecked(not(checked, participantsChecked));
    };

    const handleAllCandidates = () => {
        setCandidates(candidates.concat(participants));
        setParticipants([]);
    };

    const save = async () => {
        const params = {
            surveyId,
            participants,
        };

        const response = await requestService.request({
            url: "asker/responders/saveParticipants",
            params,
        });

        if (response.result == "success") {
            console.log("success");
        }

        getData();
    };

    useEffect(() => {
        getData();
    }, []);

    const loadUsersDebounced = useCallback(
        debounce((query) => loadCandidates(query), 400),
        []
    );   

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
                                        "aria-labelledby": labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={`${user.last_name} ${user.first_name} ${user.middle_name}`}
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Поиск кандидатов"
                    value={query}
                    onChange={(e) =>{ 
                        setQuery(e.target.value),
                        loadUsersDebounced(e.target.value)
                    }}
                />
            </Grid>
            <Grid
                item
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={5}>
                    {customList(candidates)}
                </Grid>
                <Grid item xs={2}>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={save}
                            // disabled={candidates.length === 0}
                            aria-label="move all participants"
                        >
                            Сохранить
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllParticipants}
                            disabled={candidates.length === 0}
                            aria-label="move all participants"
                        >
                            ≫
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedParticipants}
                            disabled={candidatesChecked.length === 0}
                            aria-label="move selected participants"
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedCandidates}
                            disabled={participantsChecked.length === 0}
                            aria-label="move selected candidates"
                        >
                            &lt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleAllCandidates}
                            disabled={participants.length === 0}
                            aria-label="move all candidates"
                        >
                            ≪
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    {customList(participants)}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withRequestService()(Participants);
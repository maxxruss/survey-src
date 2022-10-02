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

type UsersTypes = UserTypes[];

type initUsers = {
    participants: UsersTypes;
    candidates: UsersTypes;
}

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
    const [queryCandidates, setQueryCandidates] = useState<string | null>("");
    const [queryParticipants, setQueryParticipants] = useState<string | null>("");
    const [checked, setChecked] = useState<UsersTypes>([]);
    const [candidates, setCandidates] = useState<UsersTypes>([]);
    const [participants, setParticipants] = useState<UsersTypes>([]);
    const [initUsers, setInitUsers] = useState<initUsers>({participants:[], candidates:[]});
    const candidatesChecked = intersection(checked, candidates);
    const participantsChecked = intersection(checked, participants);
    const [changedUsers, setChangedUsers] = useState<UsersTypes>([])

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
            setInitUsers((prev) => {
                return {
                    participants: prev.participants,
                    candidates: response.candidates,
                };
            });
        }
    };

    const loadParticipants = async (query = "") => {
        const params = {
            id: surveyId,
            query,
        };

        const response = await requestService.request({
            url: "asker/responders/getListParticipants",
            params
        });

        if (response.result == "success") {
            setParticipants(response.participants);
            setInitUsers((prev) => {
                return {
                    participants: response.participants,
                    candidates: prev.candidates,
                };
            });
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
        toggleChangedUsers(candidates)
    };

    const handleCheckedParticipants = () => {
        setParticipants(participants.concat(candidatesChecked));
        setCandidates(not(candidates, candidatesChecked));
        setChecked(not(checked, candidatesChecked));
        toggleChangedUsers(participants.concat(candidatesChecked))
    };

    const handleCheckedCandidates = () => {
        setCandidates(candidates.concat(participantsChecked));
        setParticipants(not(participants, participantsChecked));
        setChecked(not(checked, participantsChecked));
        toggleChangedUsers(candidates.concat(participantsChecked))
    };

    const handleAllCandidates = () => {
        setCandidates(candidates.concat(participants));
        setParticipants([]);
        toggleChangedUsers(participants)
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

    const searchCandidatesDebounce = useCallback(
        debounce((query) => loadCandidates(query), 400),
        []
    );

    const searchParticipantsDebounce = useCallback(
        debounce((query) => loadParticipants(query), 400),
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

    const toggleChangedUsers = (newUsers: UsersTypes) => {
        let newArray = [...changedUsers];
        if (!changedUsers.length) {
            newArray = [...newUsers];
        } else {
            changedUsers.map((CU, i) => {
                if (!newUsers.find((NU) => CU.id === NU.id)) {
                    console.log("no find");
                    newArray = [...newArray, ...newUsers];
                } else {
                    console.log("find: ", changedUsers[i]);
                    newArray.splice(i, 1);
                }
            });
        }
        
        setChangedUsers(newArray);

        console.log("newArray: ", newArray);
        // console.log("changedUsers: ", changedUsers);
    };

    return (
        <Grid container direction={'row'} spacing={3}>
            {/* <Grid
                item
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
            > */}
            <Grid item container direction={'row'} xs={5}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Кандидаты"
                        value={queryCandidates}
                        onChange={(e) => {
                            setQueryCandidates(e.target.value),
                                searchCandidatesDebounce(e.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    {customList(candidates)}
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={save}
                        disabled={!changedUsers.length}
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
            <Grid item container direction={'row'} xs={5}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Участники"
                        value={queryParticipants}
                        onChange={(e) => {
                            setQueryParticipants(e.target.value),
                                searchParticipantsDebounce(e.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    {customList(participants)}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withRequestService()(Participants);
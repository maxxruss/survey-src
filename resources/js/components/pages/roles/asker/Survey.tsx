import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PageLayout from "../../../ui/PageLayout";
import withRequestService from "../../../hoc/with-request-service";
import { makeStyles } from "@mui/styles";
import { Tab, Tabs, Box } from '@mui/material';
import Content from './Content'

type Props = {
    requestService: {
        request: (method: object) => {
            result: string;
            data: { id: string, title: string; questions: QuestionProps };
        };
    };
};

type Survey = {
    [v: string]: { title: String; text: String };
};

type QuestionProps = {
    id: string;
    text: string;
    answers: { id?: number | string; text: string }[];
}[];

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const useStyles = makeStyles({
    itemCenter: {
        alignSelf: "center",
    },
});

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Survey = ({ requestService }: Props) => {
    const [value, setValue] = React.useState(0);
    const { search }: { search: string } = useLocation();
    const query = new URLSearchParams(search);
    const routeId = query.get("id")
    const [id, setId] = React.useState(routeId);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <PageLayout title={id == "new" ? "Новый опрос" : `Опрос # ${id}`}>
            <>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Содержание" {...a11yProps(0)} />
                    <Tab label="Участники" {...a11yProps(1)} />
                    <Tab label="Управление" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Content setId={setId} id={id} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </>
        </PageLayout>
    );
};

export default withRequestService()(Survey);

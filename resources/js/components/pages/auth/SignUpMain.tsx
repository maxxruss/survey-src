import React from "react";
import SignUpUser from "./SignUpUser";
import SignUpCompany from "./SignUpCompany";
import { Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dictionary from "../../../dictionary";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const SignUpMain = () => {
    const [value, setValue] = React.useState(0);
    const dict = Dictionary();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                >
                    <Tab label={dict.auth.main.user} {...a11yProps(0)} />
                    <Tab label={dict.auth.main.company} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <SignUpUser />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignUpCompany />
            </TabPanel>
        </Box>
    );
};

export default SignUpMain;

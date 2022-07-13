import React from "react";
import Menu from "../ui/Menu";
import { connect } from "react-redux";
import { toggleDrawer } from "../../redux/actions";
import Paper from "@mui/material/Paper";

type Props = {
    drawerStatus: boolean;
    toggleDrawer: () => {};
};

type StateProps = {
    drawerStatus: boolean;
};

const Drawer = ({ drawerStatus, toggleDrawer }: Props) => {
    const onToggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }

        toggleDrawer();
    };

    return (
        <Paper
            className="menu-wrap"
            style={{
                transform: drawerStatus ? "translateX(0)" : "translateX(-100%)",
            }}
            onClick={onToggleDrawer}
        >
            <Menu />
        </Paper>
    );
};

const mapStateToProps = ({ drawerStatus }: StateProps) => {
    return { drawerStatus };
};

const mapDispathToProps = { toggleDrawer };

export default connect(mapStateToProps, mapDispathToProps)(Drawer);

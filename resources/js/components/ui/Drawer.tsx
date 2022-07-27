import React from "react";
import Menu from "../ui/Menu";
import { connect } from "react-redux";
import { toggleDrawer } from "../../redux/actions";
import { Paper, ClickAwayListener } from "@mui/material";

type Props = {
    drawerStatus: boolean;
    toggleDrawer: (v: boolean) => {};
};

type StateProps = {
    drawerStatus: boolean;
};

const Drawer = ({ drawerStatus, toggleDrawer }: Props) => {
    const onCloseDrawer = () => {
        toggleDrawer(false);
    };

    return (
        <ClickAwayListener onClickAway={onCloseDrawer}>
            <Paper
                className="menu-wrap"
                style={{
                    transform: drawerStatus
                        ? "translateX(0)"
                        : "translateX(-100%)",
                }}
                onClick={onCloseDrawer}
            >
                <Menu />
            </Paper>
        </ClickAwayListener>
    );
};

const mapStateToProps = ({ drawerStatus }: StateProps) => {
    return { drawerStatus };
};

const mapDispathToProps = { toggleDrawer };

export default connect(mapStateToProps, mapDispathToProps)(Drawer);

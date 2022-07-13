import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Menu from "../ui/Menu";
import { connect } from "react-redux";
import { toggleDrawer } from "../../redux/actions";

type Props = {
    drawerStatus: boolean;
    toggleDrawer: () => {};
};

type StateProps = {
    drawerStatus: boolean;
};

const MenuDrawer = ({ drawerStatus, toggleDrawer }: Props) => {
    const OnToggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
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
        <div>
            <>
                <Drawer
                    anchor={"left"}
                    open={drawerStatus}
                    onClose={OnToggleDrawer}
                >
                    <Menu />
                </Drawer>
            </>
        </div>
    );
};

const mapStateToProps = ({ drawerStatus }: StateProps) => {
    return { drawerStatus };
};

const mapDispathToProps = { toggleDrawer };

export default connect(mapStateToProps, mapDispathToProps)(MenuDrawer);

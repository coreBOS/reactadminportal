import React from "react";
//import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { DashboardMenuItem, MenuItemLink, getResources } from 'react-admin';
//import DefaultIcon from '@material-ui/icons/ViewList';
//import LabelIcon from '@material-ui/icons/Label';

const CustomMenu = ({ onMenuClick, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div>
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={
                        (resource.options.show && resource.options.label) ? resource.options.label : ''
                    }
                    leftIcon={
                        (resource.options.show && resource.options.label && resource.icon) ? <resource.icon /> : null
                    }
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            {isXSmall && logout}
        </div>
    );
};

export default CustomMenu;
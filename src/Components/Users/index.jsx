import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import UsersTable from "./UsersTable";
import Message from "../Message";
import {
    ERROR_FORMAT, ERROR_FORMAT_COLOR,
    FileStatus,
    NOT_USER_MESSAGE,
    NOT_USER_MESSAGE_COLOR
} from "../../service/constants";
import {AppContext} from "../../App";

const Users = () => {
    const {statusFile} = useContext(AppContext);
    return (
        <>
            {!statusFile && <Message message={NOT_USER_MESSAGE}
                                     bg_color={NOT_USER_MESSAGE_COLOR}/>}
            {statusFile === FileStatus.ERROR && <Message message={ERROR_FORMAT}
                                                         bg_color={ERROR_FORMAT_COLOR}/>}
            {statusFile === FileStatus.SUCCESS && <UsersTable/>}
        </>

    )
        ;
};

Users.propTypes = {
    // props: PropTypes.object,
};

export default Users;

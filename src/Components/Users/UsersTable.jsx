import React from 'react';
import UsersBody from "./UsersBody";
import UsersHead from "./UsersHead";

import s from "./Users.module.scss";

const UsersTable = () => {
    return (
        <table className={s.TransactionHistory}>
            <UsersHead/>
            <tbody>
            <UsersBody/>
            </tbody>
        </table>
    );
};

export default UsersTable;

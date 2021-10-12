import React from 'react';
import s from "./Users.module.scss";

const UsersHead = _ => {
    return (
        <thead>
        <tr>
            <th className={s.Th}>ID</th>
            <th className={s.Th}>Full Name</th>
            <th className={s.Th}>Phone</th>
            <th className={s.Th}>Email</th>
            <th className={s.Th}>Age</th>
            <th className={s.Th}>Experience</th>
            <th className={s.Th}>Yearly Income</th>
            <th className={s.Th}>Has children</th>
            <th className={s.Th}>License states</th>
            <th className={s.Th}>Expiration date</th>
            <th className={s.Th}>License number</th>
            <th className={s.Th}>Duplicate with</th>
        </tr>
        </thead>
    );
};

export default UsersHead;

import React, {useContext, useEffect, useState} from 'react';
import s from './Users.module.scss'
import {AppContext} from "../../App";
import validateUser, {
    hasRequiredKeys,
} from "../../service/validator";

const UsersBody = () => {
    const [validUser, setValidUser] = useState(null);
    const {setError, users} = useContext(AppContext);

    useEffect(() => validate(), [users]);

    const validate = () => {
        if (!users) return
        users.pop()
        if (hasRequiredKeys(users)) {
            setError();
            return;
        }
        setValidUser(users.map((el, i) => {
            return validateUser(el, i, users)
        }))
    }

    return (
        <>
            {validUser && (validUser.map((el) => (
                <tr className={s.Tr} key={el.id}>
                    <td className={s.Td}>{el.id}</td>
                    <td className={s.Td}>{el.full_name}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (!el.phone[1]) ? '#de446d' : 'inherit'}}>{el.phone[0]}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (!el.email[1]) ? '#de446d' : 'inherit'}}>{el.email}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (!el.age[1]) ? '#de446d' : 'inherit'}}>{el.age[0]}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (!el.experience[1]) ? '#de446d' : 'inherit'}}>{el.experience[0]}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (!el.yearly_income[1]) ? '#de446d' : 'inherit'}}>{el.yearly_income[0]}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (!el.has_children[1]) ? '#de446d' : 'inherit'}}>{el.has_children[0] ? 'TRUE' : 'FALSE'}</td>
                    <td className={s.Td}>{el.license_states}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (!el.expiration_date[1]) ? '#de446d' : 'inherit'}}>{el.expiration_date[0]}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (!el.license_number[1]) ? '#de446d' : 'inherit'}}>{el.license_number[0]}</td>
                    <td className={s.Td}
                        style={{backgroundColor: (el.duplicate) ? '#de446d' : 'inherit'}}>{el.duplicate}</td>
                </tr>

            )))
            }
        </>
    );
};

export default UsersBody;

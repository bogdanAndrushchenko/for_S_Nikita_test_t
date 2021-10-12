import moment from "moment";
import lodash from "lodash";

export default function validateUser(obj, i, array) {

    const {
        id,
        full_name,
        phone,
        email,
        age,
        experience,
        expiration_date,
        has_children,
        license_number,
        yearly_income,
        license_states
    } = obj

    const validAge = validateAge(age);
    const validPhone = validatePhone(phone);
    const validEmail = validateEmail(email);
    return {
        id,
        full_name: trimValue(full_name),
        phone: validPhone,
        email: validEmail,
        age: validAge,
        experience: validateExperience.call(this, experience, validAge[0]),
        yearly_income: validateIncome(yearly_income),
        has_children: hasChildren(has_children),
        license_states: validateStates(license_states),
        expiration_date: validateDateExp(expiration_date),
        license_number: validateLicense(license_number),
        duplicate: validateUniq(array, 'email', validEmail[0])
    }
}

/**
 1.Дані можуть мати пробіл перед або після тексту, тому він має бути
 ігнорований.
 */

function trimValue(value) {
    if (typeof value !== "string") return
    return value.trim()
}

/**
 Todo 2.Email та Phone повинні бути унікальними в межах файлу. AlexCho@cho.com
 це те ж саме,
 що і alexCHO@CHO.coM .
 У стовпці Duplicate with має бути наведений ID першого знайденого рядка,
 з яким дублюються email / phone поточного.
 */
function validateEmail(email) {

    const check_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (check_email.test(email)) { // && (typeof email === 'string')
        return [email.toLowerCase(), true]
    }
    return [email, false] //.toLowerCase()
}

export function validateUniq(arr, key, email) {

    let idList = false

    const lookup = arr.reduce((a, e) => {
        a[e[key]] = ++a[e[key]] || 0;
        return a;
    }, {});
    const duplesObj = arr.filter((e) => lookup[e[key]])

    if (duplesObj.length) {
        const duplesEmail = duplesObj.map(e => e.email)
        if (duplesEmail.includes(email)) {

            const groupByKey = lodash.groupBy(duplesObj, key)
            const arrId = groupByKey[email].map(el => el.id)
            idList = arrId.join(',')
        }

    }

    return idList

}

/**
 * 3.Age - має бути типу integer. Не менше, ніж 21 рік.
 */
function validateAge(age) {
    if (Number(age) < 21 || Number(age) === 0) {
        return [age, false]
    }
    return [Number(age), true]
}

/**
 * 4.Experience - більше або рівний 0 (не більше, ніж current Age - 21)
 */
function validateExperience(experience, age) {

    if (validNotNull(experience) && Number(experience) <= (age - 21)) return [Number(experience), true]
    else {
        return [experience, false]
    }
}

/**
 5.Yearly income - може бути типу integer або decimal, але завжди відображений
 з двома знаками після коми. Не більше 1 млн.
 */
function validateIncome(income) {
    const isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    if (isNumeric(income) && validNotNull(income) && Number(income) <= 1000000) {
        return [Number(income).toFixed(2), true]
    } else return [income, false]
}

/**
 * 6.Всі числові значення мають бути >= 0 (в залежності від поля - вік не може бути 0)
 */
function validNotNull(value) {
    return value >= 0
}

/**
 * 7.License states - можуть бути у вигляді скорочення, або мати повне ім’я (AL, Alabama).
 * Проте відображені лише у короткому форматі.
 * Значень може бути декілька, розділені вертикальною рискою | .
 */
function validateStates(str) {
    if (!str) return
    if (str.length > 2) {
        if (str.includes("|")) {
            return str
                .split("|")
                .map((el) => el.trim().substring(0, 2).toUpperCase())
                .join('|');
        }

        return str.substring(0, 2).toUpperCase();
    }
    return str.toUpperCase();
};

/**
 * todo 8.Expiration date - може прийматись у двох форматах (YYYY-MM-DD або
 * MM/DD/YYYY).
 * Все інше - помилка. Не може бути менше поточної дати.
 */

function validateDateExp(date) {
    const today = moment().format('L');

    const date_reg_mm = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/; // MM/DD/YYYY
    const date_reg_yy = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/; // YYYY-MM-DD
    if ((date_reg_mm.test(date)) || (date_reg_yy.test(date))) {
        return [date, true]
    }
    return [date, false]
}


/**
 * 9.Phone - має бути відображений у форматі +1хххххххххх (десять знаків після +1).
 * Проте імпортувати можна у форматах: +1хххххххххх, 1ххххххххх, хххххххххх
 */
function validatePhone(phone) {
    const formatPlus = /^\+([0-9]{11})$/;
    const format11 = /^([0-9]{11})$/;
    const format10 = /^([0-9]{10})$/;
    if (formatPlus.test(phone)) {
        return [phone, true];
    }
    if (format11.test(phone)) {
        return [`+${phone.toString()}`, true];
    }
    if (format10.test(phone)) {
        return [`+1${phone.toString()}`, true];
    }
    return [phone, false];
}

/**
 * 10. Has children - приймається у вигляді TRUE / FALSE значень. Пуста комірка
 приймається як FALSE. Все інше - помилка.
 */

function hasChildren(child) {
    if (typeof child === 'string') {
        if (child.toLowerCase() === 'true' || child.toLowerCase() === 'false') {
            return [JSON.parse(child.toLowerCase()), true]
        }
        return [child, false]
    }
    if (typeof child === 'boolean') return [child, true]
    else return [child, false]
}

/**
 * 11. License number - 6 знаків, що складаються з чисел або текстових символів.
 */

function validateLicense(license) {
    const formatLicense = /^[a-zA-Z0-9]{6,}$/;
    if (formatLicense.test(license)) {
        return [license, true]
    } else return [license, false]

}

/**
 12. Full Name  / Phone / Email - є обов'язковими полями. Якщо одного з них
 немає  - замість таблиці треба показати повідомлення, що файл не є корректним.
 Таке саме повідомлення показати, якщо формат файлу не є csv.
 Якщо назва заголовку має інший кейз - full Name, поле вважається валідним.
 */

export function hasRequiredKeys(arr) {
    if (!arr) return
    const validateArr = arr.map(el => {
        const requiredKeys = Object.keys(el).filter(
            (el) => el === "full_name" || el === "phone" || el === "email"
        );
        return requiredKeys.length >= 3
    })
    return validateArr.includes(false)
}

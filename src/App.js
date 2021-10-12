import React, {createContext, useState} from "react";
import Papa from "papaparse";
import lodash from "lodash";

import ImportFile from "./Components/ImportFile";
import Users from "./Components/Users";

import {FileStatus} from "./service/constants";
import s from './App.module.scss'

export const AppContext = createContext();

function App() {
    const [statusFile, setStatusFile] = useState(null);
    const [csv, setCsv] = useState(null);
    const [users, setUsers] = useState(null);

    const handleChange = event => {
        setCsv(event.target.files[0])
    };

    const updateData = (result, file) => {
        const data = result.data;

        setUsers(normalizeKeys(data))
        setStatusFile(FileStatus.SUCCESS)
        if (result.error) {
            setError()
            console.log(result.error, "error")
        }
    };

    const importCSV = (e) => {
        if (!csv) return
        Papa.parse(csv, {
            complete: updateData,
            dynamicTyping: true,
            download: true,
            header: true,
            comments: null
        });

    };
    const setError = () => {
        setStatusFile(FileStatus.ERROR)
    }

    return (
        <AppContext.Provider value={{users, statusFile, setError}}>
            <div className={s.app}>
                <ImportFile importCSV={importCSV} handleChange={handleChange}/>
                <Users/>
            </div>
        </AppContext.Provider>
    );
}

export default App;

function normalizeKeys(arr) {
    return arr.map((el, i) => {
        const normalizeKey = lodash.mapKeys(el, (_, key) => {
            return key.trim().replace(/ /g, "_").toLowerCase()
        })
        return {...normalizeKey, id: i + 1}
    })
};

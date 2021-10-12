import React from 'react';
import PropTypes from 'prop-types';
import s from './ImportFile.module.scss'

const ImportFile = ({importCSV, handleChange}) => {
    return (
        <form>
            <button type='button'
                    className={s.Button}
                // style={{backgroundColor:'rgba(157,180,8,0.9)'}}
                    onClick={importCSV}>
                Import users
            </button>
            <input
                type='file'
                placeholder={null}
                accept=".csv"
                required
                title="file only with .csv extension"
                className={s.Button}
                onChange={handleChange}

            />
        </form>
    )
};

ImportFile.propTypes = {
    handleChange:PropTypes.func.isRequired,
    importCSV:PropTypes.func.isRequired,
};

export default ImportFile;

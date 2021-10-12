import React from 'react';

const styles = {
    width: '70%',
    height: '130px',
    border: '2px solid #9de878',
    color:'white',
}
const Message = ({message,bg_color}) => {
    return (
        <div style={{...styles, backgroundColor: bg_color,}}>
            <h2>{message}</h2>
        </div>
    );
};

export default Message;
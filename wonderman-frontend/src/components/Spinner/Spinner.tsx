import React from 'react';

const spinner = {
    marginBottom: "auto",
    marginTop: "auto"
}

const Spinner = (props: { show: boolean, customStyle: boolean }) => {
    return (
        <div className={props.show ? "spinner-wrapper" : "spinner-wrapper hide"}
             style={props.customStyle ? spinner : {}}>
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
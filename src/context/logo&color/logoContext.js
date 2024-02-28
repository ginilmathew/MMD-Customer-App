import React, { useState } from "react";
import LogoContext from './index';


const LogoProvider = (props) => {

    const [mainLogo, setMainLogo] = useState(null);

    return (
        <LogoContext.Provider
            value={{
                ...props,
                mainLogo,
                setMainLogo
            }}
        >
            {props.children}
        </LogoContext.Provider>
    );
}

export default LogoProvider;
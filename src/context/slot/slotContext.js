import React, { useState } from "react";
import SlotContext from ".";


const SlotProvider = (props) => {

    const [useSlot, setUseSlot] = useState(null);

    return (
        <SlotContext.Provider
            value={{
                ...props,
                useSlot,
                setUseSlot
            }}
        >
            {props.children}
        </SlotContext.Provider>
    );
}

export default SlotProvider;


import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const s1 ={
        "name":"ramu",
        "class":"9a"

    }

    const [state,setState] = useState(s1);
    const updatestate =()=>{
        setTimeout(() => {
            setState({
                "name":"ramachandra",
                "class":"9a"
            })
        }, 1000);
    }
return(
    <NoteContext.Provider value ={{state , updatestate}}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;
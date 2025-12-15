//import React from "react";
import { useBoolean } from "ahooks";

function UseAhooksuseBoolean () {
    const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

    return (
        <div>
            <p>Effects: {JSON.stringify(state)}</p>
            <p>
                <button type="button" onClick={toggle}>
                    toggle
                </button>

                <button type="button" onClick={setFalse} style={{ margin: '0 32px' }}>
                    set false
                </button>

                <button type="button" onClick={setTrue}>
                    set true
                </button>
            </p>
        </div>
    );
};
export default UseAhooksuseBoolean;
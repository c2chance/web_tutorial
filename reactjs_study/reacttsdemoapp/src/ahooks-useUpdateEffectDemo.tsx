import React, {useEffect, useState} from "react";
import { useUpdateEffect } from "ahooks";

function UseAhooksuseUpdateEffect() {
    
    const [count, setCount] = useState(0);
    const [effectCount, setEffectCount] = useState(0);
    const [updateEffectCount, setUpdateEffectCount] = useState(0);

    useEffect(() => {
        setEffectCount((c) => c + 1);
    }, [count]);

    useUpdateEffect(() => {
        setUpdateEffectCount((c) => c + 1);
        return () => {
            console.log('Cleanup for count:', count);
        }
    }, [count]);

    return (
        <div>
            <p>effectCount: {effectCount}</p>
            <p>updateEffectCount: {updateEffectCount}</p>
            <p>
                <button onClick={() => setCount((c) => c + 1)}>
                    reRender
                </button>
            </p>
        </div>
    );
}
export default UseAhooksuseUpdateEffect;
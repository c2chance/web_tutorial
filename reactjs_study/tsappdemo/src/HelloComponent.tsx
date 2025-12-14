import React from 'react';
import { HelloProps } from './types';

const function HelloComponent(props: HelloProps) {
    return (
        <div>
            <h1>Hello, {props.name}!</h1>
            <p>Age: {props.age}</p>
            {props.gender}
        </div>
    );
}
export default HelloComponent;
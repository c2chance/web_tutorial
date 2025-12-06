import { useState } from "react";

function MyForm() {
    const [text, setText] = useState('');

    // 
    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        alert(`You typed: ${text}`);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange}
                value={text} />
            <input type="submit" value="Press me"/>
        </form>
    )
}
export default MyForm;
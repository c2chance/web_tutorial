import { useState } from "react";

function ElseForm() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        alert(`Hello ${firstName}.${lastName}`);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>FirstName </label>
            <input onChange={e => setFirstName(e.target.value)} value={firstName} /><br />
            <label>LastName</label>
            <input onChange={e => setLastName(e.target.value)} value={lastName} /><br />
            <lablel>Email </lablel>
            <input onChange={e => setEmail(e.target.value)} value={email} /><br />
            <input type="submit" value="press me again" />
        </form>
    );
}
export default ElseForm;
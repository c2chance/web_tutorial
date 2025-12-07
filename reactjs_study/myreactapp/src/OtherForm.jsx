import { useState } from "react";

function OtherForm() {

    const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        alert(`Hello ${user.firstName} ${user.lastName}`);
        event.prevtDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>First name </label>
            <input type="text" name="firstName" onChange={handleChange} value={user.firstName} /><br />
            <label>Last name </label>
            <input type="text" name="lastName" onChange={handleChange} value={user.lastName} /><br />
            <label>Email </label>
            <input type="email" name="email" onChange={handleChange} value={user.email} /><br />
            <input type="submit" value="Submit" />
        </form>
    );
};

export default OtherForm;
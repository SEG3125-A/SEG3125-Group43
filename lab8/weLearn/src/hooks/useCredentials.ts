/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const useCredentials = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return {name, email, password, setName, setEmail, setPassword};
}

export default useCredentials;
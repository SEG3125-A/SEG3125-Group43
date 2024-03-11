/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Components are pieces of UI which can be customized and 
// Reused accross different pages

// If you need to add a new component, add it to this folder 

import React from 'react'

type componentProps = {
    // Props are the parameters that the component takes in
    // They are defined here

    prop1: string, 
    prop2: number,
}

// This is a simple component that does nothing
// Component needs to be exported
export const Component: React.FC<componentProps> = ({prop1, prop2}) => {
    // This is the actual component
    return (
        <div>
            <h1>{prop1}</h1>
            <p>{prop2}</p>
        </div>
    )
}

// This is the component that is actually used
// It is exported as default
// It uses the const defined previously

// Ideally, this component would be used in a page
// And defined in another file
export default function actualComponent() {
    return (
        <>
            <Component prop1="Hello" prop2={5} />
        </>
    )
}

// Do not forget to export the component
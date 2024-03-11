/* eslint-disable @typescript-eslint/no-unused-vars */
// This is a hook
// It is a function that returns a value
// It is used to share stateful logic between components

import React, {useEffect, useContext} from 'react'

export const useHooks = () => {
    const [value, setValue] = React.useState(0)

    // useEffect is a hook that runs when the component is mounted
    useEffect(() => {
        setValue(5)
    }, [])

    return {
        value
    }
}
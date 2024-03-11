/* eslint-disable @typescript-eslint/no-unused-vars */
// This is a context file
// It contains a context that can be used to share state between components

import React, {createContext} from 'react'

// This is the context
interface contextProps {
    user: string | null,
}

export const context = createContext<contextProps>({
    user: null,
})
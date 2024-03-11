/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useHooks } from '../hooks/useHooks'
import { Component } from '../components/component.tsx'

// Imports of 'const' need to have curly braces

// This is a page function 
export default function main() {
    return (
        <div>
            <Component prop1="Hello" prop2={5} />
        </div>
    )
}
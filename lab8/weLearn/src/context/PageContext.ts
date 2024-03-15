/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createContext } from 'react';

const PageContext = createContext({
    page: 0,
    setPage: (page: number) => {}
});

export default PageContext;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react';
import PageContext from '../context/PageContext'; 

const usePage = () => {
    const { page, setPage } = useContext(PageContext);

    return { page, setPage };
};

export default usePage;
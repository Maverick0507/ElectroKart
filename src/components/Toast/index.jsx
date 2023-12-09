import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const index = ({title}) => {
    return (
        <div>
            <button onClick={notify}>{title}</button>
            <ToastContainer />
        </div>
    )
}

export default index

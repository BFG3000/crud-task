import { Link } from "react-router-dom";
import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react'
import { appGlobalStateContext } from '../../../GlobalState';
import { Button } from "@material-ui/core";
import { DeleteForever, Visibility } from "@material-ui/icons";
import EmployeeList from "./EmployeeList";
import CreateEmployee from "./CreateEmployee";
import './styles.css'


const Employees = () => {
    const [createView, setCreateView] = useState<Boolean>(false);
    const [editData, setEditData] = useState<number>(null);

    return (
        <div>
            {
                createView ?<CreateEmployee setCreateView={setCreateView} editData={editData} /> : <EmployeeList setEditData={setEditData} setCreateView={setCreateView} createView={createView} /> 
            }
        </div>
    )
}

export default Employees
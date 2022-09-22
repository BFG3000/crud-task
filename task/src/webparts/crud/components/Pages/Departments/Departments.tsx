import { Link } from "react-router-dom";
import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react'
import { appGlobalStateContext } from '../../../GlobalState';
import { Button } from "@material-ui/core";
import { DeleteForever, Visibility } from "@material-ui/icons";
import DepartmentList from "./DepartmentList";
import CreateDepartment from "./CreateDepartment";
import './styles.css'


const Departments = () => {
    const [createView, setCreateView] = useState<Boolean>(false);
    const [editData, setEditData] = useState<number>(null);

    return (
        <div>
            {
                createView ? <CreateDepartment setCreateView={setCreateView} editData={editData} /> : <DepartmentList setEditData={setEditData} setCreateView={setCreateView} createView={createView} />
            }
        </div>
    )
}

export default Departments
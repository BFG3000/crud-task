import { Link } from "react-router-dom";
import MUIDataTable from 'mui-datatables';
import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';
import React, { useEffect } from 'react'
import { appGlobalStateContext } from '../../../GlobalState';
import { Button } from "@material-ui/core";
import { Add, DeleteForever, Edit, Visibility } from "@material-ui/icons";
import axios from "axios";
import Swal from "sweetalert2";
import EmployeeDetails from "./EmployeeDetails";


const EmployeeList = ({ setCreateView, setEditData, createView }) => {
    const { appRepository } = React.useContext(appGlobalStateContext);

    const [employees, setEmployees] = React.useState([]);
    const [selectedView, setSelectedView] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    console.log('data: ', employees);

    useEffect(() => {
        const getEmployees = async () => {
            const { data } = await axios.get(
                `${appRepository.siteurl}/_api/web/lists/getbytitle('employee')/items?$select=Id,employee_name,employee_address,department_id/Id,department_id/Department_name&$expand=department_id&$orderby=Created%20desc`,
                { headers: { Accept: "application/json; odata=verbose" } }
            );
            setEmployees(data.d.results);
        }
        getEmployees();
    }, [createView])
    const deleteEmployee = (id, name) => {
        Swal.fire({
            title: 'Delete Employee',
            html: `Are you sure you want to delete : <strong>${name}</strong>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                //Delete Logic
                try {
                    const headers: any = {
                        "X-HTTP-Method": "DELETE",
                        "IF-MATCH": "*"
                    }
                    let headerConfig: any
                    headerConfig = SPHttpClient.configurations.v1
                    let spHttpClientOptions: ISPHttpClientOptions = {
                        headers
                    }
                    // http://<sitecollection>/<site>/_api/web/lists(listid)/items(itemid)/recycle()
                    await appRepository._context.spHttpClient.post(`${appRepository.siteurl}/_api/web/lists/GetByTitle('employee')/items(${id})/recycle()`, headerConfig, spHttpClientOptions)
                        .then((data) => {
                            if (data.ok === false) {
                                console.log('critical error: ', data);
                                throw 'Critical error has occured';
                            }
                        })

                    setEmployees(employees.filter((employee) => employee.Id !== id));
                    Swal.fire(
                        'done !',
                        'Item has been Deleted',
                        'success'
                    )
                } catch (error) {
                    Swal.fire(
                        'error!',
                        'Something went wrong',
                        'error'
                    )
                }

            }
        })
    }
    const columns = [
        {
            name: "Id",
            label: "ID",
        },
        {
            name: "employee_name",
            label: "Employee Name",
        },
        {
            name: "department_id",
            label: "Department",
            options: {
                sort:false,
                filter:false,
                customBodyRender(department) {
                    return department.Department_name
                }
            }

        },
        {
            name: "",
            label: "",
            options: {
                sort:false,
                filter:false,
                customBodyRenderLite(index) {
                    return <Button
                        variant="contained"
                        color="default"
                        startIcon={<Visibility />}
                        onClick={() => {
                            setOpen(true);
                            setSelectedView(employees[index]);
                        }}
                    >
                        Details
                    </Button>
                }
            }
        },
        {
            name: "",
            label: "",
            options: {
                sort:false,
                filter:false,
                customBodyRenderLite(index) {
                    return <Button
                        variant="contained"
                        style={{ backgroundColor: 'green', color: '#FFF' }}
                        startIcon={<Edit />}
                        onClick={() => {
                            setEditData(employees[index]);
                            setCreateView(true);
                        }}//data[index].Id, data[index].name)}
                    >
                        Edit
                    </Button>
                }
            }
        },
        {
            name: "",
            label: "",
            options: {
                sort:false,
                filter:false,
                customBodyRenderLite(index) {
                    return <Button
                        variant="contained"
                        style={{ backgroundColor: 'red', color: '#FFF' }}
                        startIcon={<DeleteForever />}
                        onClick={() => deleteEmployee(employees[index].Id, employees[index].employee_name)}//data[index].Id, data[index].name)}
                    >
                        Delete
                    </Button>
                }
            }
        },

    ];

    const options: any = {
        download: false,
        print: false,
        filter: false,
        searchOpen: true,
        responsive: 'simple',
        resizableColumns: false,
        selectableRows: 'none',
        elevation: 2
    }
    return (
        <div>
            <EmployeeDetails data={selectedView} open={open} setOpen={setOpen} />
            <Button
                variant="contained"
                startIcon={<Add />}
                style={{ background: 'green', color: '#fff' }}
                onClick={() => setCreateView(true)}
            >
                Add New Employee
            </Button>
            <MUIDataTable
                title={''}
                data={employees}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default EmployeeList
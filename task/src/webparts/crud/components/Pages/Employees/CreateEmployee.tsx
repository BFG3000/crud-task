import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';
import { appGlobalStateContext } from '../../../GlobalState';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const CreateEmployee = ({ setCreateView, editData }) => {
  const { appRepository } = useContext(appGlobalStateContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [departments, setDepartments] = useState([])
  const [departmentId, setDepartmentId] = useState(null);

  useEffect(() => {
    const getDepartments = async () => {
      const { data } = await axios.get(
        `${appRepository.siteurl}/_api/web/lists/getbytitle('department')/items?$orderby=Created desc`,
        { headers: { Accept: "application/json; odata=verbose" } }
      );
      
      if (editData) {
        setName(editData.employee_name);
        setAddress(editData.employee_address)
        setDepartmentId(editData.department_id.Id)
      }
      setDepartments(data.d.results)
    }
    getDepartments();
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();

    const createNewEmployee = async () => {
      const bodyRequest = {
        employee_name: name,
        employee_address: address,
        department_idId: Number(departmentId)
      }
      const headers: any = {
        "X-HTTP-Method": "MERGE",
        "IF-MATCH": "*"
      }
      let headerConfig: any
      headerConfig = SPHttpClient.configurations.v1
      const spHttpClientOptions: ISPHttpClientOptions = {
        "body": JSON.stringify(bodyRequest)
      }
      try {
        if (editData) {
          //edit
          spHttpClientOptions.headers = headers;
          await appRepository._context.spHttpClient.post(`${appRepository.siteurl}/_api/web/lists/GetByTitle('employee')/items(${editData.Id})`, headerConfig, spHttpClientOptions);
          Swal.fire(
            'Success',
            'Employee has been edited successfully',
            'success'
          );
        } else {
          //insert data
          await appRepository._context.spHttpClient.post(`${appRepository.siteurl}/_api/web/lists/GetByTitle('employee')/items`, headerConfig, spHttpClientOptions)
          Swal.fire(
            'Success',
            'Employee has been created successfully',
            'success'
          );
        }
        setCreateView(false);
      } catch (error) {
        console.log(error)
        Swal.fire(
          'Error!',
          'Something went wrong',
          'error'
        )
      }
    }
    createNewEmployee();
  }
  return (
    <form autoComplete="off" onSubmit={handleSubmit} className='createForm'>
      <FormControl>
        <TextField id="Ename" label="Employee name" value={name} onChange={(e) => setName(e.target.value)} required />
      </FormControl>
      <FormControl>
        <TextField id="Eaddress" label="Employee address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </FormControl>
      <FormControl >
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
        >
          {
            departments.map((department) => (
              <MenuItem value={department.Id} key={department.Id}>{department.Department_name}</MenuItem>
            ))
          }


        </Select>
      </FormControl>

      <Button color='primary' variant="contained" type='submit' style={{ maxWidth: '110px' }}>Submit</Button>
    </form>
  )
}

export default CreateEmployee
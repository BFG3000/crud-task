import { Button, TextField, FormControl } from '@material-ui/core';
import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';
import { appGlobalStateContext } from '../../../GlobalState';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const CreateDepartment = ({ setCreateView, editData }) => {
  const { appRepository } = useContext(appGlobalStateContext);
  const [name, setName] = useState('')

  useEffect(() => {
    if (!editData) {
      return
    }
    setName(editData.Department_name)
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const createNewDepartment = async () => {
      const bodyRequest = {
        Department_name: name,
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
        if (editData && editData.Id) {
          //edit
          spHttpClientOptions.headers = headers;
          await appRepository._context.spHttpClient.post(`${appRepository.siteurl}/_api/web/lists/GetByTitle('department')/items(${editData.Id})`, headerConfig, spHttpClientOptions);
          Swal.fire(
            'Success',
            'Department has been edited successfully',
            'success'
          );
        } else {
          //insert data
          await appRepository._context.spHttpClient.post(`${appRepository.siteurl}/_api/web/lists/GetByTitle('department')/items`, headerConfig, spHttpClientOptions)
          Swal.fire(
            'Success',
            'Department has been created successfully',
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
    createNewDepartment();
  }
  return (
    <form autoComplete="off" onSubmit={handleSubmit} className='createForm'>
      <FormControl>
        <TextField id="standard-basic" label="Department name" value={name} onChange={(e) => setName(e.target.value)} required />
      </FormControl>

      <Button color='primary' variant="contained" type='submit' style={{ maxWidth: '110px' }}>Submit</Button>
    </form>
  )
}

export default CreateDepartment
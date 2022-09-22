import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';

export default function EmployeeDetails({ open, setOpen, data }) {
    console.log('date :', data);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{data.employee_name}</DialogTitle>
                <DialogContent>
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={5}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Employee name</TableCell>
                                    <TableCell>{data.employee_name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Employee department</TableCell>
                                    <TableCell>{data.department_id && data.department_id.Department_name}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";


const ActivityListStud = (props) => (
    <TableContainer component={Paper}>
        <Table style={{minWidth: "650px"}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="center">Start date</TableCell>
                    <TableCell align="center">End date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/*{typeof props.activity !== 'undefined' && props.activities.map(activity => (*/}
                <TableRow key={props.activity.id}>
                    <TableCell component="th" scope="row">
                        {props.activity.name}
                    </TableCell>
                    <TableCell align="center">{new Date(props.activity.start_date).toLocaleString()}</TableCell>
                    <TableCell align="center">{new Date(props.activity.end_date).toLocaleString()}</TableCell>
                </TableRow>
                {/*))}*/}
            </TableBody>

        </Table>
    </TableContainer>
);

export default ActivityListStud;

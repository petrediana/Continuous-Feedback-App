import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";


const ActivityList = (props) => (
    <TableContainer component={Paper}>
        <Table style={{minWidth: "650px"}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Start date</TableCell>
                    <TableCell align="center">End date</TableCell>
                    <TableCell align="center">Smiley</TableCell>
                    <TableCell align="center">Frowny</TableCell>
                    <TableCell align="center">Surprised</TableCell>
                    <TableCell align="center">Confused</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {typeof props.activities !== 'undefined' && props.activities.length > 0 && props.activities.map(activity => (
                    <TableRow key={activity.id}>
                        <TableCell component="th" scope="row">
                            {activity.name}
                        </TableCell>
                        <TableCell> {activity.id} </TableCell>
                        <TableCell align="center">{new Date(activity.start_date).toLocaleString()}</TableCell>
                        <TableCell align="center">{new Date(activity.end_date).toLocaleString()}</TableCell>
                        <TableCell align="center">{activity.count_emoji1}</TableCell>
                        <TableCell align="center">{activity.count_emoji2}</TableCell>
                        <TableCell align="center">{activity.count_emoji3}</TableCell>
                        <TableCell align="center">{activity.count_emoji4}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default ActivityList;

import React from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";


const FeedbackList = (props) => (
    <TableContainer component={Paper}>
        <Table style={{minWidth: "650px"}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Emoji</TableCell>
                    <TableCell align="center">Time stamp</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {typeof props.specificFeedbacksActivity !== 'undefined' && props.specificFeedbacksActivity.length > 0 && props.specificFeedbacksActivity.map(feedback => (
                    <TableRow key={feedback.id}>
                        <TableCell align="center">{feedback.emoji}</TableCell>
                        <TableCell align="center">{feedback.time_stamp}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default FeedbackList;

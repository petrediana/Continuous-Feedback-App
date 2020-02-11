import React from 'react';
import PropTypes from 'prop-types';
import '../Style/style.css';
import '../Style/formAddActivity.css';

const AddActivityForm = (props) => (
    <form className={props.showForm ? "shown" : "hidden"} onSubmit={props.handleSubmit}>
        <label><br/>
            Description:<br/>
            <input type="text" className="nameInput" name="name" defaultValue="" onChange={props.handleChange}/>
            <br/>
        </label>
        <label><br/>
            Start date:<br/>
            <input type="date" className="startDateInput" name="start_date" defaultValue=""
                   onChange={props.handleChange}/>
            <br/>
        </label>
        <label><br/>
            End date:<br/>
            <input type="date" className="endDateInput" name="end_date" defaultValue="" onChange={props.handleChange}/>
            <br/>
        </label>
        <label><br/>
            <input type="submit" className="btnSubmit" value="Add"/>
        </label>
    </form>
);

AddActivityForm.propTypes = {
    showForm: PropTypes.any,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default AddActivityForm;

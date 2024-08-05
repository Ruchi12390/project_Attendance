import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setPersonalDetails } from '../redux/actionCreators';
import AttendanceForm from '../components/forms/AttendanceForm';

const useStyles = makeStyles((theme) => ({
    line: {
        height: '10px',
        marginLeft: '0',
        marginRight: '0',
        marginTop: '35px',
        marginBottom: '35px',
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        opacity: '0.75',
        width: '100%'
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const Attendance = (props) => {
    const classes = useStyles();
    const [showAttendanceForm, setShowAttendanceForm] = useState(false);
    const [students, setStudents] = useState([
        { id: 1, name: "Meena Chouhan", enrollment: "0801CS21401", present: false },
        { id: 2, name: "Mohan Patel", enrollment: "0801CS21402", present: false },
        { id: 3, name: "Ram Sharma", enrollment: "0801CS21403", present: false },
        { id: 4, name: "Reena Sharma", enrollment: "0801CS21404", present: false },
        { id: 5, name: "Pallavi Patel", enrollment: "0801CS21405", present: false },
    ]);

    const handleShowClick = () => {
        setShowAttendanceForm(true);
    };

    const handleAttendanceChange = (id, isPresent) => {
        const updatedStudents = students.map(student =>
            student.id === id ? { ...student, present: isPresent } : student
        );
        setStudents(updatedStudents);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Department of Computer Engineering
            </Typography>
            <hr className={classes.line}></hr>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="course"
                        name="course"
                        label="Course"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="semester"
                        name="semester"
                        label="Semester"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="subjectCode"
                        name="subjectCode"
                        label="Subject Code"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="course"
                        name="course"
                        label="Date"
                        fullWidth
                    />
                </Grid>
                <Button 
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleShowClick}
                >
                    Show
                </Button>
            </Grid>
            {showAttendanceForm && (
                <AttendanceForm 
                    students={students} 
                    onAttendanceChange={handleAttendanceChange} 
                />
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        resume: state.resume.data
    };
};

const mapDispatchToProps = (dispatch) => ({
    setPersonalDetails: (details) => dispatch(setPersonalDetails(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const AttendanceForm = ({ students, onAttendanceChange }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography variant="h6" gutterBottom>
                Mark Attendance
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {students.map(student => (
                        <Grid container spacing={2} key={student.id}>
                            <Grid item xs={1}>
                                {student.id}
                            </Grid>
                            <Grid item xs={4}>
                                {student.enrollment}
                            </Grid>
                            <Grid item xs={4}>
                                {student.name}
                            </Grid>
                            <Grid item xs={3}>
                                <RadioGroup
                                    row
                                    value={student.present ? "present" : "absent"}
                                    onChange={(e) => onAttendanceChange(student.id, e.target.value === "present")}
                                >
                                    <FormControlLabel
                                        value="present"
                                        control={<Radio color="primary" />}
                                        label="Present"
                                    />
                                    <FormControlLabel
                                        value="absent"
                                        control={<Radio color="secondary" />}
                                        label="Absent"
                                    />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AttendanceForm;
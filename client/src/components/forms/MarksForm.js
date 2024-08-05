import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));

const MarksForm = ({ students, onMarksChange }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography variant="h6" gutterBottom>
                Enter Marks
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
                                <TextField
                                    type="number"
                                    label="Marks"
                                    value={student.marks || ''}
                                    onChange={(e) => onMarksChange(student.id, e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MarksForm;
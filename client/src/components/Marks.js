import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { setPersonalDetails } from '../redux/actionCreators';
import MarksForm from '../components/forms/MarksForm';  // Renamed component import

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
    select: {
        width: '100%',
    }
}));

const Marks = (props) => {
    const classes = useStyles();
    const [showMarksForm, setShowMarksForm] = useState(false);
    const [students, setStudents] = useState([
        { id: 1, name: "Meena Chouhan", enrollment: "0801CS21401", marks: '' },
        { id: 2, name: "Mohan Patel", enrollment: "0801CS21402", marks: '' },
        { id: 3, name: "Ram Sharma", enrollment: "0801CS21403", marks: '' },
        { id: 4, name: "Reena Sharma", enrollment: "0801CS21404", marks: '' },
        { id: 5, name: "Pallavi Patel", enrollment: "0801CS21405", marks: '' },
    ]);
    const [selectedType, setSelectedType] = useState('');

    const handleShowClick = () => {
        setShowMarksForm(true);
    };

    const handleMarksChange = (id, marks) => {
        const updatedStudents = students.map(student =>
            student.id === id ? { ...student, marks } : student
        );
        setStudents(updatedStudents);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
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
                    <Select
                        id="examType"
                        name="examType"
                        value={selectedType}
                        onChange={handleTypeChange}
                        className={classes.select}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Select Exam Type</MenuItem>
                        <MenuItem value="mst1">MST1</MenuItem>
                        <MenuItem value="mst2">MST2</MenuItem>
                        <MenuItem value="mst3">MST3</MenuItem>
                        <MenuItem value="end-sem">End-Sem</MenuItem>
                    </Select>
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
            {showMarksForm && (
                <MarksForm 
                    students={students} 
                    onMarksChange={handleMarksChange} 
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

export default connect(mapStateToProps, mapDispatchToProps)(Marks);
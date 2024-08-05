import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../common/FormSection';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export default function Skill({ resume }) {
    const classes = useStyles();
    const skill = {
        Enrollment: '',
        FirstName: '',
        LastName:'',

    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Delete Student
            </Typography>
            <FormSection input={skill} name="Skill" section="skills" resume={resume}  buttonText="Delete"/>

        </React.Fragment>
    );
}
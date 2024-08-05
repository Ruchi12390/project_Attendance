import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../common/FormSection';

export default function Student2({ resume }) {

    const achievement = {
        Name: '',
        Enrollment: '',
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Update Student Details
            </Typography>
            <FormSection input={achievement} name="Achievement" section="achivements" resume={resume} buttonText="Update"/>
        </React.Fragment>
    );
}
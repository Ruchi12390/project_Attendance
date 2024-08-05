import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormSection from '../common/FormSection';

export default function Achievement({ resume }) {

    const achievement = {
        CourseName: '',
        CourseCode: '',
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Achievement Details
            </Typography>
            <FormSection input={achievement} name="Achievement" section="achivements" resume={resume} buttonText="Update"/>
        </React.Fragment>
    );
}
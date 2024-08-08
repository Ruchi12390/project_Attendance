import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
 // Ensure correct import path

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        border: '0.25px solid blue',
        boxShadow: '2px 2px 5px rgba(0,0.75,0.75,0.75)',
        borderRadius: '20px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#fe8c26',
        '&:hover': {
            backgroundColor: '#fe8c26',
        },
    },
    alert: {
        padding: '0px',
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function Signup() {
    const classes = useStyles();
    const history = useHistory();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        role: 'student', // Default role
        open: false,
        error: ''
    });

    const [errorText, setErrorText] = useState({
        email: '',
        lastName: '',
        firstName: '',
        password: ''
    });

    const regex = {
        email: /^([a-zA-Z0-9_\.\+-]+)@([a-zA-Z\d\.-]+)\.([a-zA-Z]{2,6})$/,
        name: /^[A-Za-z]{2,}$/,
        password: /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/
    };

    const validateInput = (name, input) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!input.match(regex.name)) {
                    setErrorText({ ...errorText, [name]: 'Invalid Name; Length > 2' });
                } else {
                    setErrorText({ ...errorText, [name]: '' });
                }
                break;
            case 'email':
                if (!input.match(regex.email)) {
                    setErrorText({ ...errorText, email: 'Invalid Email' });
                } else {
                    setErrorText({ ...errorText, email: '' });
                }
                break;
            case 'password':
                if (!input.match(regex.password)) {
                    setErrorText({ ...errorText, password: 'Password must be at least 6 characters and include at least one number' });
                } else {
                    setErrorText({ ...errorText, password: '' });
                }
                break;
            default:
                break;
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        validateInput(name, value);
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!values.firstName || !values.lastName || !values.email || !values.password) {
            setErrorText({ ...errorText, global: 'All fields are required' });
            return;
        }
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
    
            const data = await response.json();
    
            if (response.ok) {
                history.push('/login');
            } else {
                setValues({ ...values, error: data.error });
            }
        } catch (error) {
            setValues({ ...values, error: 'An error occurred' });
        }
    };
    

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                {values.error && <Alert severity="error" className={classes.alert}>{values.error}</Alert>}
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={values.firstName}
                                onChange={handleInputChange}
                                error={!!errorText.firstName}
                                helperText={errorText.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={values.lastName}
                                onChange={handleInputChange}
                                error={!!errorText.lastName}
                                helperText={errorText.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={values.email}
                                onChange={handleInputChange}
                                error={!!errorText.email}
                                helperText={errorText.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleInputChange}
                                error={!!errorText.password}
                                helperText={errorText.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    value={values.role}
                                    onChange={handleInputChange}
                                    label="Role"
                                >
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="teacher">Teacher</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

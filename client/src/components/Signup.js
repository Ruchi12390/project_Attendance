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
import { config } from '../config/config.js'; // Ensure correct import path

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
                    setErrorText({ ...errorText, [name]: 'Invalid Email Id' });
                } else {
                    setErrorText({ ...errorText, [name]: '' });
                }
                break;
            case 'password':
                if (!input.match(regex.password)) {
                    setErrorText({ ...errorText, [name]: 'Password must be Alphanumeric, Min. Length 6' });
                } else {
                    setErrorText({ ...errorText, [name]: '' });
                }
                break;
            default:
                break;
        }
    };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        validateInput(name, event.target.value);
    };

    const handleRoleChange = event => {
        setValues({ ...values, role: event.target.value });
    };

    const goto = (res, user) => {
        if (res.status === 200) {
            history.push("/login", user);
        }
    };

    const create = async (user) => {
        try {
            let response = await fetch(`${config.REACT_APP_API_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                const errorDetails = await response.text(); // Capture error details
                throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails}`);
            }

            let res = await response.json();
            goto(response, res.user);
            return response;
        } catch (err) {
            console.error('Error during signup:', err);
            setValues({ ...values, error: err.message });
        }
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            email: values.email.trim(),
            password: values.password.trim(),
            role: values.role
        };

        create(user).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, error: '', open: true });
            }
        });
    };

    const isFormValid = () => {
        return !errorText.firstName && !errorText.lastName && !errorText.email && !errorText.password &&
               values.firstName.trim() && values.lastName.trim() && values.email.trim() && values.password.trim();
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                onChange={handleChange('firstName')}
                                value={values.firstName}
                                label="First Name"
                                error={!!errorText.firstName}
                                autoFocus
                            />
                            {errorText.firstName && <Alert className={classes.alert} severity="error">{errorText.firstName}</Alert>}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                onChange={handleChange('lastName')}
                                value={values.lastName}
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                error={!!errorText.lastName}
                            />
                            {errorText.lastName && <Alert className={classes.alert} severity="error">{errorText.lastName}</Alert>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                onChange={handleChange('email')}
                                value={values.email}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={!!errorText.email}
                            />
                            {errorText.email && <Alert className={classes.alert} severity="error">{errorText.email}</Alert>}
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
                                onChange={handleChange('password')}
                                value={values.password}
                                autoComplete="current-password"
                                error={!!errorText.password}
                            />
                            {errorText.password && <Alert className={classes.alert} severity="error">{errorText.password}</Alert>}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role-select"
                                    value={values.role}
                                    onChange={handleRoleChange}
                                    label="Role"
                                >
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="teacher">Teacher</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        disabled={!isFormValid()}
                        onClick={clickSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    {values.error && <Alert severity="error">{values.error}</Alert>}
                </form>
            </div>
        </Container>
    );
}
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import TextField from '@material-ui/core/TextField';
//import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
    useLogin, useNotify, useRedirect, Notification
} from 'react-admin';

export const useStyles = makeStyles((theme) => ({
    root: {
       
        margin: '8% auto',
        [theme.breakpoints.up('md')]: {
            padding: '30px 60px',
        },
        padding: '5px 20px',
        backgroundColor: theme.palette.background.paper,
        '& .MuiFormLabel-root': {
            opacity: '1 !important',
            color: '#BDBDBD',
        },
        '& .MuiTextField-root': {
            margin: '10px auto',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#DCDCDC',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#DCDCDC',
            },
            '&:hover fieldset': {
              borderColor: '#DCDCDC',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#DCDCDC',
            },
        },
        '& .MuiTypography-body1': {
            fontSize: '12px'
        },
        '& .MuiBox-root': {
            width: '100%',
        }
    },
    authCard: {
        display: 'block',
        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
        width: '80%',
        borderRadius: '5px',
        borderColor: '#ddd',
        margin: '12px auto',
        padding: '2px 10px',
    },
    authTitle: {
        fontSize: '20px'
    },
    authSubmitBtn: {
        boxShadow: 'none',
        padding: '7px 22px',
    },
}));

const Login = (props) => {
    //const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const redirect = useRedirect();
    const login = useLogin();
    const notify = useNotify();

    const onSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        login({ username, password }).then(() => {
            redirect('/');
            window.location.reload();
        }).catch(() => {
            notify('Invalid username or password', 'error');
            setIsLoading(false);
        });
    };


    return (
        <Box className={classes.root}>
            <Card className={classes.authCard} variant="outlined">
                            <CardContent>
                                <Typography component="div">
                                    <Box className={classes.authTitle} textAlign="center" mt={0.2} mb={1.2}>
                                        Login
                                    </Box>
                                </Typography>
                                
                                    <form onSubmit={onSubmit}>
                                        <Box>
                                            <TextField
                                            label="Username"
                                            //placeholder="Email"
                                            name={'username'}
                                            fullWidth
                                            id="usernameInput"
                                            variant="outlined"
                                            size="small"
                                            required
                                            onChange={e => setUsername(e.target.value)}
                                            />
                                        </Box>
                                        <Box>
                                            <TextField
                                            label="Password"
                                            //placeholder="Password"
                                            name={'password'}
                                            type={'password'}
                                            fullWidth
                                            id="passwordInput"
                                            variant="outlined"
                                            size="small"
                                            required
                                            onChange={e => setPassword(e.target.value)}
                                            />
                                        </Box>
                                        <Box my={2}>
                                            <Button fullWidth type={'submit'} disabled={isLoading} variant="contained" color="primary" size="large" className={classes.authSubmitBtn}>
                                                Login
                                            </Button>
                                        </Box>
                                    </form>
                               
                                    <Notification />
                            </CardContent>
                        </Card>
        </Box>
    );
};

export default connect(undefined, { userLogin })(Login);
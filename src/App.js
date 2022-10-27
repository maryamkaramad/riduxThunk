import './App.css';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authAsyncThunk, logout} from "./redux/slice/authSlice";
import CircularProgress from '@mui/material/CircularProgress';


function App() {
    const [form, setForm] = useState({username: '', password: ''})
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(authAsyncThunk(form))
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    if (auth.isLogin) {
        return <Button onClick={handleLogout}>logout</Button>
    }

    return (
        <Grid container justifyContent={'center'} mt={2}>
            <Grid container item xs={4} height={400}>
                <Grid container item xs={12} justifyContent={'center'}>
                    <Typography variant={'h3'}>
                        LOGIN FORM
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}
                          style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <TextField name={'username'} onChange={handleChange} value={form.username} label={'username'}
                                   sx={{my: 2, width: '300px'}}/>
                        <TextField type={'password'} name={'password'} onChange={handleChange} value={form.password}
                                   label={'password'}
                                   sx={{my: 2, width: '300px'}}/>
                        <Button disabled={auth.loading} type={'submit'} variant={'contained'} sx={{borderRadius: 2, width: '200px'}}>
                            {auth.loading
                                ?
                                <CircularProgress color="secondary"/>
                                :
                                <Typography>
                                    Login
                                </Typography>
                            }
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default App;
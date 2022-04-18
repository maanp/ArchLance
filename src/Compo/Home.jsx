import { Container, CssBaseline } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext';
import { ArchHomePage } from './ArchHomePage';
import { ClientHomePage } from './ClientHomePage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const Home = () => {
    const context = useContext(UserContext);
    const [list, setList] = useState()
    let { theme, profile, setProfile, url } = context;
    useEffect(() => {

        if (!localStorage.getItem('profile')) {
            console.log('not profile')
            localStorage.getItem('token') &&

                fetch(`${url}/api/user/account/`, {
                    headers:
                    {
                        'Authorization': `Token ${JSON.parse(localStorage.getItem('token'))?.token}`
                    }
                }).then(res => res.json()).then(data => { setProfile(data[0]); localStorage.setItem('profile', JSON.stringify(data[0])) })
        }

        localStorage.getItem('token') &&

            // console.log(loggedinUser);
            fetch(`${url}/api/get/home/`, {
                headers:
                {
                    'Authorization': `Token ${JSON.parse(localStorage.getItem('token'))?.token}`
                }
            }).then(res => res.json()).then(data => setList(data))
        // eslint-disable-next-line
    }, [])

    const darkTheme = createTheme({
        palette: {
            mode: theme ? 'light' : 'dark',
            primary: {
                main: '#1976d2',
            },
        },
    });

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Container>
                    {
                        profile?.user?.user_role === 'C' ? <ClientHomePage list={list?.slice(0, 5)} /> : <ArchHomePage list={list?.slice(0, 3)} />
                    }
                </Container>
            </ThemeProvider>
        </div>
    )
}

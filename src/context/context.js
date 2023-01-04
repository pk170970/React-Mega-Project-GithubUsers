import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
const userUrl = `https://api.github.com/users`;
// https://api.github.com/users/pk170970

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {

    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [search, setSearch] = useState('pk170970');
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState(0);
    const [error, setError] = useState({ show: false, msg: '' });

    const endpoints=[`${userUrl}/${search}`,`${userUrl}/${search}/repos?per_page=100`,
    `${userUrl}/${search}/followers`];


    const checkRequest = async () => {
        const response = await axios(`${rootUrl}/rate_limit`);
        const {data:{rate}}=response;
        setRequest(rate.remaining);
        if(rate.remaining===0){
            toggleError(true,'Sorry, you have exceeded your hourly limit.');
        }
    }

    useEffect(()=>{
        checkRequest()
    },[]);

    function toggleError(show=false,msg=''){
        setError({show,msg});
    }

    async function fetchUser() {
        setLoading(true);
        toggleError(false,"");
        await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            axios.spread(({data: user}, {data:gitRepos}, {data:gitFollowers}) => {
                setFollowers(gitFollowers);
                setGithubUser(user);
                setRepos(gitRepos);
            })
            ).catch(err=>{
                console.log(err);
                toggleError(true,'Please enter the correct username')
            });
            setLoading(false);
        // const response = await axios(`${userUrl}/${user}`).catch(err=>console.log(err));
        // if (response) {
        //   setGithubUser(response.data);
        // } else {
        //     toggleError(true, 'User does not exist,Please enter the valid username');
        // }
        // setLoading(false);
      }

    return (
        <GithubContext.Provider value={{
            setGithubUser,githubUser, repos, followers, rootUrl, setSearch, search,request,setRequest,error,setRepos,setFollowers,toggleError,fetchUser,loading
        }}>
            {children}
        </GithubContext.Provider>
    )
}


export { GithubContext, GithubProvider }
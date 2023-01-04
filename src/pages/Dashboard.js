import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
const Dashboard = () => {

  const { loading } = React.useContext(GithubContext);
  const { isLoading, isAuthenticated, user } = useAuth0();

  //method 1:   
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src="https://react-search-github-users.netlify.app/static/media/preloader.a6525050b19ec22d72cd.gif" alt="" className="loading-img" />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )



  // method 2:  here just remove privateroute and authwrapper  and simply use dashboard.
  // return (
  //   <>
  //     {isLoading ? <img src="https://react-search-github-users.netlify.app/static/media/preloader.a6525050b19ec22d72cd.gif" alt="" className="loading-img" />
  //       :
  //       <>
  //         {isAuthenticated ?
  //           <main>
  //             <Navbar />
  //             <Search />
  //             {loading ? <img src="https://react-search-github-users.netlify.app/static/media/preloader.a6525050b19ec22d72cd.gif" alt="" className="loading-img" /> :
  //               <>
  //                 <Info />
  //                 <User />
  //                 <Repos />
  //               </>
  //             }
  //           </main>

  //           : <Navigate to="/login" />
  //         }
  //       </>
  //     }
  //   </>
  // );
};

export default Dashboard;
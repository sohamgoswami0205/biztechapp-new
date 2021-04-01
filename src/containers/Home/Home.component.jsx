import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Form } from 'semantic-ui-react';
import { fetchUserData } from '../../redux/actions';
import Loader from 'react-loader-spinner';

import './Home.scss';
import UserCard from '../UserCard/UserCard.component';

const Home = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector(state => state.userData.data);
    const loading = useSelector(state => state.userData.loading);
    const error = useSelector(state => state.error);
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        dispatch(fetchUserData(searchInput));
    }

    // Handling redirection to view user's public repositories
    const handleRepoClick = () => {
        if (userData.public_repos > 0) history.push('/repos');
    }

    if (loading) {
        return (
            <div className='home-center'>
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        );
    }

    return (
        <div className="home">
            <div className='search'>
                <Form onSubmit={handleSearch}>
                    <Form.Group>
                        <Form.Input placeholder='GitHub User Name' onChange={(e) => setSearchInput(e.target.value)} />
                        <Form.Button content='Search' />
                    </Form.Group>
                </Form>
            </div>
            {error ? (
                <h1>
                    {error.response && error.response.data && error.response.data.message ?
                        error.response.data.message :
                        "User Not Found!"
                    }
                </h1>
            ) : (
                userData && Object.keys(userData) && Object.keys(userData).length > 0 &&
                (
                    <UserCard
                        userData={userData}
                        handleRepoClick={handleRepoClick}
                        githubRedirect={() => window.location.assign(userData.html_url)} />
                )
            )}
        </div >
    );
}

export default Home;

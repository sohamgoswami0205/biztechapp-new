import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRepos } from '../../redux/actions';
import { Form } from 'semantic-ui-react';
import Loader from 'react-loader-spinner';
import Pagination from 'react-js-pagination';

import './Repositories.scss';
import RepoList from './RepoList.component';

const Repositories = () => {

    const dispatch = useDispatch();
    const searchInput = useSelector(state => state.searchInput);
    const [repoSearch, setRepoSearch] = useState('');
    const loading = useSelector(state => state.repos.loading);
    const repos = useSelector(state => state.repos.data);
    const [paginationData, setPaginationData] = useState({
        perPage: 5,
        activePage: 1
    })
    const [currRepos, setCurrRepos] = useState([]);

    // Search for the User's Public Repositories on page load
    useEffect(() => {
        dispatch(fetchUserRepos(searchInput));
    }, [dispatch, searchInput]);

    // Set the retrieved repositories in state handler
    useEffect(() => {
        if (repos && repos.length > 0) {
            setCurrRepos(repos);
        }
    }, [repos]);

    // Handling search / filter functionality of the retrieved user repositories
    const handleSearch = () => {
        if (repoSearch && repoSearch.length > 0) {
            let newData = currRepos.filter(repo => repo.name.toLowerCase().includes(repoSearch.toLowerCase()));
            setCurrRepos(newData);
        }
        else {
            setCurrRepos(repos);
        }
    }

    // Handling Pagination
    const handlePageChange = (pageNumber) => {
        setPaginationData({
            ...paginationData,
            activePage: pageNumber
        })
    }

    // Handling wait time until API responds / timeout occurs
    if (loading) {
        return (
            <div className='repo-center'>
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
        <div className="repositories">
            <div className='search'>
                <Form onSubmit={handleSearch}>
                    <Form.Group>
                        <Form.Input placeholder='Find Repository' onChange={(e) => setRepoSearch(e.target.value)} />
                        <Form.Button content='Search' />
                    </Form.Group>
                </Form>
            </div>
            <div className='repo-table'>
                <RepoList currRepos={currRepos} paginationData={paginationData} />
                {currRepos && currRepos.length > paginationData.perPage &&
                    <Pagination
                        activePage={paginationData.activePage}
                        itemsCountPerPage={paginationData.perPage}
                        totalItemsCount={currRepos.length}
                        pageRangeDisplayed={3}
                        onChange={handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                }
            </div>
        </div>
    );
}

export default Repositories;
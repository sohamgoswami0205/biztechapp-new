import React from 'react';
import { formatDate } from '../../utils/common';

import './Repositories.scss';

const RepoList = ({ currRepos, paginationData }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Last Updated</th>
                </tr>
            </thead>
            <tbody>
                {currRepos && currRepos.length > 0 ?
                    (currRepos.slice((paginationData.activePage - 1) * paginationData.perPage, (paginationData.activePage) * paginationData.perPage).map(repo => {
                        return (
                            <tr key={repo.id}>
                                <td onClick={() => window.location.assign(repo.html_url)}>{repo.name}</td>
                                <td>{repo.description}</td>
                                <td>{formatDate(repo.created_at)}</td>
                                <td>{formatDate(repo.updated_at)}</td>
                            </tr>
                        );
                    }))
                    :
                    <tr>
                        <td colSpan='4' style={{ textAlign: 'center' }}>No Repositories Found!</td>
                    </tr>
                }
            </tbody>
        </table>
    );
}

export default RepoList;
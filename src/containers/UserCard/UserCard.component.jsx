import React from 'react';
import { formatDate } from '../../utils/common';
import { Card, Image, Icon } from 'semantic-ui-react';

import './UserCard.scss';

const UserCard = ({ userData, handleRepoClick, githubRedirect }) => {
    return (
        <div className="card">
            <Card>
                <Image src={userData.avatar_url} wrapped ui={false} />
                <Card.Content>
                    {userData.name &&
                        <Card.Header>
                            <button className='user-link'>
                                {userData.name}
                            </button>
                        </Card.Header>
                    }
                    <Card.Header>
                        <button className='user-link' onClick={githubRedirect}>
                            {userData.login}
                        </button>
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <button className='extras-link'>
                        <Icon name='user' />
                        {userData.followers} Followers
                            </button>
                </Card.Content>
                <Card.Content extra>
                    <button className='extras-link' onClick={handleRepoClick}>
                        <Icon name='folder open' />
                        {userData.public_repos} Public Repositories
                            </button>
                </Card.Content>
                <Card.Content extra>
                    <button className='extras-link'>
                        <Icon name='address card' />
                        {userData.following} Following
                            </button>
                </Card.Content>
                <Card.Content extra>
                    <button className='extras-link'>
                        Created At: {formatDate(userData.created_at)}
                    </button>
                </Card.Content>
                <Card.Content extra>
                    <button className='extras-link'>
                        Updated At: {formatDate(userData.updated_at)}
                    </button>
                </Card.Content>
            </Card>
        </div >
    );
}

export default UserCard;
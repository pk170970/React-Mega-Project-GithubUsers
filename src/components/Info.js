import React, { useContext } from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus, FiUser } from 'react-icons/fi';

const UserInfo = () => {
  const { githubUser } = useContext(GithubContext);
  // console.log(githubUser);
  const { public_repos, following, followers, public_gists } = githubUser;

  const item = [
    {
      id: 1,
      label: public_repos,
      color: 'pink',
      icon: <GoRepo className='icon' />,
      value: 'repos'
    },
    {
      id: 2,
      label: followers,
      color: 'green',
      icon: <FiUsers className='icon' />,
      value: 'followers'
    },
    {
      id: 3,
      label: following,
      color: 'purple',
      icon: <FiUser className='icon' />,
      value: 'following'
    },
    {
      id: 4,
      label: public_gists,
      color: 'yellow',
      icon: <GoGist className='icon' />,
      value: 'gists'
    }
  ]

  const Items = ({ id, label, value, color, icon }) => {
    return (
      <article className="item" key={id}>
        <span className={color} >{icon}</span>
        <div>
          <h3>{label}</h3>
          <p>{value}</p>
        </div>
      </article>
    );
  }

  return (
    <section className="section">
      <Wrapper className='section-center'>
        {item.map(data => {
          return (
            <Items {...data} key={data.id}/>
          )
        })}

      </Wrapper>
    </section>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default UserInfo;

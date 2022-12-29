import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {

  const { repos } = React.useContext(GithubContext);
  // console.log(repos);

  const data = repos.reduce((acc, curr) => {
    //acc: is a long object where we are searching only language

    const { language } = curr;
    if (!language) return acc;
    if (!acc[language]) { //acc[language] is object which we are creating below.
      acc[language] = { label: language, value: 1 }; // if property not present then create one
    } else {
      acc[language] = { ...acc[language], value: acc[language].value + 1 }; //if present count and increase
    }
    return acc;
  }, {});

  const languageData = Object.values(data) // returning array
    .sort((a, b) => b.value - a.value)  // sorting from high to low
    .slice(0, 5);  // slicing to get only 5 languages


// temp data
  // const chartData = [
  //   {
  //     label: "Html",
  //     value: "10"
  //   },
  //   {
  //     label: "CSS",
  //     value: "260"
  //   },
  //   {
  //     label: "Javascript",
  //     value: "50"
  //   }
  // ];


  return (
    <section className="section">
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={languageData} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;

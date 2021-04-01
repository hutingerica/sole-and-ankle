import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShoeCardWrapper>
          <ShoeCard key={shoe.slug} {...shoe} />
        </ShoeCardWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* gap: 32px; */
  margin: -16px;
`;

const ShoeCardWrapper = styled.div`
  flex: 1 0 300px;
  margin: 16px;
`

export default ShoeGrid;

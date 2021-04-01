import React from 'react';
import { Tag } from 'react-feather';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({ slug, name, imageSrc, price, salePrice, releaseDate, numOfColors }) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore

  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  let flagColor,content;
  let textColor,textDecor,saleToggleContent;

  if ( variant === "on-sale" ){
    saleToggleContent = `${formatPrice(salePrice)}`;
    textDecor = "line-through";
    textColor = `${COLORS.gray[700]}`;
    flagColor = `${COLORS.primary}` ;
    content = "Sale";
  } else if ( variant === "new-release" ){
    textDecor = "none";
    textColor = `${COLORS.gray[900]}`;
    flagColor = `${COLORS.secondary}`;
    content = "Just Released!";
  } else {
    textDecor = "none";
    textColor = `${COLORS.gray[900]}`;
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Flag style={{
            "--color": flagColor}}>
              {content}
          </Flag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
            '--textColor': textColor,
            '--textDecor':textDecor}}>
              {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>{saleToggleContent}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  position: absolute;
  top:0;
  right:0;
  margin: 12px -4px 0;
  padding: 8px;
  border-radius: 2px;
  background-color: var(--color);

  font-size: ${14/16}rem;
  font-weight:700;
  color:${COLORS.white};
`
const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width:100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--textDecor);
  color: var(--textColor);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;

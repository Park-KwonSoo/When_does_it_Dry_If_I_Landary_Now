import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Wrapper = styled.div `
    background : white;
    height : 4rem;

    display : flex;
    align-items : center;

    padding-left : 3rem;
`;

const LeftPosition = styled.div `
    flex : 3;
`;

const CenterPosition = styled.div `
    flex : 1;
`;

const RightPosition = styled.div `
    flex : 1;
`;

const Title = styled.div `
    font-size : 2.4rem;
    color : ${oc.yellow[7]};
`;

const GoHomeButton = styled.button `
    background : white;
    color : ${oc.yellow[7]};
    border : 2px solid;
    border-radius : 8px;
    cursor : pointer;

    padding : .3rem 2rem;

    font-family : Jua;
    font-size : 1.5rem;
    
    &:hover {
        background : ${oc.yellow[7]};
        color : white;
    }
`;

const Header = ({children, onClick}) => {
    return (
        <Wrapper>
            <LeftPosition>
                <Title>
                    {children}
                </Title>
            </LeftPosition>
            <CenterPosition/>
            <RightPosition>
                <GoHomeButton onClick = {onClick}>
                    홈으로
                </GoHomeButton>
            </RightPosition>
        </Wrapper>
    )
}

export default Header;
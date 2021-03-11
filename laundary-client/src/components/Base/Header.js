import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import home_yellow from '../../image/home_yellow.png';
import home_black from '../../image/home_black.png';

const Wrapper = styled.div `
    background : white;
    height : 4rem;

    display : flex;
    align-items : center;

    padding-left : 1rem;
    padding-right : 1rem;
`;

const LeftPosition = styled.div `
    flex : 4;

    display : flex;
`;

const CenterPosition = styled.div `
    flex : 1;
`;

const RightPosition = styled.div `
    flex : 4;
`;

const Title = styled.div `
    font-size : 2.4rem;
    color : ${oc.yellow[7]};

    margin-left :1.5rem;
`;

const GoHomeButton = styled.button `
    background : url(${home_yellow});
    background-size : cover;

    height : 2.6rem;
    width : 2.6rem;

    border : transparent;

    cursor : pointer;
    
    &:hover {
        background : url(${home_black});
        background-size : cover;
    }
`;

const Address = styled.div `
    font-size : 1.6rem;
    font-family : Jua;
`;

const Header = ({children, onClick, address}) => {
    return (
        <Wrapper>
            <LeftPosition>
                <GoHomeButton onClick = {onClick}/>
                <Title>
                    {children}
                </Title>
            </LeftPosition>
            <CenterPosition/>
            <RightPosition>
                <Address>
                    {"현재 위치 : " + address}
                </Address>
            </RightPosition>
        </Wrapper>
    )
}

export default Header;
import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Positioner = styled.div `
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);    
`;

const Wrapper = styled.div `
    display : flex;
    align-items : center;
    justify-content : center;

    margin-top : 3rem;
`;

const Title  = styled.div `
    color : ${oc.black[0]};
    font-size : 5rem;
    font-weight : 1px solid;
`;

const Button = styled.button `
    font-family : Jua;
    font-size : 2rem;
    text-decoration : none;
    
    background : white;
    color : ${oc.yellow[7]};
    border : 1px transparent;
    border-radius : 10px;

    padding : .5rem 4rem;
    cursor : pointer;

    &:hover {
        background : ${oc.yellow[7]};
        color : white;
    }
`;

const HomeComponent = ({children, onClick}) => {
    return (
        <Positioner>
            <Wrapper>
                <Title>
                    {children}
                </Title>
            </Wrapper>
            <Wrapper>
                <Button onClick = {onClick}>
                    시작
                </Button>
            </Wrapper>
        </Positioner>
    )
};

export default HomeComponent;
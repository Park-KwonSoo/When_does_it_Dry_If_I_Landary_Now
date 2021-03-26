import React from 'react';
import styled from 'styled-components';

const Content = styled.div `
    font-family : Jua;
    font-size : 2rem;

    background : transparent;
`

const Error = ({children}) => {
    return (
        <Content>
            {children}
        </Content>
    )
}

export default Error;
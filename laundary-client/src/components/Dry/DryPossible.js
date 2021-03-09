import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import backButton_white from '../../image/backButton_white.png';
import backButton_yellow from '../../image/backButton_yellow.png';


const Positioner = styled.div `
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);

    display : flex;
    flex-direction : column;

    width : 100%;
`;

const Wrapper = styled.div `
    display : flex;
    justify-content : center;
    align-items : center;
`;

const LeftPosition = styled.div `
    flex : 1;
`;

const CenterPosition = styled.div `
    flex : 10;

    display : flex;
    flex-direction : column;
`;

const RightPosition = styled.div `
    flex : 1;
`;

const InputWrapper = styled.div `
    display : flex;
    justify-content : center;
    align-items : center;
`;

const DateInput = styled.input.attrs({
    type : 'date'
}) `
    font-family : Jua;
    font-size : 1.2rem;

    padding : .5rem;
    margin-right : 1rem;

    width : 40%;
    
    border : transparent;
    border-radius : 3px;

    color : ${oc.yellow[7]};
`;

const Content = styled.div `
    font-size : 2.4rem;
`;

const BackButton = styled.button `
    background : url(${backButton_white});
    background-size : cover;

    height : 100px;
    width : 100px;

    border : transparent;
    margin-left : 3rem;

    &:hover {
        background : url(${backButton_yellow});
        background-size : cover;
    }
`;

const Button = styled.button `
    font-family : Jua;
    font-size : 2rem;

    background : white;
    color : ${oc.yellow[7]};

    border-radius : 10px;
    border : transparent;

    cursor : pointer;
    
    margin : 1rem auto;
    padding : .5rem 4rem;

    &:hover {
        background : ${oc.yellow[7]};
        color : white;
    }
`;

const DryPossible = ({children, back, onClick, onChange, ...rest}) => {
    return (
        <Positioner>
            <Wrapper>
                <LeftPosition>
                    <BackButton onClick = {back}/>
                </LeftPosition>
                <CenterPosition>
                    <InputWrapper>
                        <DateInput onChange = {onChange} {...rest}/>
                        <Content>까지 가능할까?</Content>
                    </InputWrapper>
                    <Button onClick = {onClick}>
                        {children}
                    </Button>
                </CenterPosition>
                <RightPosition/>
            </Wrapper>
        </Positioner>
    )
};

export default DryPossible;
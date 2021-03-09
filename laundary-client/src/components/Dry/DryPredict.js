import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import Clock from 'react-live-clock';
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
`;

const RightPosition = styled.div `
    flex : 1;
`;

const BackButton = styled.button `
    background : url(${backButton_white});
    background-size : cover;
    
    width : 100px;
    height : 100px;

    border : transparent;
    border-radius : 10px;

    margin-left : 3rem;

    &:hover {
        background : url(${backButton_yellow});
        background-size : cover;
    }
`;

const ContentWrapper = styled.div `
    display : flex;
    flex-direction : column;

    justify-content : center;
    padding : 0 0;
    margin : 0 4rem;
`;

const Title = styled.div `
    font-size : 3rem;
    margin : 1rem auto;
`;

const Time  = styled.div `
    font-size : 2.2rem;
    margin : 0rem auto;
`;

const ContentBox = styled.div `
    background : white;
    border-radius : 10px;
    border : transparent;

    margin : 1rem 0;

    display : flex;
    justify-content : center;
    align-items : center;
`;

const Content = styled.div `
    font-size : 2rem;

    background : white;
    color : ${oc.yellow[7]};

    margin : 2rem auto;

    border-radius : 10px;
    border : transparent;
`;

const Button = styled.button `
    background : white;
    color : ${oc.yellow[7]};

    font-family : Jua;
    font-size : 2rem;
    text-decoration : none;

    cursor : pointer;

    border-radius : 10px;
    border : transparent;

    padding : .5rem 4rem;
    margin : 1rem auto;

    &:hover {
        background : ${oc.yellow[7]};
        color : white;
    }
`;

const DryPredict = ({onClick, back, children, buttonName}) => {
    return (
        <Positioner>
            <Wrapper>
                <LeftPosition>
                    <BackButton onClick = {back}/>
                </LeftPosition>
                <CenterPosition>
                    <ContentWrapper>
                        <Title>
                            언제쯤 마를까?
                        </Title>
                        <Time>
                            {"현재 시간 "} 
                            <Clock format = {"YYYY년 MM월 DD일 HH : mm"} ticking = {true}/>
                        </Time>
                        <ContentBox>
                            <Content>
                                {children}
                            </Content>
                        </ContentBox>
                        <Button onClick = {onClick}>
                            {buttonName}
                        </Button>
                    </ContentWrapper>
                </CenterPosition>
                <RightPosition/>
            </Wrapper>
        </Positioner>
    )
}

export default DryPredict;
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
`;

const Wrapper = styled.div `
    display : flex;
    align-items : center;
`;

const LeftPosition = styled.div `
    flex : 1;
`;

const CenterPosition = styled.div `
    flex : 1;
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

    margin-right : 3rem;

    &:hover {
        background : url(${backButton_yellow});
        background-size : cover;
    }
`;

const ContentWrapper = styled.div `
    display : flex;
    flex-direction : column;
    justify-content : center;

    width : 550px;
`;

const Title = styled.div `
    font-size : 3rem;
    margin : 1rem auto;
`;

const Time  = styled.div `
    font-size : 2.2rem;
    margin : 0rem auto;
`;

const Content = styled.div `
    font-size : 2rem;
    margin : 1rem auto;

    background : white;
    color : ${oc.yellow[7]};

    border-radius : 10px;
    border : transparent;

    padding : .5rem 3rem;

    height : 40px;
    width : 400px;

    display : flex;
    justify-content : center;
`;

const Button = styled.button `
    background : white;
    color : ${oc.yellow[7]};

    font-family : Jua;
    font-size : 2rem;
    text-decoration : none;

    cursor : pointer;

    border-radius : 10px;
    border : 1px transparent;

    padding : .5rem;

    &:hover {
        background : ${oc.yellow[7]};
        color : white;
    }
`;

const DryComponent = ({onClick, back, children}) => {
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
                        <Content>
                            {children}
                        </Content>
                        <Button onClick = {onClick}>
                            과연?
                        </Button>
                    </ContentWrapper>
                </CenterPosition>
                <RightPosition>
                    <div/>
                </RightPosition>
            </Wrapper>
        </Positioner>
    )
}

export default DryComponent;
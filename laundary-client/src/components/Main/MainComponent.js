import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

import backButton_white from '../../image/backButton_white.png'
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

    height : 100%;
    width : 100%;
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

    border : transparent;
    border-radius : 10px;

    cursor : pointer;

    width : 100px;
    height : 100px;

    margin-right : 3rem;

    &:hover {
        background : url(${backButton_yellow});
        background-size : cover;
    }
`;

const SelectButtonWrapper = styled.div `
    display : flex;
`;

const SelectButton = styled.button `
    background : white;
    color : ${oc.yellow[7]};

    font-family : Jua;
    font-size : 2rem;

    border-radius : 15px;
    border : 1px transparent;

    margin : 0rem 1rem;

    height : 20rem;
    width : 15rem;

    &:hover {
        background : ${oc.yellow[7]};
        color : white;
    }
`;

const MainComponent = ({back, onClick1, onClick2}) => {
    return (
        <Positioner>
            <Wrapper>
                <LeftPosition>
                    <BackButton onClick = {back}/>
                </LeftPosition>
                <CenterPosition>
                    <SelectButtonWrapper>
                        <SelectButton onClick = {onClick1}>
                            언제 말라?
                        </SelectButton>
                        <SelectButton onClick = {onClick2}>
                            이 때까지 마를까?
                        </SelectButton>
                    </SelectButtonWrapper>
                </CenterPosition>
                <RightPosition>
                    <div/>
                </RightPosition>
            </Wrapper>
        </Positioner>
    )
};

export default MainComponent;
//Modal로 구현
import React from 'react';
import PropTypes from 'prop-types';
// import oc from 'open-color';
import styled from 'styled-components';


const ModalOverlay = styled.div `
    box-sizing : border-vox;
    display : ${(props) => (props.visible ? 'block' : 'none')};

    position : fixed;
    top : 0;
    right : 0;
    bottom : 0;
    left : 0;
    
    background : white;
    z-index : 999;
`;

const ModalWrapper = styled.div `
    box-sizing : border-box;
    display : ${(props) => (props.visible ? 'block' : 'none')};
    
    position : fixed;
    top : 0;
    right : 0;
    bottom : 0;
    left : 0;

    z-index : 1000;
    overflow : auto;
    outline : 0;
`;


const ModalInner = styled.div `
    box-sizing : border-box;
    position : relative;

    box-shadow : 0 0 6px 0 white;
    background : black;
    border-radius : 10px;

    width : 30%;
    max-width : 50%;
    top : 50%;
    transfrom : translateY(-50%);
    margin : 0 auto;
    padding : 1rem .5rem;
`;

const Error = ({className, visible, children}) => {
    return (
        <>
            <ModalOverlay visible = {visible}/>
            <ModalWrapper className = {className} tabIndex = '-1' visible = {visible}>
                <ModalInner tabIndex = '0' className = 'modal-inner'>
                    {children}
                </ModalInner>
            </ModalWrapper>
        </>
    )
}

Error.propTypes = {
    visible : PropTypes.bool,
}


export default Error;
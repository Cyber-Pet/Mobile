import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { StyledText } from './StyledText';

const PopUpView = styled.View`
    background-color: rgba(247,245,242,0.7);
    width: 80%;
    height: 15%;
    justify-content: center;
    text-align: center;
    padding-left: 20px;
`

const PopUp = props => {
  const [closeIn, setCloseIn] = useState(props.autoCloseIn)
  useEffect(() => {
    setCloseIn(props.autoCloseIn);
    const timeout = setTimeout(() => {
      props.closePopUp();
    }, closeIn);
    return () => {
      clearTimeout(timeout);
    }

  }, [props.visible])
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={props.visible}
    >
      <TouchableOpacity
        onPressOut={() => { props.closePopUp() }}
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: '20%'
        }}
      >
        <PopUpView  >
          {props.message.map((message, index) => {
            return (
              <StyledText key={index} >
                {`\u2022    ${message}`}
              </StyledText>
            )
          })}
        </PopUpView>
      </TouchableOpacity>

    </Modal>

  )
}

PopUp.propTypes = {
  visible: PropTypes.bool.isRequired,
  closePopUp: PropTypes.func.isRequired,
  autoCloseIn: PropTypes.number,
  message: PropTypes.arrayOf(String)

}

PopUp.defaultProps = {
  autoCloseIn: 3000,
  message: ['Ocorreu um erro inesperado']
}

export default PopUp
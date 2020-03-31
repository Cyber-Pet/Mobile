import React from 'react';
import { StyledText } from './StyledText';
import {
    Modal,
    TouchableOpacity,
  } from 'react-native';
import styled from 'styled-components/native'

export const PopUpView = styled.View`
    background-color: rgba(247,245,242,0.7);
    width: 80%;
    height: 15%;
    justify-content: center;
    text-align: center;
    padding-left: 20px;
`

export default PopUp = (props) => {

    setTimeout(() => {
      props.closePopUp()
    }, props.autoCloseIn);
    return (
        <Modal
          animationType='slide'
          transparent={true}
          visible={props.visible}
            >
            <TouchableOpacity
            onPressOut={() => { props.closePopUp () }}
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
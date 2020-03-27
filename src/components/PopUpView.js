import React, { useState, useEffect } from 'react';
import { StyledText } from './StyledText';
import {
    Modal,
    TouchableOpacity,
  } from 'react-native';
import styled from 'styled-components/native'

export const PopUpView = styled.View`
    background-color: #836144;
    width: 80%;
    height: 15%;
    justify-content: center;
    padding-left: 20px;
    border-width: 1px;
`

export default PopUp = (props) => {
    return (
        <Modal
          animationType='slide'
          transparent={true}
          visible={props.visible}
            >
            <TouchableOpacity
            onPressOut={() => { props.changeState}}
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
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
          visible={props.modalVisible}
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
              {apiMessage.map((message, index) => {
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
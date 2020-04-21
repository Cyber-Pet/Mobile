import styled from 'styled-components/native'

export const StyledSubmitButton = styled.TouchableOpacity`
    width: 100%;
    height: ${props => props.height || '20%'};
    background-color: #FFE3ED;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`
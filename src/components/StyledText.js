import styled from 'styled-components/native'

export const StyledText = styled.Text`
    color: ${props => props.color || '#fff'};
    font-weight: ${props => props.fontWeight || 'bold'};
    font-size: 15px;
`
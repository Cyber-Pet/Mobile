import styled from 'styled-components/native'

export const StyledText = styled.Text`
    color: ${props => props.color || '#000000'};
    font-weight: ${props => props.fontWeight || 'bold'};
    font-size: 15px;
`
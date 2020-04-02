import styled from 'styled-components/native'

export const StyledInput = styled.TextInput`
    width: 100%;
    background-color: transparent;
    border-bottom-width: 2px;
    border-bottom-color: #000;
    height: 20%;
    border-radius: 10px;
    color: #000000;
    padding-left: 10px;
    font-size: ${props => props.fontSize || '20px'};
`
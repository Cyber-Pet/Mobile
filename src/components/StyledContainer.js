import styled from 'styled-components/native'

export const StyledContainer = styled.View`
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%' };
    background-color: ${props => props.color || '#F8B185' };
    
`
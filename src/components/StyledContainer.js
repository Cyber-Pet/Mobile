import styled from 'styled-components/native'

export const StyledContainer = styled.View`
    width: ${props => props.width || '200px'};
    height: ${props => props.height || '200px' };
    background-color: ${props => props.color || '#F8B185' };
    margin-top: ${props => props.marginTop || '0%'}
`
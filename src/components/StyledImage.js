import styled from 'styled-components/native'

export const StyledImage = styled.Image`
    margin-top: ${props => props.marginTop || '10%'};
    width: ${props => props.width || '50%'};
    height: ${props => props.height || '20%'};
`
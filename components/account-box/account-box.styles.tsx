import Image from '../common/Image'
import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 10px;
`

export const StyledAvatar = styled(Image)`
  border-radius: 50%;
  cursor: pointer;
`

export const StyledAccountPopUp = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
`

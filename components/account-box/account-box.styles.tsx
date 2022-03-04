import Image from '../common/Image'
import styled from 'styled-components'

export const StyledWrapper = styled.div`
  position: relative;
`

export const StyledAvatar = styled(Image)`
  border-radius: 50%;
  cursor: pointer;
`

export const StyledAccountPopUp = styled.div`
  position: absolute;
  top: 100%;
  z-index: 100;
  right: 0;
`

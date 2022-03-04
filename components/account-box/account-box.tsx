import { getDBUser, useAuth } from '../../context/auth-user-context'
import { useEffect, useState } from 'react'
import {
  StyledWrapper,
  StyledAvatar,
  StyledAccountPopUp,
} from './account-box.styles'
import React from 'react'
import Menu from '../common/Menu'
import { ClickAwayListener } from '@mui/base'
import MenuItem from '../common/MenuItem'
import { useRouter } from 'next/router'

const AccountBox = () => {
  const { authUser, signOut }: any = useAuth()
  const [user, setUser] = useState() as any
  const [open, setOpen] = useState<boolean>()
  const router = useRouter()

  useEffect(() => {
    setUser(getDBUser(authUser) as any)
  }, [authUser.uid])

  const isShelter = () => user.type !== 'individual'

  const getSettingsURL = () =>
    isShelter() ? '/shelter/settings' : '/individual/settings'

  return (
    <StyledWrapper>
      <StyledAvatar
        onClick={() => setOpen(!open)}
        src={authUser.userPhoto}
        width="35px"
        height="35px"
      />
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <StyledAccountPopUp onClick={() => setOpen(false)}>
            <Menu>
              <MenuItem onClick={() => router.push(getSettingsURL())}>
                {isShelter() ? 'My Shelter' : 'My Profile'}
              </MenuItem>
              <MenuItem onClick={() => router.push('/my-pets')}>
                My Pets
              </MenuItem>
              <MenuItem onClick={signOut}>Log out</MenuItem>
            </Menu>
          </StyledAccountPopUp>
        </ClickAwayListener>
      )}
    </StyledWrapper>
  )
}

export default AccountBox

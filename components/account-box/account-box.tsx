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
  // @ts-ignore
  useEffect(async () => {
    const user = await getDBUser(authUser) as any
    setUser(user)
  }, [authUser.uid, authUser])

  const isShelter = () => user && (user.type !== 'individual')

  const getSettingsURL = () =>
    isShelter() ? '/shelter/settings' : '/'

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
              {isShelter() && <MenuItem onClick={() => router.push(getSettingsURL())}>
                My Shelter
              </MenuItem>}
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

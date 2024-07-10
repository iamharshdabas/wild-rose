import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  pickNotDeprecated,
  useActiveAuthProvider,
  useGetIdentity,
} from '@refinedev/core'
import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/mui'
import React from 'react'
import { HamburgerMenu } from './hamburgerMenu'

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const authProvider = useActiveAuthProvider()
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })

  const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true

  return (
    <AppBar position={prefferedSticky ? 'sticky' : 'relative'}>
      <Toolbar>
        <HamburgerMenu />
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            {user?.name && (
              <Typography variant="subtitle2" data-testid="header-user-name">
                {user?.name}
              </Typography>
            )}
            <Avatar src={user?.avatar} alt={user?.name} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

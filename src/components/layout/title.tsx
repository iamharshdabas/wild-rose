import MuiLink from '@mui/material/Link'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import {
  useLink,
  useRefineOptions,
  useRouterContext,
  useRouterType,
} from '@refinedev/core'
import type { RefineLayoutThemedTitleProps } from '@refinedev/mui'
import React from 'react'

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
  icon: iconFromProps,
  text: textFromProps,
}) => {
  const { title: { icon: defaultIcon, text: defaultText } = {} } =
    useRefineOptions()
  const icon =
    typeof iconFromProps === 'undefined' ? defaultIcon : iconFromProps
  const text =
    typeof textFromProps === 'undefined' ? defaultText : textFromProps
  const routerType = useRouterType()
  const Link = useLink()
  const { Link: LegacyLink } = useRouterContext()

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link

  return (
    <MuiLink
      to="/"
      component={ActiveLink}
      underline="none"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        ...wrapperStyles,
      }}
    >
      <SvgIcon height="24px" width="24px" color="primary">
        {icon}
      </SvgIcon>
      {!collapsed && (
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.primary"
          fontSize="inherit"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {text}
        </Typography>
      )}
    </MuiLink>
  )
}

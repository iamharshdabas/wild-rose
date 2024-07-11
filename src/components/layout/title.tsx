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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 21 14 3" />
          <path d="M20.5 21 10 3" />
          <path d="M15.5 21 12 15l-3.5 6" />
          <path d="M2 21h20" />
        </svg>
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
          Wild Rose
        </Typography>
      )}
    </MuiLink>
  )
}

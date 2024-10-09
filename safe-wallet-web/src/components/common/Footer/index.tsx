import type { ReactElement } from 'react'
import { SvgIcon } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useRouter } from 'next/router'
import css from './styles.module.css'
import { AppRoutes } from '@/config/routes'
import packageJson from '../../../../package.json'
import ExternalLink from '../ExternalLink'

const footerPages = [
  AppRoutes.welcome.index,
  AppRoutes.settings.index,
  AppRoutes.imprint,
  AppRoutes.privacy,
  AppRoutes.cookie,
  AppRoutes.terms,
  AppRoutes.licenses,
]

const Footer = (): ReactElement | null => {
  const router = useRouter()

  if (!footerPages.some((path) => router.pathname.startsWith(path))) {
    return null
  }

  return (
    <footer className={css.container}>
      <ul>
        {/* {IS_OFFICIAL_HOST || IS_DEV ? (
          <>
            <li>
              <Typography variant="caption">&copy;2022–{new Date().getFullYear()} Core Contributors GmbH</Typography>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.terms)}>Terms</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.privacy)}>Privacy</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.licenses)}>Licenses</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.imprint)}>Imprint</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.cookie)}>Cookie policy</FooterLink>
            </li>
            <li>
              <FooterLink href={getHref(AppRoutes.settings.index)}>Preferences</FooterLink>
            </li>
            <li>
              <ExternalLink href={HELP_CENTER_URL} noIcon sx={{ span: { textDecoration: 'underline' } }}>
                Help
              </ExternalLink>
            </li>
          </>
        ) : (
          <li>{'This is an unofficial distribution of Safe{Wallet}'}</li>
        )} */}
        <li style={{ textAlign: 'center' }}>
          {'Official distribution of Safe{Wallet} on'}
          <ExternalLink href="https://explorer.evm.iota.org/" style={{ color: '#0fc1b7', fontWeight: 400 }} noIcon>
            &nbsp;IOTA
          </ExternalLink>
          &nbsp;and
          <span style={{ whiteSpace: 'nowrap', wordBreak: 'keep-all' }}>
            <ExternalLink
              href="https://explorer.evm.shimmer.network/"
              style={{ color: '#00E0CA', fontWeight: 400 }}
              noIcon
            >
              &nbsp;Shimmer
            </ExternalLink>
            .
          </span>
        </li>

        <li>
          <ExternalLink href="https://github.com/servrox-solutions/shimmer-safe-token-list" noIcon>
            <SvgIcon component={GitHubIcon} inheritViewBox fontSize="inherit" sx={{ mr: 0.5 }} /> Requests & Support
          </ExternalLink>
        </li>

        <li style={{ textAlign: 'center' }}>
          Website operated and maintained by
          <ExternalLink href="https://servrox.solutions/" style={{ color: '#858585', fontWeight: 400 }} noIcon>
            &nbsp;servrox solutions&nbsp;
          </ExternalLink>
          and funded by
          <span style={{ whiteSpace: 'nowrap', wordBreak: 'keep-all' }}>
            <ExternalLink href="https://tangle-association.ch/" style={{ color: '#2a66ff', fontWeight: 400 }} noIcon>
              &nbsp;TEA
            </ExternalLink>
            .
          </span>
        </li>

        <li>
          <ExternalLink href={`${packageJson.homepage}/releases/tag/v${packageJson.version}`} noIcon>
            <SvgIcon component={GitHubIcon} inheritViewBox fontSize="inherit" sx={{ mr: 0.5 }} /> v{packageJson.version}
          </ExternalLink>
        </li>
        {/* <li>
          <AppstoreButton placement="footer" />
        </li> */}
      </ul>
    </footer>
  )
}

export default Footer

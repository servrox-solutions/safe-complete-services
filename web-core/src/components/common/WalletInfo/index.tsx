import { Box, Typography } from '@mui/material'
import { Suspense, useMemo } from 'react'
import type { ReactElement } from 'react'

import EthHashInfo from '@/components/common/EthHashInfo'
import WalletIcon from '@/components/common/WalletIcon'
import type { ConnectedWallet } from '@/hooks/wallets/useOnboard'
import { useAppSelector } from '@/store'
import { selectChainById } from '@/store/chainsSlice'
import chains from '@/config/chains'

import css from './styles.module.css'

export const UNKNOWN_CHAIN_NAME = 'Unknown'

const WalletInfo = ({ wallet }: { wallet: ConnectedWallet }): ReactElement => {
  const walletChain = useAppSelector((state) => selectChainById(state, wallet.chainId))

  const prefix = useMemo(() => {
    return walletChain?.shortName || Object.entries(chains).find(([, chainId]) => chainId === wallet.chainId)?.[0]
  }, [walletChain?.shortName, wallet.chainId])

  return (
    <Box className={css.container}>
      <Box className={css.imageContainer}>
        <Suspense>
          <WalletIcon provider={wallet.label} />
        </Suspense>
      </Box>
      <Box>
        <Typography variant="caption" component="div" className={css.walletDetails}>
          {wallet.label} @ {walletChain?.chainName || UNKNOWN_CHAIN_NAME}
        </Typography>
        <Typography variant="caption" fontWeight="bold" component="div">
          {wallet.ens ? (
            <div>{wallet.ens}</div>
          ) : (
            <EthHashInfo prefix={prefix || ''} address={wallet.address} showName={false} showAvatar avatarSize={12} />
          )}
        </Typography>
      </Box>
    </Box>
  )
}

export default WalletInfo

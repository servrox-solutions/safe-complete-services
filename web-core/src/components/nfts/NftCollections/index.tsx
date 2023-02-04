import { type SyntheticEvent, type ReactElement, useCallback, useEffect, useState } from 'react'
import { type SafeCollectibleResponse } from '@safe-global/safe-gateway-typescript-sdk'
import { Box, CircularProgress } from '@mui/material'
import ErrorMessage from '@/components/tx/ErrorMessage'
import PagePlaceholder from '@/components/common/PagePlaceholder'
import NftIcon from '@/public/images/common/nft.svg'
import NftBatchModal from '@/components/tx/modals/NftBatchModal'
import useCollectibles from '@/hooks/useCollectibles'
import InfiniteScroll from '@/components/common/InfiniteScroll'
import { NFT_EVENTS } from '@/services/analytics/events/nfts'
import { trackEvent } from '@/services/analytics'
import NftGrid from '../NftGrid'
import NftSendForm from '../NftSendForm'

const NftCollections = (): ReactElement => {
  // Track the current NFT page url
  const [pageUrl, setPageUrl] = useState<string>()
  // Load NFTs from the backend
  const [nftPage, error, loading] = useCollectibles(pageUrl)
  // Keep all loaded NFTs in one big array
  const [allNfts, setAllNfts] = useState<SafeCollectibleResponse[]>([])
  // Selected NFTs
  const [selectedNfts, setSelectedNfts] = useState<SafeCollectibleResponse[]>([])
  // Modal open state
  const [showSendModal, setShowSendModal] = useState<boolean>(false)

  // Add or remove NFT from the selected list on row click
  const onSelect = useCallback((token: SafeCollectibleResponse) => {
    setSelectedNfts((prev) => (prev.includes(token) ? prev.filter((t) => t !== token) : prev.concat(token)))
  }, [])

  const onSendSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()

      if (selectedNfts.length) {
        // Show the NFT transfer modal
        setShowSendModal(true)

        // Track how many NFTs are being sent
        trackEvent({ ...NFT_EVENTS.SEND, label: selectedNfts.length })
      }
    },
    [selectedNfts.length],
  )

  // Add new NFTs to the accumulated list
  useEffect(() => {
    if (nftPage) {
      setAllNfts((prev) => prev.concat(nftPage.results))
    }
  }, [nftPage])

  // Initial loading
  if (loading && !allNfts.length) {
    return (
      <Box py={4} textAlign="center">
        <CircularProgress size={40} />
      </Box>
    )
  }

  // No NFTs to display
  if (nftPage && !nftPage.results.length) {
    return <PagePlaceholder img={<NftIcon />} text="No NFTs available or none detected" />
  }

  return (
    <>
      {allNfts?.length > 0 && (
        <form onSubmit={onSendSubmit}>
          {/* Batch send form */}
          <NftSendForm
            selectedNfts={selectedNfts}
            onSelectAll={() => {
              setSelectedNfts((prev) => (prev.length ? [] : allNfts))
            }}
          />

          {/* NFTs table */}
          <NftGrid
            nfts={allNfts}
            selectedNfts={selectedNfts}
            onSelect={onSelect}
            isLoading={(loading || !!nftPage?.next) && !error}
          >
            {/* Infinite scroll at the bottom of the table */}
            {nftPage?.next ? <InfiniteScroll onLoadMore={() => setPageUrl(nftPage.next)} /> : null}
          </NftGrid>
        </form>
      )}

      {/* Loading error */}
      {error && <ErrorMessage error={error}>Failed to load NFTs</ErrorMessage>}

      {/* Send NFT modal */}
      {showSendModal && (
        <NftBatchModal
          onClose={() => setShowSendModal(false)}
          initialData={[
            {
              recipient: '',
              tokens: selectedNfts,
            },
          ]}
        />
      )}
    </>
  )
}

export default NftCollections

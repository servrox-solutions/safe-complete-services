import { networks } from '@safe-global/protocol-kit/dist/src/utils/eip-3770/config'
/**
 * A static shortName<->chainId dictionary
 * E.g.:
 *
 * {
 *   eth: '1',
 *   gor: '5',
 *   ...
 * }
 */
type Chains = Record<string, string>

let chains = networks.reduce<Chains>((result, { shortName, chainId }) => {
  result[shortName] = chainId.toString()
  return result
}, {})

chains = {
  ...chains,
  smr: '148',
  iota: '8822',
}

export default chains

import { CollapsibleSection } from './CollapsibleSection'
import { DefaultSection } from './DefaultSection'
import type { BranchingSectionProps } from './types'

const SafeAppsSection = ({ collapsible = false, ...props }: BranchingSectionProps) => {
  const Component = collapsible ? CollapsibleSection : DefaultSection

  return <Component {...props} />
}

export { SafeAppsSection }

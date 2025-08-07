import { Button } from '@/components/ui/button'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export const TotalBalance = () => {
  return (
    <Button
      key={hideAssetsStore.isHidden ? 'hidden' : 'visible'}
      onClick={() => {}}
      className={'text-[3rem] font-black'}
    >
      <span className={hideAssetsStore.isHidden ? 'text-muted-foreground' : ''}>
        {hideAssetsStore.formatHideBalance(formatCurrency(totalFiatValue, true))}
      </span>
    </Button>
  )
}

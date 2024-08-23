import { useCallback, useState } from 'react'

type ReturnType = {
    isOpen: boolean
    open: VoidFunction
    close: VoidFunction
}

export const useOpen = (): ReturnType => {
    const [isOpen, setIsOpen] = useState(false)
    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])
    return { isOpen, open, close }
}

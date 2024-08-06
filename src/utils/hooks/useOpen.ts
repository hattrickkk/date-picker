import { useCallback, useState } from 'react'

type ReturnType = {
    isOpen: boolean
    open: VoidFunction
    close: VoidFunction
}

const useOpen = (): ReturnType => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])
    return { isOpen, open, close }
}

export default useOpen

import { useEffect } from 'react'

export const useOutsideClick = (close: VoidFunction, open: boolean) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                !(e.target as HTMLElement).closest('#calendar') &&
                !(e.target as HTMLElement).closest('#input') &&
                !(e.target as HTMLElement).closest('#task-modal')
            )
                close()
        }

        document.body.addEventListener('click', handler)
        return () => {
            document.body.removeEventListener('click', handler)
        }
    }, [open])
}

import { RefObject, useEffect } from 'react'

export const useOutsideClick = (
    calendarRef: RefObject<HTMLDivElement>,
    inputRef: RefObject<HTMLInputElement>,
    close: VoidFunction,
    open: boolean
) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (calendarRef.current) {
                if (
                    !calendarRef.current.contains(e.target as HTMLElement) &&
                    !inputRef.current?.contains(e.target as HTMLElement) &&
                    !(e.target as HTMLElement).closest('#task-modal')
                )
                    close()
            }
        }

        document.body.addEventListener('click', handler)
        return () => {
            document.body.removeEventListener('click', handler)
        }
    }, [open, calendarRef, inputRef])
}

import { RefObject, useEffect } from 'react'

const useOutsideClick = (
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
                    !inputRef.current?.contains(e.target as HTMLElement)
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
export default useOutsideClick

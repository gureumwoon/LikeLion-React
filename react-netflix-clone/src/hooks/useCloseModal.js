import { useEffect } from 'react'

export const useCloseModal = (ref, setModalOpen) => {

    useEffect(() => {
        const handleClose = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setModalOpen(false);
            }
        }
        window.addEventListener('click', handleClose)
        return () => {
            window.removeEventListener('click', handleClose)
        }
    }, [ref, setModalOpen])
}

import { useState } from "react"

export default function useViewModal() {
    const [view, setView] = useState(false)

    const onCloseView = () => {
        setView(false)
    }

    const onOpenView = () => {
        setView(true)
    }

    return {
        onCloseView, onOpenView, view, setView
    }
}
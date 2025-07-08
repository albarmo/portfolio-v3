export const handleInputOnlyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers and essential keys
    if (
        !/^[0-9]$/.test(e.key) && // Block letters & symbols
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Tab"
    ) {
        e.preventDefault()
    }
}
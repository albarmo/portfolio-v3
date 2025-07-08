export const lockScroll = () => {
    if (typeof window !== "undefined") {
        document.body.style.overflow = "hidden";
    }
};

export const unlockScroll = () => {
    if (typeof window !== "undefined") {
        document.body.style.overflow = "";
    }
};
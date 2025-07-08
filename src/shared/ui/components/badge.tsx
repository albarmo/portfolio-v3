import React from 'react'

interface I_PropsBadge {
    text: string
    variant: 'pending' | 'success' | 'error'
    size?: T_TextAttributeSize
    rounded?: T_AttributeRounded
}

const _TextSize = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl"
}

const _RoundedSize = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
}

const _BadgeVariantStyle = {
    pending: "bg-gray-200 text-gray-600",
    success: "bg-green-200 text-green-600",
    error: "bg-red-200 text-red-600"
}

export default function Badge({ text, variant, size = "md", rounded = "lg" }: I_PropsBadge) {
    return (
        <section className={`${_BadgeVariantStyle[variant]} ${_TextSize[size]} ${_RoundedSize[rounded]} py-1.5 px-2.5`}>{text}</section>
    )
}

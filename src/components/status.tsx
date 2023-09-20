import React from "react"
import clsx from "clsx"

// Import clsx

export function Status({ type }: { type: string }) {
  const classNames = {
    cash: ["text-[#33d69f] bg-[#33d69f0f]", "bg-[#33d69f]"],
    online: ["text-[#ff8f00] bg-[#ff8f000f]", "bg-[#ff8f00]"],
    card: ["text-[#c065d4] bg-[#c065d40f]", "bg-[#c065d4]"],
  }

  const containerClasses = clsx(
    type === "cash" && classNames.cash[0],
    type === "online" && classNames.online[0],
    type === "card" && classNames.card[0],
    "flex justify-center space-x-2 rounded-lg items-center px-4 py-2"
  )

  const circleClasses = clsx(
    "h-4 w-4 rounded-full",
    type === "cash" && classNames.cash[1],
    type === "online" && classNames.online[1],
    type === "card" && classNames.card[1]
  )

  return (
    <div className={containerClasses}>
      <div className={` ${circleClasses}`} />
      <p>{type}</p>
    </div>
  )
}

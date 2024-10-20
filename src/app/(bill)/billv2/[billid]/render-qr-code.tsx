"use client"
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useRef,
    useState,
  } from "react"
import { QRCodeSVG, getQRAsCanvas, getQRAsSVGDataUri } from "@/lib/qr"
import { SimpleLinkProps } from "@/components/modals/link-qr-modal"
import { linkConstructor } from "@/lib/utils"

export function RenderQRCode ({ props }: { props: SimpleLinkProps }) {
    const [showLogo, setShowLogo] = useState(true)
    const [fgColor, setFgColor] = useState("#000000")
    const [openPopover, setOpenPopover] = useState(false)
    const anchorRef = useRef<HTMLAnchorElement>(null)
    const qrLogoUrl = "/logo.svg"
    const qrData = useMemo(
      () => ({
        value: linkConstructor({
          key: props.key,
          domain: props.domain,
        }),
        bgColor: "#ffffff",
        fgColor,
        size: 1024,
        level: "Q",
        ...(showLogo && {
          imageSettings: {
            src: qrLogoUrl,
            height: 256,
            width: 256,
            excavate: true,
          },
        }),
      }),
      [props, fgColor, showLogo, qrLogoUrl]
    )
    return (
    <div className="mx-auto mt-4 rounded-lg border-2 border-gray-200 bg-white p-4">
      <QRCodeSVG
        value={qrData.value}
        size={qrData.size / 8}
        bgColor={qrData.bgColor}
        fgColor={qrData.fgColor}
        level={qrData.level}
        includeMargin={false}
        // @ts-ignore
        imageSettings={
          showLogo && {
            ...qrData.imageSettings,
            height: qrData.imageSettings ? qrData.imageSettings.height / 8 : 0,
            width: qrData.imageSettings ? qrData.imageSettings.width / 8 : 0,
          }
        }
      />
    </div>
)}
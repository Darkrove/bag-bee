"use client"

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import { Clipboard, Download, QrCode } from "lucide-react"

import { QRCodeSVG, getQRAsCanvas, getQRAsSVGDataUri } from "@/lib/qr"
import { linkConstructor } from "@/lib/utils"
import useWindowSize from "@/hooks/useWindowSize"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Leaflet } from "@/components/ui/leaflet"

export interface SimpleLinkProps {
  domain?: string
  key: string
  url: string
}

export function LinkQRModalHelper({ props }: { props: SimpleLinkProps }) {
  const [showLogo, setShowLogo] = useState(true)
  const [fgColor, setFgColor] = useState("#000000")
  const [openPopover, setOpenPopover] = useState(false)
  const { isMobile, isDesktop } = useWindowSize()
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

  function download(url: string, extension: string) {
    if (!anchorRef.current) return
    anchorRef.current.href = url
    anchorRef.current.download = `${props.key}-qrcode.${extension}`
    anchorRef.current.click()
  }

  const renderQRCode = () => (
    <div className="mx-auto rounded-lg border-2 border-gray-200 bg-white p-4">
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
  )

  const renderButtons = () => (
    <div className="grid grid-cols-2 gap-2 px-4 sm:px-16">
      <Button
        onClick={() => navigator.clipboard.writeText(props.url)}
        className="text-sm"
      >
        <Clipboard className="mr-2 h-4 w-4" /> Copy
      </Button>
      <Button
        onClick={async () => {
          const canvas = await getQRAsCanvas(qrData, "image/png")

          if (canvas instanceof HTMLCanvasElement) {
            const canvasDataURL = canvas.toDataURL("image/png")
            download(canvasDataURL, "png")
          } else {
            download(canvas, "png")
          }
        }}
        className="text-sm "
      >
        <Download className="mr-2 h-4 w-4" /> Download
      </Button>
    </div>
  )

  return (
    <div>
      {isMobile && (
        <button
          onClick={() => setOpenPopover((prev) => !prev)}
          className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 focus:outline-none active:scale-95"
        >
          <span className="sr-only">Copy</span>
          <QrCode className="h-4 w-4 text-gray-700 transition-all group-hover:text-blue-800" />
        </button>
      )}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 p-4 sm:px-16">
            <h3 className="text-lg font-medium">Download QR Code</h3>
          </div>
          <div className="flex flex-col space-y-6 bg-background/50 py-6 text-left sm:rounded-b-2xl">
            {renderQRCode()}
            {renderButtons()}
          </div>
        </Leaflet>
      )}
      {isDesktop && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="group rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 focus:outline-none active:scale-95">
              <span className="sr-only">Copy</span>
              <QrCode className="h-4 w-4 text-gray-700 transition-all group-hover:text-blue-800" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Download QR Code</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-6 bg-background/50 py-6 text-left sm:rounded-b-2xl">
              {renderQRCode()}
              {renderButtons()}
            </div>
            <DialogFooter />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

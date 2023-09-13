"use client"

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react"
import { Clipboard, Download, Pencil, QrCode, Share, Trash } from "lucide-react"

import { QRCodeSVG, getQRAsCanvas, getQRAsSVGDataUri } from "@/lib/qr"
import { linkConstructor } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface SimpleLinkProps {
  domain?: string
  key: string
  url: string
}

export function LinkQRModalHelper({ props }: { props: SimpleLinkProps }) {
  const [showLogo, setShowLogo] = useState(true)
  const [fgColor, setFgColor] = useState("#000000")
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
      level: "Q", // QR Code error correction level: https://blog.qrstuff.com/general/qr-code-error-correction
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
  return (
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
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-6 bg-gray-50 py-6 text-left sm:rounded-b-2xl">
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
                  height: qrData.imageSettings
                    ? qrData.imageSettings.height / 8
                    : 0,
                  width: qrData.imageSettings
                    ? qrData.imageSettings.width / 8
                    : 0,
                }
              }
            />
          </div>
        </div>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

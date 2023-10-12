"use client"

import { useState } from "react"
import { setValue } from "@/store/features/invoice-slice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { CopyIcon, CounterClockwiseClockIcon } from "@radix-ui/react-icons"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import useSWR from "swr"
import * as z from "zod"

import { apiUrls } from "@/lib/api-urls"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
  id: string
}

const FormSchema = z.object({
  json: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof FormSchema>

const EditInvoice = ({ id }: Props) => {
  const {
    data: invoiceData = [],
    isLoading: isSalesLoading,
    error: error,
  } = useSWR(apiUrls.invoice.getById({ id }), fetcher)
  const invoiceValue = useAppSelector((state) => state.invoiceReducer.value)
  const dispatch = useAppDispatch()
  const [mounted, setMounted] = useState(false)
  if (!isSalesLoading && !mounted) {
    dispatch(setValue(invoiceData.data[0]))
    setMounted(true)
  }
  let defaultValues: Partial<FormValues> = {
    json: "{}",
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onChange",
  })
  const loadData = () => {
    defaultValues.json = JSON.stringify(invoiceValue, null, 2)
    console.log("1")
  }
  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(setValue(JSON.parse(data.json)))
    toast.success("You submitted", {
      description: data.json,
    })
  }
  const renderFooter = () => (
    <div className="flex items-center space-x-2">
      <Button type="submit">Submit</Button>
      <Button variant="secondary">
        <span className="sr-only">Show history</span>
        <CounterClockwiseClockIcon className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <div>
      {isSalesLoading ? (
        <div className="flex w-full flex-col items-center justify-center rounded-md bg-slate-950 p-4">
          <Loader2 className="h-10 w-10 animate-spin text-white" />{" "}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="space-y-6">
            <pre className="mt-2 w-full overflow-hidden rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(invoiceValue, null, 2)}
              </code>
            </pre>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  JSON.stringify(invoiceValue, null, 2)
                )
              }
              variant="secondary"
            >
              <span className="sr-only">Show history</span>
              <CopyIcon className="mr-1 h-4 w-4" /> Copy
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="json"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JSON</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="min-h-[400px] w-full flex-1 resize-none p-4 md:min-h-[700px] lg:min-h-[700px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>edit</span> json directly.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <Button type="submit">Submit</Button>
                <div
                  onClick={() => loadData()}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  <span className="sr-only">Show history</span>
                  <CounterClockwiseClockIcon className="mr-1 h-4 w-4" />
                  Load
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  )
}

export default EditInvoice

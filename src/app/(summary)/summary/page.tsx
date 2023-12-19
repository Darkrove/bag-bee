import { DatePickerProvider } from "@/components/context/datepicker-provider"
import { OverviewContextProvider } from "@/components/context/overview-provider"

import { Row } from "./date-picker-row"
import { Separator } from "@/components/ui/separator"
import Summary from "./summary-table"
import { CardsMetric } from "./charts"

export default async function DemoPage() {
  return (
    <div className="container mx-auto py-10">
      <DatePickerProvider>
        <OverviewContextProvider>
          <Row />
          <Separator className="my-2"/>
          <CardsMetric/>
          <Summary/>
        </OverviewContextProvider>
      </DatePickerProvider>
    </div>
  )
}

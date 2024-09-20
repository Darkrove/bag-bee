import { CalendarIcon } from "@radix-ui/react-icons"
import {
  addDays,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useDate } from "./context/datepicker-provider"

export default function DatePicker() {
  const { date, onChange } = useDate()

  return (
    <div className="flex w-full">
      <DatePickerWithRange date={date} onChange={onChange} />
      <DatePickerSelect onChange={onChange} selectedValue={date?.selected} />
    </div>
  )
}

function DatePickerWithRange({
  className,
  date,
  onChange,
}: {
  className?: string
  date: DateRange
  onChange: any
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            // eslint-disable-next-line tailwindcss/no-contradicting-classname
            className={cn(
              "mr-[1px] w-[200px] justify-start rounded-r-none border-r !border-border border-gray-100 p-2 text-left font-normal hover:bg-accent focus:bg-accent focus-visible:!ring-1 focus-visible:!ring-gray-400 dark:bg-muted dark:hover:opacity-[0.8] sm:min-w-[235px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className={`mr-2 hidden h-4 w-4 sm:inline-block`} />
            {date?.from ? (
              date.to ? (
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </span>
              ) : (
                <span>{format(date.from, "LLL dd, y")}</span>
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function DatePickerSelect({
  onChange,
  selectedValue,
}: {
  onChange: any
  selectedValue: string
}) {
  return (
    <Select
      value={selectedValue}
      onValueChange={(selected) => {
        switch (selected) {
          case "tdy": {
            onChange({
              selected,
              from: addDays(new Date(), 0),
              to: addDays(new Date(), 0),
            })
            break
          }
          case "7days": {
            onChange({
              selected,
              to: addDays(new Date(), 0),
              from: subDays(new Date(), 7),
            })
            break
          }
          case "30days": {
            onChange({
              selected,
              from: subDays(new Date(), 30),
              to: addDays(new Date(), 0),
            })
            break
          }
          case "yesterday": {
            onChange({
              selected,
              from: subDays(new Date(), 1),
              to: subDays(new Date(), 1),
            })
            break
          }
          case "thisweek": {
            const currentDate = new Date()
            const startOfWeekDate = startOfWeek(currentDate)
            const endOfWeekDate = endOfWeek(currentDate)
            onChange({
              selected,
              from: startOfWeekDate,
              to: endOfWeekDate,
            })
            break
          }
          case "thismonth": {
            const currentDate = new Date()
            const startOfMonthDate = startOfMonth(currentDate)
            const endOfMonthDate = endOfMonth(currentDate)
            onChange({
              selected,
              from: startOfMonthDate,
              to: endOfMonthDate,
            })
            break
          }
          case "thisyear": {
            const currentDate = new Date()
            const startOfYearDate = startOfYear(currentDate)
            const endOfYearDate = addDays(startOfYearDate, 365) // Assuming a non-leap year
            onChange({
              selected,
              from: startOfYearDate,
              to: endOfYearDate,
            })
            break
          }
          case "lastyear": {
            const currentDate = new Date()
            const startOfLastYearDate = startOfYear(subYears(currentDate, 1))
            const endOfLastYearDate = endOfYear(subYears(currentDate, 1))
            onChange({
              selected,
              from: startOfLastYearDate,
              to: endOfLastYearDate,
            })
            break
          }
          case "lastmonth": {
            const currentDate = new Date()
            const startOfLastMonthDate = startOfMonth(subMonths(currentDate, 1))
            const endOfLastMonthDate = endOfMonth(subMonths(currentDate, 1))
            onChange({
              selected,
              from: startOfLastMonthDate,
              to: endOfLastMonthDate,
            })
            break
          }
          case "lastweek": {
            const currentDate = new Date()
            const startOfLastWeekDate = subWeeks(currentDate, 1)
            const endOfLastWeekDate = subDays(currentDate, 1)
            onChange({
              selected,
              from: startOfLastWeekDate,
              to: endOfLastWeekDate,
            })
            break
          }
        }
      }}
    >
      <SelectTrigger className="w-full min-w-[100px] rounded-l-none !border-border p-2 hover:bg-accent focus:ring-0 focus-visible:!ring-1 focus-visible:!ring-gray-400 dark:bg-muted dark:hover:opacity-[0.8]">
        <SelectValue
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          placeholder="Select"
        />
      </SelectTrigger>
      <SelectContent className="!border-border" position="popper">
        <SelectItem value="none">Select</SelectItem>
        <SelectItem value="tdy">Today</SelectItem>
        <SelectItem value="yesterday">Yesterday</SelectItem>
        <SelectItem value="thisweek">This Week</SelectItem>
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="lastweek">Last Week</SelectItem>
        <SelectItem value="thismonth">This Month</SelectItem>
        <SelectItem value="30days">Last 30 days</SelectItem>
        <SelectItem value="lastmonth">Last Month</SelectItem>
        <SelectItem value="thisyear">This Year</SelectItem>
        <SelectItem value="lastyear">Last Year</SelectItem>
      </SelectContent>
    </Select>
  )
}

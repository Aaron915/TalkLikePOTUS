
export function datesAreAboveDaysApart(firstDate: Date, secondDate: Date, numDays: number) {
    const firstDateMilliseconds = firstDate.getTime()
    const seconDateMilliseconds = secondDate.getTime()

    const millisecondsDifference = seconDateMilliseconds - firstDateMilliseconds
    const seconds = millisecondsDifference / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    return days >= numDays
}
/**
 * Shortens a large number for display by rounding it to the nearest thousand, million, billion etc.
 *
 * @param numberToShorten - The number to shorten
 * @returns The shortened number as a string with the appropriate SI prefix (k, m, b, t)
 */
export const shortenLargeNumber = (numberToShorten: number): string => {

  if (Number.isNaN(numberToShorten)) {
    return '0'
  }

  const numberOfDigits = Math.floor(Math.log10(Math.abs(numberToShorten)))

  if (numberOfDigits < 3) {
    return numberToShorten.toString()
  }

  const unit = Math.floor(numberOfDigits / 3)
  const shortened = Math.pow(10, numberOfDigits - unit * 3) * Number((numberToShorten / Math.pow(10, numberOfDigits)).toFixed(1))

  return Math.round(shortened * 100) / 100 + ['', 'k', 'm', 'b', 't'][unit]
}

/**
 * Converts a number to a percentage string with 2 decimal places.
 *
 * @param numberToConvert - The number to convert to a percentage
 * @returns The number as a percentage string
 */
export const numberToPercentage = (numberToConvert: number): `${string}%` => {
  if (Number.isNaN(numberToConvert)) {
    return '0%'
  }
  return `${(numberToConvert * 100).toFixed(2)}%`
}

function pluralize(value:number, label:string) {
  if (value === 1) {
    return value + ' ' + label
  }
  return value + ' ' + label + 's'
}

export function timeAgo(unixTimestring: string) {
  const unixTimestamp = new Date(unixTimestring).getTime()
  const seconds = Math.floor((new Date().getTime() - unixTimestamp) / 1000)

  if (seconds < 60) {
    return 'Just now'
  }

  const intervals = [
    { seconds: 31536000, label: 'year' },
    { seconds: 2592000, label: 'month' },
    { seconds: 604800, label: 'week' },
    { seconds: 86400, label: 'day' },
    { seconds: 3600, label: 'hour' },
    { seconds: 60, label: 'minute' },
  ]

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i]
    const value = Math.floor(seconds / interval.seconds)
    if (value > 0) {
      return `${pluralize(value, interval.label)} ago`
    }
  }

  return 'Unknown'
}

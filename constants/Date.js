
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const ago = new TimeAgo('en-US')

export default function parseDate(tdate) {
  // console.log({tdate: ago.format(tdate, 'twitter'), d: Date.parse(tdate)})
  return tdate;
}
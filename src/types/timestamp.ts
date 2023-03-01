type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
type DayNumber = `${0 | 1 | 2 | 3}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
type Month = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'

export type Timestamp = `${Day} ${Month} ${DayNumber} ${number}:${number}:${number} +0000 ${number}`

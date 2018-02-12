const monthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const getTimestampOfMonth = (year, month) => {
    const realMonth = month + 1
    const monthString = realMonth > 9 ? '' + realMonth : '0' + realMonth
    const dateString = [ year, monthString, '01' ].join('-')

    return new Date(dateString).getTime()
}

export const getPeriods = firstCandle => {
    const firstDate = new Date(firstCandle[0])
    const firstYear = firstDate.getFullYear()
    const firstMonth = firstDate.getMonth()
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const periods = []

    for (let year = firstYear; year <= currentYear; year++) {
        const startMonth = year === firstYear ? firstMonth: 0
        const maxMonth = year === currentYear ? currentMonth : 11

        for (let month = startMonth; month <= maxMonth; month++) {
            const periodMonth = monthList[month]
            const period = [periodMonth, year].join(' ')

            periods.push({
                date: getTimestampOfMonth(year, month),
                string: period
            })
        }
    }

    return periods
}

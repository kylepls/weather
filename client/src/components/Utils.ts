const timeSuffixes = {
    'ms': 1,
    's': 1000,
    'm': 1000*60,
    'h': 1000*60*60,
    'd': 1000*60*60*24,
}

export function parseInterval(interval: string) {
    const parts = interval.split(' ')

    let total = 0;
    for (const part of parts) {
        const matches = part.match(/[0-9]+([a-z]{1,2})/)
        if (matches !== null) {
            const suffix = matches[1]
            const multiplier = parseInt(part.substring(0, part.length-1))
            total += timeSuffixes[suffix] * multiplier
        } else {
            throw Error(`Could not parse '${part}' in interval '${interval}'`)
        }
    }

    return total
}

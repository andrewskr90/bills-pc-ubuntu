export const removeLeadingZeroes = (string) => {
    let i = 0
    while (string[i] === '0' && i < string.length-1) {
        i++
    }
    return string.slice(i)
}
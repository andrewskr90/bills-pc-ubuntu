const seperateColumnsValues = (object) => {
    //takes in a single object of keys and STRINGS,
    //concatinates the keys and values to be used as
    //columns and values in sql query
    const concatinated = {}
    concatinated.columns = ''
    concatinated.values = ''
    const keys = Object.keys(object)

    keys.forEach((key, index) => {
        if (index === keys.length -1) {
            concatinated.columns += `${key}`
            concatinated.values += `'${object[key]}'`
        } else {
            concatinated.columns += `${key}, `
            concatinated.values += `'${object[key]}', `
        }
    })
    return concatinated
}

const filterConcatinated = (filter) => {
    let filterStringified = ''
    const keys = Object.keys(filter)

    keys.forEach((key, index) => {
        if (index === keys.length -1) {
            filterStringified += `${key}='${filter[key]}'`
        } else {
            filterStringified += `${key}='${filter[key]}' AND `
        }
    })
    return filterStringified
}

module.exports = {
    seperateColumnsValues,
    filterConcatinated
}
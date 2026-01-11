const getPublicId = (url?: string) => {
    if(!url) return ''
    const splitted = url.split('/')
    const fileName = decodeURIComponent(splitted[splitted.length - 1].split('.')[0])

    return `${splitted[splitted.length - 3]}/${splitted[splitted.length - 2]}/${fileName}`
}

export default getPublicId
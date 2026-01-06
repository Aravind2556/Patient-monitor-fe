export const renderImgUrl = (BeURL, path, name) => {
    let url = ""
    if (path && BeURL) {
        url = BeURL.concat(path)
    }
    else if (name) {
        url = `https://ui-avatars.com/api/?name=${name}&background=e8eaff&color=2c25c4`
    }
    return url
}
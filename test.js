const hasOne = () => {
    const arr1 = [1, 2, 3, 4]
    const arr2 = [2,3,4]
    const arr = arr1
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
            return true
        }
    }
    return arr1.some(value => value === 1);
}
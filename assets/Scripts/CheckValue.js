function checkArrayInArray2D(array1D, array2D) {
    for (let i = 0; i < array2D.length; i++) {
        const currentArray = array2D[i];
        if (currentArray.length === array1D.length) {
            let isEqual = true;
            for (let j = 0; j < currentArray.length; j++) {
                if (currentArray[j] !== array1D[j]) {
                    isEqual = false;
                    break;
                }
            }
            if (isEqual) {
                return true;
            }
        }
    }
    return false;
}
export {checkArrayInArray2D};
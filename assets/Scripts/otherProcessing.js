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
function stringToArray(string) {
    let arr = String(string).split('.');
    return arr.map(str => parseInt(str))
}
function readFile(data){
    const lines = data.split('\n');
    let result={};
    const temp=lines[1].split(',');
    result["start"]=stringToArray(temp[0]);
    result["destination"]=stringToArray(temp[1]);
    result["firstRow"]=stringToArray(temp[6]);
    result["secondRow"]=stringToArray(temp[7]);
    result["thirdRow"]=stringToArray(temp[8]);
    result["moves"]=stringToArray(temp[9]);
    let wallLeft = [];
    let wallRight = [];
    let wallTop = [];
    let wallBottom = [];
    for(let indexLines=1;indexLines<lines.length;indexLines++){
        data=lines[indexLines].split(',');
        
        if(data[2]!='')wallLeft.push(stringToArray(data[2]));
        if(data[3]!='')wallRight.push(stringToArray(data[3]));
        if(data[4]!='')wallTop.push(stringToArray(data[4]));
        if(data[5]!='')wallBottom.push(stringToArray(data[5]));
    }
    result["wallLeft"]=wallLeft;
    result["wallRight"]=wallRight;
    result["wallTop"]=wallTop;
    result["wallBottom"]=wallBottom;
    
    return result
}
export {checkArrayInArray2D,stringToArray,readFile};
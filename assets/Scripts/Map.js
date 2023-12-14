import { checkArrayInArray2D } from './CheckValue.js';
class Map {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.wallLeft = [];
        this.wallRight = [];
        this.wallTop = [];
        this.wallBottom = [];
    }
    setWall(value, key) {
        let wall = []
        value.forEach(element => {
            if (this.checkPosition(element[0], element[1])) {
                wall.push(element);
                
            } else {
                return false;
            }
        });
        if (key == 'left') {
            this.wallLeft.push(...wall);
            wall.forEach(element => {
                if (this.checkPosition(element[0], element[1] - 1)) {
                    this.wallRight.push([element[0], element[1] - 1]);
                }
            })
        }
        else if (key == 'right') {
            this.wallRight.push(...wall);
            wall.forEach(element => {
                if (this.checkPosition(element[0], element[1] + 1)) {
                    this.wallLeft.push([element[0], element[1] + 1]);
                }
            })
        }
        else if (key == 'top') {
            this.wallTop.push(...wall);
            wall.forEach(element => {
                if (this.checkPosition(element[0] - 1, element[1])) {
                    this.wallBottom.push([element[0] - 1, element[1]]);
                }
            })
        }
        else if (key == 'bottom') {
            this.wallBottom.push(...wall);
            wall.forEach(element => {
                if (this.checkPosition(element[0] + 1, element[1])) {
                    this.wallTop.push([element[0] + 1, element[1]]);
                }
            })
        }
        else return false;
        return true;
    }
    checkPosition(x, y) {
        if (x >= 0 && y >= 0) {
            if (x < this.x && y < this.y) {
                return true;
            }
        }
        return false;
    }
}

module.exports = Map;
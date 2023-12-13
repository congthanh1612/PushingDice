class MapDice{
    constructor(firstRow,secondRow,thirdRow){
        this.firstRow=firstRow,
        this.secondRow=secondRow,
        this.thirdRow=thirdRow,
        this.diceFace=this.secondRow[1]
    };
    Up(){
        this.firstRow[1]=this.secondRow[1];
        this.secondRow[1]=this.thirdRow[1];
        this.thirdRow[1]=7-this.firstRow[1];
        this.diceFace=this.secondRow[1];
        return this.diceFace-1;
    };
    Down(){
        this.thirdRow[1]=this.secondRow[1];
        this.secondRow[1]=this.firstRow[1];
        this.firstRow[1]=7-this.thirdRow[1];
        this.diceFace=this.secondRow[1];
        return this.diceFace-1;
    }
    Left(){
        this.secondRow[0]=this.secondRow[1];
        this.secondRow[1]=this.secondRow[2];
        this.secondRow[2]=7-this.secondRow[0];
        this.diceFace=this.secondRow[1];
        return this.diceFace-1;
    }
    Right(){
        this.secondRow[2]=this.secondRow[1];
        this.secondRow[1]=this.secondRow[0];
        this.secondRow[0]=7-this.secondRow[2];
        this.diceFace=this.secondRow[1];
        return this.diceFace-1;
    }
}

module.exports=MapDice;
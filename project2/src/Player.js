class Player{
   constructor (id=0,name="") {
    this.id=id;
    this.name=name;
    this.random_num;
    this.steps=0;
    this.games_count=0;
    this.scores=[];
    this.is_active=true;
    this.avg=function(){
        if(this.scores.length>0){
            let sum = this.scores.reduce(myFunc);
            function myFunc(total, num) {
            return total + num;
            }
            return sum/this.games_count;
        }
      return 0;
    }
    this.avg();
}
}
export default Player;
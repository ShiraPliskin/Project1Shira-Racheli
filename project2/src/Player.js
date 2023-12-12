class Player{
   constructor (id=0,name="") {
    this.id=id;
    this.name=name;
    this.random_num;
    this.steps=0;
    this.games_count=0;
    this.scores=[];
    this.is_active=true;
    this.avg;
  }
}
export default Player;
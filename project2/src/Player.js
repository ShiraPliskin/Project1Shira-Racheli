class Player{
    constructor(id=0,name="",MAX_NUM=100){
        this.id=id;
        this.name=name;
        this.random_num=this.generate_random(MAX_NUM);
        this.steps=0;
        this.games_count=0;
        this.scores=[];
        this.is_active=true;
        this.avg=this.generate_avg();
    }
    generate_avg(){
        let sum=0;
        this.scores.foreach=(score)=>{
            sum+=score;
        } 
        return this.games_count?sum/this.games_count:0;
    }
    generate_random(MAX_NUM){
        return Math.floor(Math.random() * MAX_NUM)
    }
}

export default Player;
class Player{
    constructor(name,MAX_NUM){
        this.name=name;
        this.random_num=this.generate_random(MAX_NUM);
        this.steps=0;
        this.games_count=0;
        this.scores=[];

    }
    
    generate_random(MAX_NUM){
        return Math.floor(Math.random() * MAX_NUM)
    }
}

export default Player;
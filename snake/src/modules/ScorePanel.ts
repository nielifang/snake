// 计分牌
class ScorePanel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 设置一个变量限制等级
    maxLevel: number;
    // 设置一个变量表示多少分时升级
    upScore: number;
    constructor(maxLevel: number = 10,upScore:number=10){
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore
    }
    // 设置一个加分的方法
    addScore() {
        // this.score++;
        this.scoreEle.innerHTML = ++this.score + '';
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }
    // 升级的方法
    levelUp() {
        if (this.level < this.maxLevel) {
        this.levelEle.innerHTML = ++this.level + '';
        }
    }
    
}

// 测试
// const scorePanel = new ScorePanel(10,2);
// scorePanel.addScore()
// for (let i = 0; i < 11; i++){
//     scorePanel.addScore()
// }

export default ScorePanel
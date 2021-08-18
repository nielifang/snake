import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';
// 控制其他的所有类
class GameControl{
    // 定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    // 创建一个属性来存储按键的方向
    direction: string = 'ArrowRight';
    // 创建一个属性，记录游戏是否结束
    isLive = true;
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,2);
        this.init();
    }
    // 游戏的初始化方法，调用后游戏开始
    init() {
        // 绑定键盘的按键按下的事件
        document.addEventListener("keydown", this.keydownHandler.bind(this));
         // 调用run，使蛇移动
         this.run();
    }
    // 创建键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // 检查按键是否合法(上下左右)
        this.direction = event.key
    }
    // 创建一个控制蛇移动的方法
    run() {
        // 根据方向（this.direction）来使蛇的位置改变
        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;
        // 根据按键的方向修改X和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }
        // 检查蛇是否吃到了食物
        if (this.checkEat(X, Y)) {
            // 食物的位置重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇增加一节
            this.snake.addBody();
        }
        // 修改蛇的X和Y
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            //进入catch说明出现了异常，也就是游戏结束
            alert(e.message+'GAME OVER');
            this.isLive = false;
        }
       
        // 游戏未结束时开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }
   // 检查蛇是否吃到了食物
    checkEat(X:number,Y:number) {
        return X === this.food.X&& Y === this.food.Y
    }

}
export default GameControl
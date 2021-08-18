class Snake{
    // 获取蛇头的元素
    head: HTMLElement;
    // 蛇的身体，包括蛇头
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById("snake")!;
        this.head = document.querySelector("#snake > div")!;
        this.bodies = document.getElementById("snake")!.getElementsByTagName('div');
    }
    // 获取蛇(蛇头)的坐标
    get X() {
            return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    // 设置蛇头的坐标
    set X(val: number) {
        // 新值和旧值相等时直接返回
        if (this.X === val) {
            return
        }
        // X的合法范围(0,290)
        if (val < 0 || val > 290) {
            //说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        // 蛇在向左移动时不能向右掉头,反之亦然(即蛇头和第二节的坐标一样)
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) {
            // 如果发生了掉头，让蛇往以前的方向继续移动
            if (val > this.X) {
                // 如果新值大于了旧值X，说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                val = this.X - 10;
            } else {
                val = this.X + 10;
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.left = val + 'px';
        this.checkHeadBody()
    }
    set Y(val: number) {
        if (this.Y === val) {
            return
        }
        if (val < 0 || val > 290) {
            //说明蛇撞墙了,抛出异常
            throw new Error('蛇撞墙了')
        }
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) {
            // 如果发生了掉头，让蛇往以前的方向继续移动
            if (val > this.Y) {
                // 如果新值大于了旧值Y，说明蛇在向下走，此时发生掉头，应该使蛇继续向上走
                val = this.Y - 10;
            } else {
                val = this.Y + 10;
            }
        }
        // 移动身体
        this.moveBody()
        this.head.style.top = val + 'px'
        this.checkHeadBody()
    }
    // 设置蛇增加身体的方法
    addBody() {
        // 向element增加div
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }
    // 添加蛇身体移动的方法
    moveBody() {
        // 将后面身体的位置设置为前面一个身体的位置(第4节的位置等于第3节的位置。。。)
        // 遍历所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--){
            // 获取前面身体的位置
            let preX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let preY = (this.bodies[i - 1]as HTMLElement).offsetTop;
            (this.bodies[i]as HTMLElement).style.left = preX + 'px';
            (this.bodies[i]as HTMLElement).style.top = preY + 'px';
        }
    }
    // 检查蛇头是否撞到身体的方法
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++){
            const bd = this.bodies[i] as HTMLElement;
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 游戏结束
                throw new Error("撞到自己了")
            }
        }
    }
}

export default Snake
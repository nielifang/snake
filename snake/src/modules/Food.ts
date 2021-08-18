
//定义食物类
class Food{
    // 定义一个属性来表示食物对应的元素
    element: HTMLElement;
    constructor() {
        // 加 ！ 表示这个元素一定存在
        this.element = document.getElementById('food')!;
    }
    // 定义一个获取食物x,y坐标的方法
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }
    // 随机生成食物的位置(食物的x取值范围是(0，290)
    // 蛇移动一次就是一格，一格的大小是10，所以要求食物的坐标必须是整10
    change() {
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 20) * 10;
        this.element.style.left = top+'px';
        this.element.style.top = left + 'px';

    }
}

export default Food;
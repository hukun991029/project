class Main {
    name: string;
    food: string[];
    constructor(name: string, food: string[]) {
        this.name = name;
        this.food = food;
    }
    eat(): void {
        console.log(`i eat ${this.food.toString()}`);
    }
}
class Header {
    constructor() {
        const ele: HTMLElement = document.createElement('h1');
        ele.innerHTML = '我是h1';
        document.body.appendChild(ele);
    }
}
export { Main,Header };

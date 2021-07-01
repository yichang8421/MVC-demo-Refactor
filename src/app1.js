import $ from 'jquery';
import "./app1.css";
import Model from "./base/Model";
import View from "./base/View";
import EventBus from "./base/EventBus";

/*
* MVC：
* 所有与数据相关的代码都放到M
* 所有与视图相关的代码都放到V
* 其他代码都放到C
*
* */

// const eventBus = new EventBus();

const m = new Model({
    data: {
        n: parseFloat(localStorage.getItem("n"))
    },
    update(data) {
        //将m.data全部赋值给data
        Object.assign(m.data, data);
        //eventBus的trigger()触发事件，然后用on()监听这个事件，以实现对象间通信
        m.trigger('m已更新');
        // localStorage.setItem("n", m.data.n || 100);
    }
});
//
// console.dir(m);
// m.create();
//


const init = (el) => {
    new View({
        el: el,
        // eventBus: eventBus,
        data: m.data,
        html: `
            <div>
                <div class="output">
                    <span id="number">{{n}}</span>
                </div>
                <div class="actions">
                    <button id="add1">+1</button>
                    <button id="minus1">-1</button>
                    <button id="mul2">*2</button>
                    <button id="divide2">÷2</button>
                </div>
            </div>
        `,

        render(data) {
            const n = data.n;
            if (this.el.children) {
                this.el.empty();
                // const newEle = $(v.html.replace("{{n}}", m.data.n || 100));
                // $(v.html.replace("{{n}}", m.data.n)).appendTo(v.el);
                // v.el = $(v.html.replace("{{n}}", m.data.n)).appendTo(v.el);
                // v.el.replaceWith(newEle);
                // v.el = newEle;
            }
            $(this.html.replace("{{n}}", n)).appendTo(this.el);
            localStorage.setItem("n", n || 100);
        },
        events: {
            'click #add1': 'add',
            'click #minus1': 'minus',
            'click #mul2': 'mul',
            'click #divide2': 'divide',
        },
        add() {
            m.update({n: m.data.n + 1});
        },
        minus() {
            m.update({n: m.data.n - 1});
        },
        mul() {
            m.update({n: m.data.n * 2});
        },
        divide() {
            m.update({n: m.data.n / 2});
        },


    });
};

export default init;

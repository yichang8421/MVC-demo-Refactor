import $ from 'jquery';
import "./app1.css";

/*
* MVC：
* 所有与数据相关的代码都放到M
* 所有与视图相关的代码都放到V
* 其他代码都放到C
*
* */

const eventBus = $(window);
// console.log(eventBus);

const m = {
    data: {
        n: parseFloat(localStorage.getItem("n"))
    },
    update(data) {
        //将m.data全部赋值给data
        Object.assign(m.data, data);

        //eventBus的trigger()触发事件，然后用on()监听这个事件，以实现对象间通信
        eventBus.trigger('m已更新');
        // localStorage.setItem("n", m.data.n || 100);
    }
};

const v = {
    cntnr: null,
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
    init(container) {
        v.cntnr = $(container);
    }
    ,
    render(data) {
        if (v.cntnr.children) {
            v.cntnr.empty();
            // const newEle = $(v.html.replace("{{n}}", m.data.n || 100));
            // $(v.html.replace("{{n}}", m.data.n)).appendTo(v.cntnr);
            // v.el = $(v.html.replace("{{n}}", m.data.n)).appendTo(v.cntnr);
            // v.el.replaceWith(newEle);
            // v.el = newEle;
        }
        $(v.html.replace("{{n}}", data)).appendTo(v.cntnr);
        localStorage.setItem("n", data || 100);
    },
    // 渲染数据到页面
    // update() {
    //     c.ui.number.text(m.data.n || 100);
    // }
};

const c = {
    init(container) {
        //初始化html
        v.init(container);
        v.render(m.data.n);
        // c.ui = {
        //     //寻找关键元素
        //     button1: $("#add1"),
        //     button2: $("#minus1"),
        //     button3: $("#mul2"),
        //     button4: $("#divide2"),
        //     number: $("#number"),
        // };
        //绑定事件
        c.autoBindEvents();
        eventBus.on('m已更新', () => {
            v.render(m.data.n);
        });
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
    autoBindEvents(){
        for(let key in c.events){
            const value = c[c.events[key]];
            const spaceIndex = key.indexOf(' ');
            const part1 = key.slice(0,spaceIndex);
            const part2 = key.slice(spaceIndex+1);
            // console.log(part1,part2,value);
            v.cntnr.on(part1,part2,value);
        }
    }


    // bindEvents() {
    //     v.cntnr.on('click', "#add1", () => {
    //         m.update({n: m.data.n + 1});
    //         // m.data.n += 1;
    //         // v.render();
    //         // localStorage.setItem("n", m.data.n);
    //     });
    //     // c.ui.button1.on("click", () => {
    //     //     // let n = m.data.n;
    //     //     // n += 1;
    //     //     // localStorage.setItem("n", n);
    //     //     // c.ui.number.text(n);
    //     //     m.data.n += 1;
    //     //     v.render();
    //     // });
    //     v.cntnr.on('click', "#minus1", () => {
    //         m.update({n: m.data.n - 1});
    //         // m.data.n -= 1;
    //         // v.render();
    //         // localStorage.setItem("n", m.data.n);
    //     });
    //     v.cntnr.on('click', "#mul2", () => {
    //         m.update({n: m.data.n * 2});
    //         // m.data.n <<= 1;
    //         // v.render();
    //         // localStorage.setItem("n", m.data.n);
    //     });
    //     v.cntnr.on('click', "#divide2", () => {
    //         m.update({n: m.data.n / 2});
    //         // m.data.n >>= 1;
    //         // v.render();
    //         // localStorage.setItem("n", m.data.n);
    //     });
    // }
};

// //初始化html
// v.render();

// //寻找关键元素,并绑定事件
// c.init();

export default c;


// const html = `
//     <section id="app1">
//         <div class="output">
//             <span id="number">100</span>
//         </div>
//         <div class="actions">
//             <button id="add1">+1</button>
//             <button id="minus1">-1</button>
//             <button id="mul2">*2</button>
//             <button id="divide2">÷2</button>
//         </div>
//     </section>
// `;
//
// const $element = $(html).appendTo($("body>.page"));


//寻找关键元素
// const $button1 = $("#add1");
// const $button2 = $("#minus1");
// const $button3 = $("#mul2");
// const $button4 = $("#divide2");
// const c.ui.number = $("#number");

// localStorage.setItem('n',100);

//初始化数据
// const n = localStorage.getItem("n");

//渲染数据到页面
// c.ui.number.text(n || 100);

//绑定鼠标事件
// c.bindEvents();
// $button1.on("click", () => {
//     let n = parseInt(c.ui.number.text());
//     n += 1;
//     localStorage.setItem("n", n);
//     c.ui.number.text(n);
// });
// $button2.on("click", () => {
//     let n = parseInt(c.ui.number.text());
//     n -= 1;
//     localStorage.setItem("n", n);
//     c.ui.number.text(n);
// });
// $button3.on("click", () => {
//     let n = parseInt(c.ui.number.text());
//     n <<= 1;
//     localStorage.setItem("n", n);
//     c.ui.number.text(n);
// });
// $button4.on("click", () => {
//     let n = parseInt(c.ui.number.text());
//     n >>= 1;
//     localStorage.setItem("n", n);
//     c.ui.number.text(n);
// });
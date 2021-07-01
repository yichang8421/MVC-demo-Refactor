import './app2.css'
import $ from 'jquery'
import Model from "./base/Model";
import View from "./base/View";
import EventBus from "./base/EventBus";

// const eventBus = new EventBus();


const m = new Model({
    data: {
        index: parseInt(localStorage.getItem("index")) || 0
    },
    update(data) {
        Object.assign(m.data, data);
        m.trigger('m已更新');
        localStorage.setItem('index', m.data.index)
    },
});

const init = (el) => {
    new View({
        el: el,
        // eventBus: eventBus,
        data: m.data,
        html(index) {
            return `
             <section>
                <ol class="tab-bar">
                    <li class="${!index ? 'selected' : ''}" data-index = "0"><span>1111</span></li>
                    <li class="${index ? 'selected' : ''}" data-index = "1"><span>2222</span></li>
                </ol>
                <ol class="tab-content">
                    <li class="${!index ? 'active' : ''}" >内容1</li>
                    <li class="${index ? 'active' : ''}" >内容2</li>
                </ol>
             </section>
        `
        },

        render(data) {
            const index = data.index;
            if (this.el.children)
                this.el.empty();
            $(this.html(index)).appendTo(this.el);
        },

        events: {
            'click .tab-bar li': 'x',
        },
        x(e) {
            // console.log(e);
            const index = parseInt(e.currentTarget.dataset.index)
            // console.log(index);
            m.update({index: index})
        },


    });
};

export default init;


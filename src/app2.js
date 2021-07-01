import './app2.css'
import $ from 'jquery'
import Model from "./base/Model";

const eventBus = $(window)



const m = new Model( {
    data: {
        index: parseInt(localStorage.getItem("index")) || 0
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('index', m.data.index)
    },
});

const view = {
    el: null,
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

    render(index) {
        if (view.el.children.length !== 0) view.el.empty()
        $(view.html(index)).appendTo(view.el)
    },
    
    init(container) {
        view.el = $(container);
        view.render(m.data.index) // view = render(data)
        view.autoBindEvents()
        eventBus.on('m:updated', () => {
            view.render(m.data.index)
        })
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
    autoBindEvents() {
        for (let key in view.events) {
            const value = view[view.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            view.el.on(part1, part2, value)
        }
    }
};


export default view
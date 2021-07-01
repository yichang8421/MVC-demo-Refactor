class Model {
    //原型上的方法
    constructor(options) {
        //对象本身的属性
        ['data','create','delete','update','get'].forEach((key)=>{
            if(key in options) this[key] = options[key];
        });

        // this.data = options.data;
        // this.create = options.create;
        // this.delete = options.delete;
        // this.update = options.update;
        // this.get = options.get;
    }

    //原型上的方法
    create() {
        // console?.error?.("你还没有实现create"); 此句ES6语法是支持的，但是parcel不支持
        console && console.error && console.error("你还没有实现create");
    }

    delete() {
        console && console.error && console.error("你还没有实现delete");
    }

    update() {
        console && console.error && console.error("你还没有实现update");
    }

    get() {
        console && console.error && console.error("你还没有实现get");
    }
}

export default Model;

// const m = new Model();
//
// m.create();
// m.delete();
// m.update();
// m.get();
import "./app2.css";
import $ from "jquery";

const $tabBar = $("#app2 .tab-bar");
const $tabContent = $("#app2 .tab-content");

$tabBar.on("click",e=>{
   const $li = $(e.target);
   $li
       .addClass("selected")
       .siblings()
       .removeClass("selected");
   const index = $li.index();
   $tabContent
       .children()
       .eq(index)
       .addClass("active")
       .siblings()
       .removeClass("active");
});

//初始化选项
$tabBar.children().eq(0).trigger("click");

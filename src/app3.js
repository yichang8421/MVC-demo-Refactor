import "./app3.css";
import $ from "jQuery";

const $square = $("#app3 .square");

$square.on("click",()=>{
   $square.toggleClass("active");
});
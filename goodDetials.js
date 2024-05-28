const textarea = document.querySelector("textarea")
const area = document.querySelector(".area")
const comment = document.querySelector(".comment")
//先把这个ul获取过来，
const the_publish_comment = document.querySelector(".the_publish_comment")
const comment_list = []
//给他绑定事件，绑定一个能够显示出来下面隐藏部分的事件
textarea.addEventListener("click",function(){
    area.style.opacity = 1
})
textarea.addEventListener("blur",function(){
    area.style.opacity = 0
})
//注意弄清楚谁才是事件源！
textarea.addEventListener("input",function(){
    area.innerHTML = `you can still input ${textarea.value.length}/200 words`
})
//加入一个enter键，当我在textarea里面，键盘抬起，并且按下enter键的时候才能发布评论
textarea.addEventListener("keyup",function(event){
    if(event.key === "Enter"){
        area.innerHTML = `you can still input 0/200 words`
        const li_object = {
            content:textarea.value
        }
        comment_list.push(li_object)
        printOut()
        textarea.value = ""
    }
})
//这个是一个渲染的函数，就像咱们所说的一样，一定要封装性强一点。
function printOut(){
    //你刚才也能看到那个bug了，因为整个流程是：把所有的数据全部渲染上去，所以每一次渲染前我都得把这个给清空一下下
    the_publish_comment.innerHTML = ""
    for(let i=0; i<comment_list.length;i++){
        // console.log(comment_list[i].content)
        const li = document.createElement("li")
        li.innerHTML = `
            user Group5: ${comment_list[i].content}
        `
        the_publish_comment.appendChild(li)
    }
}

//这里开始就是给购物车的了
const shopping_cart = document.querySelector(".shopping_cart") 
const mask = document.querySelector(".mask")
const pop_window = document.querySelector(".pop-window")
const shopping_cart_list = document.querySelector(".shopping_cart_list")
shopping_cart.addEventListener("click",function(){
    mask.style.display = "block"
    pop_window.style.display = "block"
    printGoodsOut()
})
mask.addEventListener("click",function(){
    pop_window.style.display = 'none';
    mask.style.display = 'none';
})


//这里是要添加上频道本地存储的：
// goodsArray，用来把本地存储的东西变成一个数组
const goodsArray = JSON.parse(localStorage.getItem("goods_information")) || [];

// 确保title和price元素存在且有innerHTML属性
const button = document.querySelector(".cart");
const title = document.querySelector(".title");
const price = document.querySelector(".price");

// 检查元素是否存在
if (title && price) {
    button.addEventListener("click", function() {
// 确保goodObject被正确赋值
    const goodObject = {
        name: title.innerHTML,
        price: price.innerHTML,
    };

// 将商品对象添加到商品数组中
    goodsArray.push(goodObject);

// 将更新后的商品数组存储到localStorage中
    localStorage.setItem("goods_information", JSON.stringify(goodsArray));
    alert("ADD SUCCESSFULLY!")
})
} 

//打印goodsArray的所有商品
function printGoodsOut(){
    shopping_cart_list.innerHTML = ""
    console.log(goodsArray)
    for(let i = 0;i<goodsArray.length;i++){
        const li = document.createElement("li")
        li.innerHTML = `
        <h2>${goodsArray[i].name}</h2>
        <h3>${goodsArray[i].price}</h3>
        <button class="Delect" data-id = ${i}>Delect</button>
        <hr>
        `
        shopping_cart_list.appendChild(li)
    }
}

const delect = document.querySelector(".Delect")
shopping_cart_list.addEventListener("click",function(event){
    // 这里是为了判断点击的是不是button按钮
    if(event.target.tagName === "BUTTON"){
        goodsArray.splice(event.target.dataset.id,1)
        printGoodsOut()
        localStorage.setItem("goods_information", JSON.stringify(goodsArray))
    }
})
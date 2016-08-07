/**
 * Created by Artoria on 2016/8/4 0004.
 */

//左侧列表
var mAllTask = document.querySelector('.m-all-task');
var allTaskLsit = mAllTask.querySelector(".task-list");

//右侧大分类
var leftCate = "";
var leftCateChild = "";

//生成右侧大分类
//每次循环之前首先清空
leftCate = "";
category.forEach(function (elem, i) {
    //循环生成子节点
    leftCateChild = "";
    elem.child.forEach(function (elem, i) {
        leftCateChild += '<a data-id="' + cateChild[elem].id + '" class="js-all-choose"><i class="iconfont icon-work"></i> ' + cateChild[elem].name + ' (' + cateChild[elem].child.length + ') <i class="iconfont icon-close js-task-del"></i></a>';
    });

    //生成父节点
    leftCate += '<li>' +
        '<h5 data-id="' + elem.id + '" class="js-all-choose"><i class="iconfont icon-flie-open"></i>' + elem.name + ' (' + elem.child.length + ') <i class="iconfont icon-close js-task-del"></i>' +
        '</h5>' +
        '<div class="task">' +
        leftCateChild +
        '</div>' +
        '</li>';
});
//渲染左侧分类菜单
allTaskLsit.innerHTML = leftCate;

//任务列表
var taskList = document.querySelector(".m-task");
var mTaskList = taskList.querySelector(".m-task-list");


//中间的任务列表
var middleLsit = "";
middleCate();
function middleCate(child) {
    child = child || toDo;
    //将时间节点添加到一个对象中，对象的key是时间，value是一个数组，数组中放入这个i
    var dataObj = {};
    //如果不填写参数，那么child为默认参数。默认参数的每一个值是对象，所以需要做一个判断。传入参数的话传入的参数应该是cateChild[n].child
    if (typeof child[0] === "object") {
        //如果是用默认参数，那么参数的每一项应该是一个对象
        for (var i = 0; i < child.length; i++) {
            dataObj[toDo[i].data] = [];
        }
        for (var i = 0; i < child.length; i++) {
            for (var attr in dataObj) {
                if (attr == toDo[i].data) {
                    dataObj[attr].push(i);
                }
            }
        }
    } else {
        //如果使用传入的参数，那么参数的每一项应该是一个num
        for (var i = 0; i < child.length; i++) {
            console.log(toDo[i]);
            dataObj[toDo[child[i]].data] = [];
        }

        for (var i = 0; i < child.length; i++) {
            for (var attr in dataObj) {
                if (attr == toDo[child[i]].data) {
                    dataObj[attr].push(child[i]);
                }
            }
        }
    }

//循环dataObj，生成中间的节点
    var midTaskList = "";
    for (var attr in dataObj) {
        midTaskList = "";
        for (var i = 0; i < dataObj[attr].length; i++) {
            if (toDo[dataObj[attr][i]].finish) {
                midTaskList += '<a class="task-over choose" data-id="' + toDo[dataObj[attr][i]].id + '"><i class="iconfont icon-sure"></i>' + toDo[dataObj[attr][i]].name + ' <i class="iconfont icon-close"></i></a>';
            } else {
                midTaskList += '<a class="choose" data-id="' + toDo[dataObj[attr][i]].id + '">' + toDo[dataObj[attr][i]].name + '<i class="iconfont icon-close"></i></a>';
            }
        }
        middleLsit += '<li>' + '<h4>' + attr + '</h4>' + midTaskList + '</li>'
    }
}


mTaskList.innerHTML = middleLsit;
var listChoose = mTaskList.querySelectorAll(".choose");
//默认选中第一个li
listChoose[0].className += " act";
//获取被选中的那个li,根据这个渲染右侧任务详情
var nowChose = mTaskList.querySelector(".act");
var taskMes = document.querySelector(".m-task-msg");
rightTaskRender(nowChose.dataset.id);
//根据nowChose渲染右侧任务内容
function rightTaskRender(choseId) {
    var title = taskMes.querySelector('.msg-head .title span');
    var time = taskMes.querySelector('.msg-time .time span');
    var content = taskMes.querySelector('.mes-content .work-message');
    for (var attr in toDo) {
        if (toDo[attr].id == choseId) {
            title.innerHTML = toDo[attr].name;
            time.innerHTML = toDo[attr].data;
            content.innerHTML = toDo[attr].content;
        }
    }
}


//页面渲染完毕，开始实现切换效果

//点击最左侧分类切换
var leftCateArr = document.querySelectorAll(".js-all-choose");
for(var i=0;i<leftCateArr.length;i++){
    leftCateArr[i].onclick = function () {
        for(var i=0; i<leftCateArr.length;i++){
            removeClass(leftCateArr[i],"act");
        }
        addClass(this,"act");
        var dataset = this.dataset.id;
        //然后去渲染右侧的任务列表 有三种情况。
       if(this.tagName === "H2"){
           middleCate();
       }else if(this.tagName === "H5"){
           
       }else if(this.tagName === "A"){

       }
    }
}






//addClass
function addClass(obj, classN) {
    var objClass = obj.className;
    //判断class中是否已经存在这个classN了
    if (objClass.indexOf(classN) != -1) {
        return;
    }
    //判断这个obj是否有class，如果有，需要给classN前面加一个空格
    var newClass = objClass == "" ? classN : " " + classN;
    obj.className = objClass + newClass;
}

//removeClass
function removeClass(obj, classN) {
    var objClass =obj.className;
    if(objClass.indexOf(classN) == -1){
        return;
    }
    //使用空格分隔字符串
    var classArr = objClass.split(" ");
    //循环数组，然后删除对应的className，在用空格去拼接字符串
    for( var i = 0; i < classArr.length; i++ ){
        if( classArr[i] === classN ){
            classArr.splice(i,1);
            i--;
        }
    }
    obj.className = classArr.join(" ");
}
//hasClass
function hasClass(obj, classN) {
    var objClass = obj.className;
    if(objClass.indexOf(classN) != -1){
        return true;
    }else {
        return false;
    }
}
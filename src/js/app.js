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
        leftCateChild += '<a data-id="'+cateChild[elem].id+'"><i class="iconfont icon-work"></i> '+ cateChild[elem].name+' ('+ cateChild[elem].child.length +') <i class="iconfont icon-close js-task-del"></i></a>';
    });

    //生成父节点
    leftCate += '<li>' +
        '<h5 data-id="'+elem.id+'"><i class="iconfont icon-flie-open"></i>' + elem.name + ' (' + elem.child.length + ') <i class="iconfont icon-close js-task-del"></i>' +
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
//将时间节点添加到一个对象中，对象的key是时间，value是一个数组，数组中放入这个i
var dataObj = {};
for(var i=0;i<toDo.length;i++){
    dataObj[toDo[i].data] = [];
}
for(var i=0; i<toDo.length;i++){
    for(var attr in dataObj){
        if(attr == toDo[i].data){
            dataObj[attr].push(i);
        }
    }
}
//循环dataObj，生成中间的节点
var middleLsit ="";
var midTaskList = "";
for(var attr in dataObj){
    midTaskList = "";
    for(var i=0;i<dataObj[attr].length;i++){
        if(toDo[dataObj[attr][i]].finish){
            midTaskList += '<a class="task-over choose" data-id="'+ toDo[dataObj[attr][i]].id +'"><i class="iconfont icon-sure"></i>'+ toDo[dataObj[attr][i]].name +' <i class="iconfont icon-close"></i></a>';
        }else {
            midTaskList +='<a class="choose" data-id="'+ toDo[dataObj[attr][i]].id +'">'+ toDo[dataObj[attr][i]].name +'<i class="iconfont icon-close"></i></a>';
        }
    }
    middleLsit+='<li>'+ '<h4>'+ attr +'</h4>' + midTaskList + '</li>'
}



mTaskList.innerHTML = middleLsit;
var listChoose = mTaskList.querySelectorAll(".choose");
//默认选中第一个li
listChoose[0].className+=" act";
//获取被选中的那个li,根据这个渲染右侧任务详情
var nowChose = mTaskList.querySelector(".act");
var taskMes = document.querySelector(".m-task-msg");
rightTaskRender(nowChose.dataset.id);
//根据nowChose渲染右侧任务内容
function rightTaskRender(choseId) {
    var title = taskMes.querySelector('.msg-head .title span');
    var time = taskMes.querySelector('.msg-time .time span');
    var content = taskMes.querySelector('.mes-content .work-message');
    console.log(title,time,content);
    for(var attr in toDo){
        if(toDo[attr].id == choseId){
            title.innerHTML = toDo[attr].name;
            time.innerHTML = toDo[attr].data;
            content.innerHTML = toDo[attr].content;
        }
    }
}


//页面渲染完毕，开始实现切换效果


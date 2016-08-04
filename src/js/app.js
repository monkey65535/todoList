/**
 * Created by Artoria on 2016/8/4 0004.
 */
/*这里是对数据的控制和对页面的渲染*/

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
        leftCateChild += '<a href="javascript:;" data-id="'+cateChild[elem].id+'"><i class="iconfont icon-work"></i> '+ cateChild[elem].name+' ('+ cateChild[elem].child.length +') <i class="iconfont icon-close js-task-del"></i></a>';
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
            midTaskList += '<a href="" class="task-over" data-id="'+ toDo[dataObj[attr][i]].id +'"> <i class="iconfont icon-sure"></i> '+ toDo[dataObj[attr][i]].name +' <i class="iconfont icon-close"></i></a>';
        }else {
            midTaskList +='<a href="" data-id="'+ toDo[dataObj[attr][i]].id +'">'+ toDo[dataObj[attr][i]].name +'<i class="iconfont icon-close"></i></a>';
        }
    }
    middleLsit+='<li>'+
        '<h4>'+ attr +'</h4>' +
        midTaskList +
        '</li>'
}
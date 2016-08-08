/**
 * Created by Artoria on 2016/8/4 0004.
 */

//左侧列表
var mAllTask = document.querySelector('.m-all-task');
var allTaskLsit = mAllTask.querySelector(".task-list");

//渲染左侧分类菜单
allTaskLsit.innerHTML = renderLeftCate();

//任务列表
var taskList = document.querySelector(".m-task");
var mTaskList = taskList.querySelector(".m-task-list");


//中间的任务列表
var middleLsit = "";
mTaskList.innerHTML = renderMiddleCate();
var listChoose = mTaskList.querySelectorAll(".choose");

//默认选中第一个li
listChoose[0].className += " act";

//获取被选中的那个li,根据这个渲染右侧任务详情
var nowChose = mTaskList.querySelector(".act");
var taskMes = document.querySelector(".m-task-msg");
//根据nowChose渲染右侧任务内容
renderRightTask(nowChose.dataset.id);


//点击最左侧分类切换
var leftCateArr = document.querySelectorAll(".js-all-choose");
for (var i = 0; i < leftCateArr.length; i++) {
    leftCateArr[i].onclick = function () {
        for (var i = 0; i < leftCateArr.length; i++) {
            removeClass(leftCateArr[i], "act");
        }
        addClass(this, "act");
        var dataset = this.dataset.id;
        //然后去渲染右侧的任务列表 有三种情况。
        if (this.tagName === "H2") {
            //当点击所有任务的时候，渲染所有右侧列表
            mTaskList.innerHTML = renderMiddleCate();

        } else if (this.tagName === "H5") {
            //当点击标题文件的时候，渲染对应的文件列表
            category.forEach(function (elem) {
               if(elem.id == dataset){
                   var childArr = [];
                   elem.child.forEach(function (item) {
                       for(var i=0;i<cateChild[item].child.length;i++){
                           childArr.push(cateChild[item].child[i]);
                       }
                   });
                   //根据childArr去生成中间的菜单
                   mTaskList.innerHTML = renderMiddleCate(childArr);
               }
            });
        } else if (this.tagName === "A") {
            //直接根据dataset去渲染
            mTaskList.innerHTML = renderMiddleCate(cateChild[dataset].child);
        }
    }
}

//点击中间的内容去显示最右侧的文字能容





















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
    var objClass = obj.className;
    if (objClass.indexOf(classN) == -1) {
        return;
    }
    //使用空格分隔字符串
    var classArr = objClass.split(" ");
    //循环数组，然后删除对应的className，在用空格去拼接字符串
    for (var i = 0; i < classArr.length; i++) {
        if (classArr[i] === classN) {
            classArr.splice(i, 1);
            i--;
        }
    }
    obj.className = classArr.join(" ");
}
//hasClass
function hasClass(obj, classN) {
    var objClass = obj.className;
    if (objClass.indexOf(classN) != -1) {
        return true;
    } else {
        return false;
    }
}
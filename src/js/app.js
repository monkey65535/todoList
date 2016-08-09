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
var middleChose = mTaskList.querySelectorAll(".js-middle-chose");

//默认选中第一个li
middleChose[0].className += " act";

//获取被选中的那个li,根据这个渲染右侧任务详情
var nowChose = mTaskList.querySelector(".act");
var taskMes = document.querySelector(".m-task-msg");
//根据nowChose渲染右侧任务内容
renderRightTask(nowChose.dataset.id);


//点击最左侧分类切换
var fatherData;
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
            rightClick();
            fatherData = "";
        } else if (this.tagName === "H5") {
            //当点击标题文件的时候，渲染对应的文件列表
            category.forEach(function (elem) {
                if (elem.id == dataset) {
                    var childArr = [];
                    elem.child.forEach(function (item) {
                        for (var i = 0; i < cateChild[item].child.length; i++) {
                            childArr.push(cateChild[item].child[i]);
                        }
                    });
                    //根据childArr去生成中间的菜单
                    mTaskList.innerHTML = renderMiddleCate(childArr);
                    rightClick();
                    fatherData = childArr;
                }
            });
        } else if (this.tagName === "A") {
            //直接根据dataset去渲染
            mTaskList.innerHTML = renderMiddleCate(cateChild[dataset].child);
            rightClick();
        }
        //渲染页面之后直接让taskType变成所有
        var taskType = document.querySelector(".task-class");
        var typeA = taskType.children;
        for(var i=0;i<typeA.length;i++){
            removeClass(typeA[i],"act");
        }
        addClass(typeA[0],"act");
    }
}

//点击中间的内容去显示最右侧的文字能容
rightClick();
function rightClick() {
    var middleChose = mTaskList.querySelectorAll(".js-middle-chose");
    for (var i = 0; i < middleChose.length; i++) {
        middleChose[i].addEventListener('click', function () {
            for (var i = 0; i < middleChose.length; i++) {
                removeClass(middleChose[i], 'act');
            }
            addClass(this, "act");
            var dataSet = this.dataset.id;
            renderRightTask(dataSet);
        });
    }
}
//选择完成状态
taskTpyeChange();
function taskTpyeChange() {
    var taskType = document.querySelector(".task-class");
    var typeA = taskType.children;
    //获取现在左侧的act项
    for (var i = 0; i < typeA.length; i++) {
        typeA[i].addEventListener('click', function () {
            //获取父级act的标签，根据不同情况去传入不同的参数
            var fatherAct = mAllTask.querySelector(".act");
            for (var i = 0; i < typeA.length; i++) {
                removeClass(typeA[i], "act");
            }
            addClass(this, "act");
            data = this.dataset.type;
            if(fatherAct.tagName == "H2"){
                mTaskList.innerHTML = renderMiddleCate("", data);
            }else if(fatherAct.tagName == "H5"){
                mTaskList.innerHTML = renderMiddleCate(fatherData, data);
            }else if(fatherAct.tagName == "A"){
                mTaskList.innerHTML = renderMiddleCate(cateChild[fatherAct.dataset.id].child,data);
            }
            //渲染之后会有日期标签还在，那么就判断li里的h4标签是否有下一个，如果没有就把这个li给block掉
            var h4s = mTaskList.getElementsByTagName("h4");
            for (var i = 0; i < h4s.length; i++) {
                if (!h4s[i].nextElementSibling) {
                    h4s[i].parentNode.style.display = "none";
                }
            }
            rightClick();
        })
    }
}

//添加一个新cate

























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
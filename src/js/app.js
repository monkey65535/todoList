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

//渲染中间内容
mTaskList.innerHTML = renderMiddleCate("");
var middleChose = mTaskList.querySelectorAll(".js-middle-chose");

//默认选中第一个li
middleChose[0].className += " act";

//获取被选中的那个li,根据这个渲染右侧任务详情
var nowChose = mTaskList.querySelector(".act");
var taskMes = document.querySelector(".m-task-msg");
//根据nowChose渲染右侧任务内容
renderRightTask(nowChose.dataset.id);

//点击最左侧分类切换
//存储fatherDate变量，作为下方taskTpyeChange函数使用
var fatherData;
leftChange();
function leftChange() {
    var leftCateArr = document.querySelectorAll(".js-all-choose");
    for (var i = 0; i < leftCateArr.length; i++) {
        leftCateArr[i].onclick = function (ev) {
            for (var i = 0; i < leftCateArr.length; i++) {
                removeClass(leftCateArr[i], "act");
            }
            addClass(this, "act");
            var dataset = this.dataset.id;
            //然后去渲染右侧的任务列表 有三种情况。
            if (this.tagName === "H2") {
                //当点击所有任务的时候，渲染所有右侧列表
                mTaskList.innerHTML = renderMiddleCate("");
                rightClick(true);
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
                        if (childArr.length != 0) {
                            rightClick(true);
                        } else {
                            rightClick();
                        }

                        fatherData = childArr;
                    }
                });
            } else if (this.tagName === "A") {
                //直接根据dataset去渲染
                mTaskList.innerHTML = renderMiddleCate(cateChild[dataset].child);
                if (cateChild[dataset].child.length != 0) {
                    rightClick(true);
                } else {
                    rightClick();
                }

            }
            //渲染页面之后直接让taskType变成所有
            var taskType = document.querySelector(".task-class");
            var typeA = taskType.children;
            for (var i = 0; i < typeA.length; i++) {
                removeClass(typeA[i], "act");
            }
            addClass(typeA[0], "act");
            ev.cancelable = true;
        }
    }
}

//点击中间的内容去显示最右侧的文字能容
rightClick(true);
function rightClick(bool) {
    var middleChose = mTaskList.querySelectorAll(".js-middle-chose");
    for (var i = 0; i < middleChose.length; i++) {
        middleChose[i].addEventListener('click', function () {
            for (var i = 0; i < middleChose.length; i++) {
                removeClass(middleChose[i], 'act');
            }
            console.log(this);
            addClass(this, "act");
            var dataSet = this.dataset.id;
            renderRightTask(dataSet);
        });
    }
    //默认显示第一个
    addClass(middleChose[0], "act");
    //根据默认值渲染最右侧内容
    if (bool) {
        var defDate = middleChose[0].dataset.id;
        renderRightTask(defDate);
    } else {
        renderRightTask();
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
            if (fatherAct.tagName == "H2") {
                mTaskList.innerHTML = renderMiddleCate("", data);
            } else if (fatherAct.tagName == "H5") {
                mTaskList.innerHTML = renderMiddleCate(fatherData, data);
            } else if (fatherAct.tagName == "A") {
                mTaskList.innerHTML = renderMiddleCate(cateChild[fatherAct.dataset.id].child, data);
            }
            //渲染之后会有日期标签还在，那么就判断li里的h4标签是否有下一个，如果没有就把这个li给block掉
            var h4s = mTaskList.getElementsByTagName("h4");
            for (var i = 0; i < h4s.length; i++) {
                if (!h4s[i].nextElementSibling) {
                    h4s[i].parentNode.style.display = "none";
                }
            }
            rightClick(true);
        })
    }
}

//添加一个新cate
var newCate = document.querySelector(".add-task-1");
newCate.addEventListener('click', addCate);
//点击newCate按钮
function addCate(ev) {
    //展开弹出层
    var popup = document.getElementById("popus");
    popup.style.display = "block";
    //渲染新节点分类
    var cateSelect = popup.getElementsByTagName("select")[0];
    var str = "";
    str += '<option>无</option>';
    category.forEach(function (elem) {
        str += '<option>' + elem.name + '</option>'
    });
    cateSelect.innerHTML = str;
    //点击确认
    var popSure = popup.querySelector(".pop-sure");
    var textInp = popup.querySelector(".pop-search-con input");
    var idInp = popup.querySelector(".pop-search-con select");
    textInp.value = "";
    var json = {};
    //点击确认
    popSure.addEventListener("click", addCateJson);
    function addCateJson() {
        var tips = popup.querySelector(".pop-tips");
        tips.innerHTML = "";
        if (/^\S+$/.test(textInp.value)) {
            var name = textInp.value;
            var fatherName = idInp.value;
            var categoryId = category[category.length - 1].id;
            var cateChildId = cateChild[cateChild.length - 1].id;
            if (fatherName == "无") {
                categoryId++;
                json = {
                    id: categoryId,
                    name: name,
                    child: []
                };
                popSure.removeEventListener("click", addCateJson);
                //把json push进数组category
                category.push(json);
                //重新渲染cate列表并添加点击事件
                allTaskLsit.innerHTML = renderLeftCate();
                leftChange();
                closeFn();
            } else {
                cateChildId++;
                json = {
                    name: name,
                    id: cateChildId,
                    child: [],
                    fatherId: fatherNum(category, "name", fatherName)
                };
                //通过这个id来把这条json的id push进它父级的child数组中，同时把这条jsonpush进cateChild中
                category.forEach(function (elem) {
                    if (elem.id == fatherNum(category, "name", fatherName)) {
                        elem.child.push(cateChildId);
                    }
                });
                popSure.removeEventListener("click", addCateJson);
                cateChild.push(json);
                //重新渲染cate列表并添加点击事件
                allTaskLsit.innerHTML = renderLeftCate();
                leftChange();
                closeFn();
            }
        } else {
            tips.innerHTML = "分类名不能为空,不能包含空格";
        }

        function fatherNum(obj, key, value) {
            var fatherId = 0;
            obj.forEach(function (elem) {
                if (elem[key] == value) {
                    fatherId = elem.id;
                }
            });
            return fatherId;
        }
    }


    //添加关闭交互
    var close = popup.querySelector(".pop-search-title span");
    var cancel = popup.querySelector(".pop-search-con .pop-cancel");
    close.addEventListener('click', closeFn);
    cancel.addEventListener("click", closeFn);
    function closeFn() {
        popup.style.display = "none";
    }

    ev.stopPropagation();
}
var newTask = document.querySelector('.add-task-2');
newTask.addEventListener('click', addTask);
//新增任务
function addTask() {
    //点击按钮的时候修改右侧内容
    var titleInp = taskMes.querySelector(".msg-head .title .task-title");
    var titleTxt = taskMes.querySelector(".msg-head .title span");
    var dataInp = taskMes.querySelector(".msg-time .time .task-time");
    var dataTxt = taskMes.querySelector(".msg-time .time span");
    var textBox = taskMes.querySelector(".mes-content .edit-mes");
    var text = taskMes.querySelector(".mes-content .work-message");
    var tips = textBox.querySelector(".tips");
    //关闭所有的txt，显示所有的inp
    var textArr = [titleTxt, dataTxt, text];
    var inpArr = [titleInp, dataInp, textBox];
    textArr.forEach(function (ele) {
        ele.style.display = "none";
    });
    inpArr.forEach(function (ele) {
        ele.style.display = "block";
        ele.value = "";
    });
    //点击取消按钮
    var reset = textBox.querySelector('.edit-reset');
    var submit = textBox.querySelector('.edit-submit');
    reset.addEventListener('click', closeFn);
    function closeFn() {
        inpArr.forEach(function (ele) {
            ele.value = "";
            ele.style.display = "none";
        });
        textArr.forEach(function (ele) {
            ele.style.display = "block";
        });
    }

    //点击确定按钮
    var taskId = toDo[toDo.length - 1].id;
    //console.log(cateAct.dataset.id);
    var json = {};
    submit.addEventListener('click', submitFn);
    function submitFn() {
        var cateAct = mAllTask.querySelector(".act");
        //fatherId用来判断添加这个子类的父级到底是谁。如果是全部分类，添加到默认列表。如果是大分类，就添加到大分类下面的第一个子分类
        var fatherId = 0;
        if (cateAct.tagName == "H2") {
            fatherId = 0;
        } else if (cateAct.tagName == "H5") {
            if (cateAct.nextElementSibling.children[0]) {
                fatherId = cateAct.nextElementSibling.children[0].dataset.id;
            } else {
                alert("请先创建子分类");
            }
        } else if (cateAct.tagName == "A") {
            fatherId = cateAct.dataset.id;
        }

        //判断填写内容是否符合格式
        if (!/^\S+$/.test(titleInp.value)) {
            tips.innerHTML = "标题不能为空,不能包含空格"
        }
        if (!/^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/.test(dataInp.value)) {
            tips.innerHTML = "日期不符合格式. 请使用yyyy-dd-mm格式"
        }
        var textInp = textBox.querySelector("textArea");
        if (/^\S+$/.test(titleInp.value) && /^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/.test(dataInp.value)) {
            taskId++;
            json = {
                id: taskId,
                name: titleInp.value,
                data: dataInp.value,
                fatherId: fatherId,
                content: textInp.value,
                finish: false
            };
            //完成这个json之后，把数据push到todo中，然后把这个id push进他的父级的child属性中。
            toDo.push(json);
            cateChild.forEach(function (ele) {
                if (ele.id == fatherId) {
                    ele.child.push(taskId);
                    if (cateAct.tagName == "H2") {
                        mTaskList.innerHTML = renderMiddleCate("");
                    } else if (cateAct.tagName == "H5") {
                        /*fatherId = cateAct.nextElementSibling.children[0].dataset.id;*/
                        var dataset = cateAct.dataset.id;
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
                            }
                        });
                    } else if (cateAct.tagName == "A") {
                        mTaskList.innerHTML = renderMiddleCate(ele.child);
                    }
                    rightClick();
                    //然后关闭
                    closeFn();
                }
            });
        }
        submit.removeEventListener('click', submitFn);
    }
}

//文本修改
(function finish() {
    var icons = taskMes.querySelectorAll(".msg-head .icon a");
    icons[0].addEventListener('click', function () {
        var taskAct = mTaskList.querySelector(".act");
        if (hasClass(taskAct, "task-over")) {
            alert("这个任务是已完成的。");
        } else {
            //获取id，修改todo中的数据
            toDo[taskAct.dataset.id].finish = true;
            addClass(taskAct, "task-over");
        }
    });
    icons[1].addEventListener('click', function () {
        var taskAct = mTaskList.querySelector(".act");
        var cateAct = mAllTask.querySelector(".act");
        //点击按钮的时候修改右侧内容
        var dataInp = taskMes.querySelector(".msg-time .time .task-time");
        var dataTxt = taskMes.querySelector(".msg-time .time span");
        var textBox = taskMes.querySelector(".mes-content .edit-mes");
        var textMse = textBox.querySelector("textArea");
        var text = taskMes.querySelector(".mes-content .work-message");
        var tips = textBox.querySelector(".tips");
        //关闭所有的txt，显示所有的inp
        var textArr = [dataTxt, text];
        var inpArr = [dataInp, textBox];
        textArr.forEach(function (ele) {
            ele.style.display = "none";
        });
        inpArr.forEach(function (ele) {
            ele.style.display = "block";
            ele.value = "";
        });
        //点击取消按钮
        var reset = textBox.querySelector('.edit-reset');
        var submit = textBox.querySelector('.edit-submit');
        reset.addEventListener('click', closeFn);
        submit.addEventListener('click', modify);
        function closeFn() {
            inpArr.forEach(function (ele) {
                ele.value = "";
                ele.style.display = "none";
            });
            textArr.forEach(function (ele) {
                ele.style.display = "block";
            });
            textMse.value = "";
        }

        function modify() {
            var actId = taskAct.dataset.id;
            if (!/^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/.test(dataInp.value)) {
                tips.innerHTML = "日期不符合格式. 请使用yyyy-dd-mm格式"
            } else {
                dataTxt.innerHTML = dataInp.value;
                text.innerHTML = textMse.value;
                //通过act的ID修改todo中的数据
                toDo[actId].data = dataInp.value;
                toDo[actId].content = textMse.value;
                closeFn();
            }
        }
    });
})();

//左侧cate的删除操作
(function delCate() {
    var cateDel = allTaskLsit.querySelectorAll(".js-task-del");
    for (var i = 0; i < cateDel.length; i++) {
        cateDel[i].addEventListener('click', deleteFn);
        function deleteFn() {
            var parent = this.parentNode;
            var grandPa = parent.parentNode;
            grandPa.removeChild(parent);
        }
    }
})();

//addClass
function addClass(obj, classN) {
    //console.log(obj);
    if (!obj) {
        return;
    }
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

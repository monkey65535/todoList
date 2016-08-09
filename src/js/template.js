/**
 * Created by Artoria on 2016/8/8 0008.
 */

function renderLeftCate() {
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
            leftCateChild += '<a data-id="' + cateChild[elem].id + '" class="js-all-choose"><i class="iconfont icon-work"></i>' + cateChild[elem].name + ' (' + cateChild[elem].child.length + ') <i class="iconfont icon-close js-task-del"></i></a>';
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
    return leftCate;
}

function renderMiddleCate(child, bool) {
    child = child || toDo;
    bool = '' || bool;
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
        //如果传入了一个undifende，那么就是所有
        if (typeof bool === "undefined") {
            midTaskList += '<li>' + '<h4>' + attr + '</h4>';
            for (var i = 0; i < dataObj[attr].length; i++) {
                if (toDo[dataObj[attr][i]].finish) {
                    midTaskList += '<a class="task-over js-middle-chose" data-id="' + toDo[dataObj[attr][i]].id + '"><i class="iconfont icon-sure"></i>' + toDo[dataObj[attr][i]].name + ' <i class="iconfont icon-close"></i></a>';
                } else {
                    midTaskList += '<a class="js-middle-chose" data-id="' + toDo[dataObj[attr][i]].id + '">' + toDo[dataObj[attr][i]].name + '<i class="iconfont icon-close"></i></a>';
                }
            }
        }
        //如果传入true，那么就是已完成
        if (bool === "true") {
            midTaskList += '<li>' + '<h4>' + attr + '</h4>';
            for (var i = 0; i < dataObj[attr].length; i++) {
                if (toDo[dataObj[attr][i]].finish) {
                    midTaskList += '<a class="task-over js-middle-chose" data-id="' + toDo[dataObj[attr][i]].id + '"><i class="iconfont icon-sure"></i>' + toDo[dataObj[attr][i]].name + ' <i class="iconfont icon-close"></i></a>';
                }
            }
        }
        //如果传入false，那么就是未完成
        if (bool === "false") {
            midTaskList += '<li>' + '<h4>' + attr + '</h4>';
            for (var i = 0; i < dataObj[attr].length; i++) {
                if (!toDo[dataObj[attr][i]].finish) {
                    midTaskList += '<a class="js-middle-chose" data-id="' + toDo[dataObj[attr][i]].id + '">' + toDo[dataObj[attr][i]].name + '<i class="iconfont icon-close"></i></a>';
                }
            }
        }
    }
    midTaskList += '</li>';
    return midTaskList;
}


//传入一个id，生成右侧内容
function renderRightTask(choseId) {
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



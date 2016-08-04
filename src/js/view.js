/**
 * Created by Artoria on 2016/8/4 0004.
 */
/*这里是页面的动作*/

//左侧列表
var mAllTask = document.querySelector('.m-all-task');
var allTaskLsit = mAllTask.querySelector(".task-list");
//渲染左侧分类菜单
allTaskLsit.innerHTML = leftCate;

//任务列表
var taskList = document.querySelector(".m-task");
var mTaskList = taskList.querySelector(".m-task-list");
mTaskList.innerHTML = middleLsit;
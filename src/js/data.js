/**
 * Created by Artoria on 2016/8/2 0002.
 */

/*数据层*/

var category;
var cateChild;
var toDo;
//左侧所有分类
category = [
    {
        id: 0,
        name: "默认分类",
        child: [0]
    },
    {
        id: 1,
        name: "CSS",
        child: [1]
    },
    {
        id: 2,
        name: "Javascript",
        child: [2,3]
    }
];
//任务的子节点
cateChild = [
    {
        name: "默认子分类",
        id: 0,
        child: [5, 6],
        fatherId: [0]
    },
    {
        name: "CSS1",
        id: 1,
        child: [0, 1, 2],
        fatherId: [1]
    },
    {
        name: "JS2",
        id: 2,
        child: [3],
        fatherId: [2]
    },
    {
        name: "JS3",
        id: 3,
        child: [4],
        fatherId: [2]
    }
];
//任务内容
toDo = [
    {
        id: 0,
        name: 'toDo-0',
        data: '2016-01-13',
        fatherId: [1],
        content: "这里是Todo-0",
        finish: true
    },
    {
        id: 1,
        name: 'toDo-1',
        data: '2016-01-15',
        fatherId: [1],
        content: "这里是Todo-1",
        finish: true
    },
    {
        id: 2,
        name: 'toDo-2',
        data: '2016-01-13',
        fatherId: [1],
        content: "这里是Todo-2",
        finish: false
    },
    {
        id: 3,
        name: 'toDo-3',
        data: '2016-01-13',
        fatherId: [2],
        content: "这里是Todo-3",
        finish: true
    },
    {
        id: 4,
        name: 'toDo-4',
        data: '2016-01-15',
        fatherId: [2],
        content: "这里是Todo-4",
        finish: false
    }
    , {
        id: 5,
        name: 'toDo-5',
        data: '2016-01-16',
        fatherId: [2],
        content: "这里是Todo-5",
        finish: false
    },
    {
        id: 6,
        name: 'toDo-76',
        data: '2016-06-16',
        fatherId: [0],
        content: "这里是Todo-6",
        finish: false
    }
];
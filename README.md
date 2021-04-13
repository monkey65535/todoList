# todoList
一个简单的个人任务管理工具
页面中所有内容使用数据进行渲染。

2i3y18231u30128312389123

DEV
fjaidfjioasdjifojas 
工具：
 - 使用sass来编写css
 - 使用原生js对功能进行实现,没有使用任何类库和框架
 - 使用gulp进行项目构建，实现对sass的实时编译和对页面的监控

兼容：IE9+


实现的功能：
最左侧为任务分类列表，支持查看所有任务或者查看某个分类下的所有任务
 - 初始时有一个`默认分类`，进入页面时默认选中`默认分类`。
 - 分类支持多层级别。
 - 分类支持**增加**分类
 - 在左侧分类最下方有添加操作，点击后弹出浮层让输入新分类的名称，新分类将会被添加到当前选中的分类下。
每一个分类名字后显示一个当前分类下的未完成任务总数量。
 * 中间列为任务列表，用于显示当前选中分类下的所有未完成任务
     - 任务列表按日期（升序或者降序，自行设定）进行聚类
     - 用不同的字体颜色或者图标来标示任务的状态，任务状态有两张：`已完成`或`未完成`。
     - 下方显示`新增任务`的按钮，点击后，右侧列会变成新增任务编辑界面。
     - 单击某个任务后，会在右侧显示该任务的详细信息。
     - 在任务列表的上方有任务筛选项，可以选择在任务列表中显示所有任务，或者只显示`已完成`或者`未完成`的任务。
 * 右侧为任务详细描述部分
     - 第一行显示任务标题，对于未完成的任务，在标题行的右侧会有`完成任务`的操作按钮及`编辑任务`的按钮。
     - 点击`完成任务`按钮时，弹出确认是否确认完成的浮层，确认后该任务完成，更新中间列任务的状态。弹出的确认浮层可以自行设计实现，也可以直接使用`confirm`。
     - 点击`编辑任务`操作后，右侧变更为编辑窗口。
 * 新增及编辑任务窗口描述
     - 有3个输入框：分别是标题输入框，完成日期输入框及内容输入框
     - 标题输入框：输入标题，为单行，需要自行设定一个标题输入限制的规则（如字数），并给出良好提示。
     - 日期输入框：单行输入框，按照要求格式输入日期，如yyyy-mm-dd
     - 内容输入框：多行输入框，自行设定一个内容输入的限制（如字数），并给出良好提示。
     - 确认按钮：确认新增或修改。
     - 取消按钮：取消新增或修改。

目前进度：基本完成

遇到的问题：
### 问题1：
数据结构的搭建
由于是有四级的菜单，如果使用一半的对象嵌套数组/对象的方式的话，会造成获取数据困难。
解决办法：
使用了三个数组，然后给每一条数据一个`child`数据，对应下一级的菜单。同时给下级菜单一个`fatherId`数据，对应这个父级数据。  这样就可以通过这些`id`去获取子菜单和父菜单

### 问题2：
中间任务菜单的格式为：`li`内`h4`标签为时间，下方`a`标签里为这个时间的项目
如果对数据进行处理，来实现这样的渲染?

解决办法：利用对象的key值不能重复的特性，先遍历一次数据，把日期最为key值，value为空数组创建一个新的对象，然后再次遍历数据，把对应时期的`child`节点push到这个key对应的空数组中。
然后把这个新的对象作为数据进行渲染。

### 问题3：
完成状态的选项卡切换。
这里的选项卡切换并不是切换下方`ul`,而是重新渲染数据。
所以需要根据左侧的选中项和选向卡状态来切换。
解决办法：
使用HTML5的`data`属性来进行存储id和选项卡key值，判断左侧分类在哪个父级分类上，来进行渲染

### 问题4:

使用 `addEventListener` 添加分类的时候会根据添加次数添加数据递增，比如第一次加了一条，第二次加了两条，第三次加了三条，依次类推

解决办法：
事件绑定会有一个重复绑定的问题，在数据拿到之后清除这一次的绑定事件，以便下一次使用
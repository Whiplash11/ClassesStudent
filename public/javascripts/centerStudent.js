function isStudentNo(str) {
    var reg=/^[0-9]{3}$/;
    return reg.test(str);
}
function ischina(str) {
    var reg=/^[\u4E00-\u9FA5]{2,4}$/;
    return reg.test(str);
}

function  fun1(){
    if(!isStudentNo(document.getElementById("studentId").value)){
        alert("学生编号是3位数字");
        document.getElementById("studentId").focus();
        return false;
    }
    if(!ischina(document.getElementById("studentName").value)) {
        alert("学生姓名必须填写中文");
        document.getElementById("studentName").focus();
        return false;
    }

}

function myFunction() {

    if (window.confirm('你确定要删除吗')) {
        return true;
    }else {
        return false;
    }
}
$(function () {

    // $("#aa").click(function () {
    //
    //     $("#my_dialog").toggle();
    // });

    $('#box').layout({
        fit : true,
    });

    $("#cc").datagrid({
        toolbar:'#ss',
        fit:true,
        // title:'学生列表',
        // iconCls:'icon-man',
        border:false,
        rownumbers:true,//行号
        onClickCell:onClickCell,
        onAfterEdit:onAfterEdit,
        pagination:true,//分页
        // pageSize:10,
        // pageNumber:1,
        // pageList:[10,20,30],
        onSelectPage:function(pageNumber,pageSize){
            $('#cc').datagrid('refresh','pageNumber='+pageNumber+'&pageSize=' +pageSize);
        },

        fitColumns:true,//自适应
        idField:'sId',
        striped:true,
        //singleSelect:true,
        checkOnSelect:false,
        selectOnCheck:true,
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('unselectRow', rowIndex);
        },

        // toolbar:
        //     [{
        //         text:'添加数据',
        //         iconCls:'icon-add',
        //         handler:function(){
        //             $("#cc").datagrid("insertRow",{
        //                 index:0,
        //                 row:{}
        //             });
        //             $("#cc").datagrid("beginEdit",0);
        //
        //         }
        //     },
        //         {
        //             text:'编辑数据',
        //             iconCls:'icon-edit',
        //             handler:function(){
        //                 var hasSelect = $("#cc").datagrid("getSelections");
        //                 if(hasSelect.length == 1){
        //                     //alert(hasSelect[0].name);
        //                     var row = hasSelect[0];
        //                     rowNumber = $("#cc").datagrid("getRowIndex",row);
        //                     $("#cc").datagrid("beginEdit",rowNumber);
        //                 }
        //             }
        //         },
        //         {
        //             text:'保存修改',
        //             iconCls:'icon-save',
        //
        //             handler:function(){
        //                 $("#cc").datagrid("endEdit",rowNumber);
        //             }
        //         }],


        columns:[[
            {field:'ck',checkbox:true},
            {field:'sId',title:'学生编号',width:100,align:'center'},
            {field: 'sName',title: '学生姓名',width:120,align:'center',editor:'text'},
            {field:'cId',title:'班级名称',width:100,align:'center',editor:'text'},
            {field:'sex',title:'性别',width:80,align:'center',editor:'text'},
            {field:'age',title:'年龄',width:100,align:'center',editor:'text'},
            {field:'operation',title:'操作',width:130,align:'center'},
        ]],
    });


    $('#cc').datagrid('clearSelections');
    $('#cc').datagrid({ loadFilter: pagerFilter }).datagrid({
        // url: '/FreshStudentMaintain/test'     //加载数据
    });


    var editIndex = undefined;
    function endEditing() {//该方法用于关闭上一个焦点的editing状态
        if (editIndex == undefined) {
            return true
        }
        if ($('#cc').datagrid('validateRow', editIndex)) {
            $('#cc').datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }
    //点击单元格事件：
    function onClickCell(index,field,value) {
        if (endEditing()) {
            if(field=="finalResult"){
                $(this).datagrid('beginEdit', index);
                var ed = $(this).datagrid('getEditor', {index:index,field:field});
                $(ed.target).focus();
            }
            editIndex = index;
        }
        $('#cc').datagrid('onClickRow')
    }
//单元格失去焦点执行的方法
    function onAfterEdit(index, row, changes) {
        var updated = $('#tt').datagrid('getChanges', 'updated');
        if (updated.length < 1) {
            editRow = undefined;
            $('#cc').datagrid('unselectAll');
            return;
        } else {
            // 传值
            submitForm(index, row, changes);
        }
    }

// 分页数据的操作
    function pagerFilter(data) {
        if (typeof data.length == 'number' && typeof data.splice == 'function') {   // is array
            data = {
                total: data.length,
                rows: data
            }
        }
        var dg = $(this);
        var opts = dg.datagrid('options');
        var pager = dg.datagrid('getPager');
        pager.pagination({
            onSelectPage: function (pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                pager.pagination('refresh', {
                    pageNumber: pageNum,
                    pageSize: pageSize
                });
                dg.datagrid('loadData', data);
            }
        });
        if (!data.originalRows) {
            data.originalRows = (data.rows);
        }
        var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
        var end = start + parseInt(opts.pageSize);
        data.rows = (data.originalRows.slice(start, end));
        return data;
    }


    //弹出层
    $('#hovertreewindow').dialog({
        title:'添加学生',
        iconCls:'icon-man',
        resizable:true, //调整窗口大小
        draggable:true, //拖拽操作
        minimizable:true,
        closable:true, //显示关闭按钮
    })
    $('#hoverstreewindow').dialog({
        title:'编辑信息',
        iconCls:'icon-edit',
        resizable:true, //调整窗口大小
        draggable:true, //拖拽操作
        minimizable:true,
        closable:true, //显示关闭按钮
    })
    $('#grade').dialog({
        title:'成绩信息',
        iconCls:'icon-edit',
        resizable:true, //调整窗口大小
        draggable:true, //拖拽操作
        minimizable:true,
        closable:true, //显示关闭按钮
    })
    $('#aa').linkbutton({
        iconCls:'icon-add',
        plain:true,
    })

    // var row = $('#tt').datagrid('getSelected');
    // if (row){
    //     alert('Item ID:'+row.sId+"\nPrice:"+row.listprice);
    // }




    parent.$('#ll').panel('refresh',url)
})

var row = $('#grid_line').datagrid('getSelected');
if (row) {
    var rowIndex = $('#grid_line').datagrid('getRowIndex', row);
    $('#grid_line').datagrid('deleteRow', rowIndex);
}
function addTab(title, url){
    if ($('#tab').tabs('exists', title)){
        $('#tab').tabs('select', title);
    } else {
        var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
        $('#tab').tabs('add',{
            title:title,
            content:content,
            closable:true
        });
    }
}



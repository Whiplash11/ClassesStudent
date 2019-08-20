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
        // columns:[[
        //     {field:'ck',checkbox:true},
        //     {field:'sId',title:'学生编号',width:100,align:'center'},
        //     {field: 'sName',title: '学生姓名',width:120,align:'center',editor:'text'},
        //     {field:'cId',title:'班级编号',width:100,align:'center'},
        //     {field:'grade',title:'成绩',width:100,align:'center'},
        //     {field:'operation',title:'操作',width:130,align:'center'},
        //     {field:'sex',title:'性别',width:80,align:'center'},
        //     {field:'age',title:'年龄',width:100,align:'center'},
        // ]],

    });
    $('#cc').datagrid('clearSelections');
    $('#cc').datagrid({ loadFilter: pagerFilter }).datagrid({
        // url: '/FreshStudentMaintain/test'     //加载数据
    });

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
    if ($('#tt').tabs('exists', title)){
        $('#tt').tabs('select', title);
    } else {
        var content = '<iframe scrolling="auto" frameborder="0"  src="'/Manager/centerStudent.html/'" style="width:100%;height:100%;"></iframe>';
        $('#tt').tabs('add',{
            title:title,
            content:content,
            closable:true
        });
    }
}





$(function () {
    // var treeData = [{
    //     text : "管理",
    //     children : [{
    //         text : "单一商品价格库存",
    //         attributes : {
    //
    //             url : '<iframe width="100%" height="100%" frameborder="0"  src="jsp/queryPriceStock.jsp" style="width:100%;height:100%;margin:0px 0px;"></iframe>'
    //         }
    //     }, {
    //         text : "单一商品价格库存2",
    //         attributes : {
    //             url : ''
    //
    //         }
    //     }
    //     ]
    // }];


    // $('#tree').tree({
    //     lines : true,
    //     data : treeData,
    //     lines : true,
    //     onClick : function (node) {
    //         if (node.attributes) {
    //             Open(node.text, node.attributes.url);
    //         }
    //     },
    //
    //     onLoadSuccess : function (node,data) {
    //         if (data){
    //             $(data).each(function (index,value) {
    //                 if (this.state == 'closed'){
    //                     $('#tt').tree('expendAll')
    //                 }
    //             })
    //         }
    //     },
    //     onClick : function (node) {
    //         if (node.url){
    //             $('#tabs').tabs('add',{
    //                 title : node.text,
    //
    //             })
    //         }
    //     }
    // })
    //
    // function Open(text, url) {
    //     if ($("#tabs").tabs('exists', text)) {
    //         $('#tabs').tabs('select', text);
    //     } else {
    //         $('#tabs').tabs('add', {
    //             title : text,
    //             closable : true,
    //             content : url
    //         });
    //     }
    // }


    $('#tabs').tabs({
        border:false,
        plain:true,

    })
})













// window.onload = function () {
//     var btn = document.getElementById("bt");
//     btn.onclick = function () {
//         var list = document.getElementsByName( "Message");
//         for (var i = 0; i < list.length; i++) {
//             alert(list[i].innerHTML);
//         }
//     }
// };
// window.onload = function () {
//     $(document).ready(function(){
//         $("#aa").click(function(){
//             $("#my_dialog").toggle();
//         });
//     });
// }



//     function openme(){
//         document.getElementById('div1').style.display='block';
//         document.getElementById('div2').style.display='block';
//     }
//     function closeme(){
//         document.getElementById('div1').style.display='none';
//         document.getElementById('div2').style.display='none';
//     }
//     function logo_in(){alert()
// //验证
// //转向...
// //myform.action=""
// //myform.submit()
//         closeme();
//     }

// function search() {
//     $('#ss').datagrid('load',{
//         sId:$('#sId').val(),
//     })
// }

// $.extend($.fn.datagrid.methods, {
//     editCell: function(jq,param){
//          console.log(param);// {index: 1, field: "msg"}index 行 field，点击的列
//         return jq.each(function(){
//             var opts = $(this).datagrid('options');// 表信息
//             var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
//              console.log(fields);// ["id", "name", "num", "msg"] 列字段
//             for(var i=0; i<fields.length; i++){
//                 var col = $(this).datagrid('getColumnOption', fields[i]);// 列信息
//                 col.editor1 = col.editor;
//                 if (fields[i] != param.field){
//                     col.editor = null;
//                 }
//             }
//             $(this).datagrid('beginEdit', param.index);
//             for(var i=0; i<fields.length; i++){
//                 var col = $(this).datagrid('getColumnOption', fields[i]);
//                 col.editor = col.editor1;
//             }
//         });
//     }
// });
//
// var editIndex = undefined;
// function endEditing(obj){
//     if (editIndex == undefined){return true}
//     if ($(obj).datagrid('validateRow', editIndex)){
//         $(obj).datagrid('endEdit', editIndex);
//         editIndex = undefined;
//         return true;
//     } else {
//         return false;
//     }
// }
// function onClickCell(index, field){
//     if (endEditing(this)){
//         var obj = $(this);
//         $(this).datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
//         editIndex = index;
//
//         //获取编辑行
//         var editors = $(this).datagrid('getEditors', index);
//         var targetEditor = editors[0];
//         //绑定change事件并取消可编辑状态
//         if(targetEditor != undefined)
//         {
//             targetEditor.target.textbox({
//
//                 onChange : function(){
//                     obj.datagrid('selectRow', index).datagrid('endEdit', index);
//                     editIndex = undefined;
//                 }
//             })
//         }
//     }
// }
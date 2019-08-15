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
        title:'学生列表',
        iconCls:'icon-man',
        rownumbers:true,//行号
        pagination:true,//分页
        pageSize:10,
        pageNumber:1,
        pageList:[10,20,30],
        onSelectPage:function(pageNumber,pageSize){
            $('#cc').datagrid('refresh','pageNumber='+pageNumber+'&pageSize=' +pageSize);
        },
        fitColumns:true,//自适应
        idField:'sId',
        striped:true,
        singleSelect:true,
        checkOnSelect:true,
        columns:[[
            {field:'ck',checkbox:true},
            {field:'sId',title:'学生编号',width:100,align:'center'},
            {field: 'sName',title: '学生姓名',width:120,align:'center'},
            {field:'cId',title:'班级编号',width:100,align:'center'},
            {field:'operation',title:'操作',width:130,align:'center'},
            {field:'sex',title:'性别',width:80,align:'center'},
            {field:'age',title:'年龄',width:100,align:'center'},
        ]],

    });
    $("#cc").pagination()
    //弹出层
    $('#hovertreewindow').dialog({
        title:'添加学生',
        iconCls:'icon-man',
        resizable:true, //调整窗口大小
        draggable:true, //拖拽操作
        minimizable:true,
        closable:true, //显示关闭按钮
    })

    $('#aa').linkbutton({
        iconCls:'icon-add',
        plain:true,
    })

    var row = $('#tt').datagrid('getSelected');
    if (row){
        alert('Item ID:'+row.itemid+"\nPrice:"+row.listprice);
    }

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
//
//         }
//
//
//     }
// }
$(function () {
    var rowNumber = 0;
    $("#cc").datagrid({
        fit:true,
        rownumbers:true,
        pagination:true,
        fitColumns:true,
        border:false,
        idField:'sid',

        onSelectPage:function(pageNumber,pageSize){
            $('#cc').datagrid('refresh','pageNumber='+pageNumber+'&pageSize=' +pageSize);
        },
        columns:[[
            {field:'ck',checkbox:true},
            {field:'sid',title:'学号',width:120,align:'center',editor:'text'},
            {field: 'Chinese',title: '语文',width:120,align:'center',editor:'text'},
            {field:'english',title:'英语',width:120,align:'center',editor:'text'},
            {field:'math',title:'数学',width:120,align:'center',editor:'text'},
            {field:'operation',title:'操作',width:150,align:'center'},
        ]],
        toolbar:'#ss',
        striped:true,
        checkOnSelect:false,
        selectOncheck:true,

        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('unselectRow', rowIndex);
        },

        rownumbers:true,


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

        pagination:true,
        onAfterEdit:function(index,data,changes){
            /*  alert(index);
             console.info(data); */
            $.post(

            );
        }
    });

    $('#editor').dialog({
        title:'编辑信息',
        iconCls:'icon-edit',
        resizable:true, //调整窗口大小
        draggable:true, //拖拽操作
        minimizable:true,
        closable:true, //显示关闭按钮
    })

    // (function(){
    //     $('input[type="button"]').on('click', function(){
    //         var $this = $(this),
    //             edit_status = $this.attr('edit_status'),
    //             status_value = edit_status && 1 == edit_status ? 0 : 1,
    //             $td_arr = $this.parent().prevAll('td');
    //         $this.val(1 == status_value ? 'complete' : 'edit').attr('edit_status', status_value);
    //         $.each($td_arr, function(){
    //             var $td = $(this);
    //             if(1 == status_value) {
    //                 $td.html('<input type="text" value="'+$td.html()+'">');
    //             } else if(0 == status_value){
    //                 $td.html($td.find('input[type=text]').val());
    //             }
    //         });
    //     });
    // })();
});

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

$('#hovertreewindow').dialog({
    title:'添加班级',
    iconCls:'icon-search',
    resizable:true, //调整窗口大小
    draggable:true, //拖拽操作
    minimizable:true,
    closable:true, //显示关闭按钮
})


//页面加载完成就渲染表格




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






// var editIndex = undefined;
// function endEditing(){
//     if (editIndex == undefined){return true}
//     if ($('#dg').datagrid('validateRow', editIndex)){
//         $('#dg').datagrid('endEdit', editIndex);
//         editIndex = undefined;
//         return true;
//     } else {
//         return false;
//     }
// }
// function onClickCell(index, field){
//     if (editIndex != index){
//         if (endEditing()){
//             $('#dg').datagrid('selectRow', index)
//                 .datagrid('beginEdit', index);
//             var ed = $('#dg').datagrid('getEditor', {index:index,field:field});
//             if (ed){
//                 ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
//             }
//             editIndex = index;
//         } else {
//             setTimeout(function(){
//                 $('#dg').datagrid('selectRow', editIndex);
//             },0);
//         }
//     }
// }
// function onEndEdit(index, row){
//     var ed = $(this).datagrid('getEditor', {
//         index: index,
//         field: 'sid'
//     });
//     row.productname = $(ed.target).combobox('getText');
// }
// function append(){
//     if (endEditing()){
//         $('#dg').datagrid('appendRow',{status:'P'});
//         editIndex = $('#dg').datagrid('getRows').length-1;
//         $('#dg').datagrid('selectRow', editIndex)
//             .datagrid('beginEdit', editIndex);
//     }
// }
// function removeit(){
//     if (editIndex == undefined){return}
//     $('#dg').datagrid('cancelEdit', editIndex)
//         .datagrid('deleteRow', editIndex);
//     editIndex = undefined;
// }
// function accept(){
//     if (endEditing()){
//         $('#dg').datagrid('acceptChanges');
//     }
// }
// function reject(){
//     $('#dg').datagrid('rejectChanges');
//     editIndex = undefined;
// }
// function getChanges(){
//     var rows = $('#dg').datagrid('getChanges');
//     alert(rows.length+' rows are changed!');
// }
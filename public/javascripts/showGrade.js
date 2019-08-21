$(function () {
    var rowNumber = 0;
    $("#cc").datagrid({
        fit:true,
        // title:'班级列表',
        // iconCls:'icon-search',
        rownumbers:true,
        pagination:true,
        fitColumns:true,
        border:false,
        idField:'classId',

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
        //singleSelect:true,
        onClickRow: function (rowIndex, rowData) {
            $(this).datagrid('unselectRow', rowIndex);
        },

        rownumbers:true,
        singleSelect:true,

        toolbar:
            [{
                text:'添加数据',
                iconCls:'icon-add',
                handler:function(){
                    $("#cc").datagrid("insertRow",{
                        index:0,
                        row:{}
                    });
                    $("#cc").datagrid("beginEdit",0);

                }
            },
                {
                    text:'编辑数据',
                    iconCls:'icon-edit',
                    handler:function(){
                        var hasSelect = $("#cc").datagrid("getSelections");
                        if(hasSelect.length == 1){
                            //alert(hasSelect[0].name);
                            var row = hasSelect[0];
                            rowNumber = $("#cc").datagrid("getRowIndex",row);
                            $("#cc").datagrid("beginEdit",rowNumber);
                        }


                    }
                },
                {
                    text:'保存修改',
                    iconCls:'icon-save',
                    handler:function(){
                        $("#cc").datagrid("endEdit",rowNumber);
                    }
                }],

        pagination:true,
        onAfterEdit:function(index,data,changes){
            /*  alert(index);
             console.info(data); */
            $.post(

            );
        }
    });
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
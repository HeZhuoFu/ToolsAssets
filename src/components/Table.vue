<!-- 表格组件      show-summary-->
<template>
  <div>
    <el-table
      ref="table"
      v-loading="options.loading"
      :data="dataSource"
      highlight-current-row
      :max-height="options.maxHeight"
      stripe
      border
      :height="this.tableHeight"
      size="mini"
      header-row-class-name="table-header-row"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDbClick"
      @select="handleSelect"
      @sort-change="sortchange"
      :row-class-name="tableRowClassName"
    >
      <!--selection选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width:50px" align="center"></el-table-column>

      <!--序号-->
      <el-table-column v-if="options.index" label="序号" type="index" width="50" align="center"></el-table-column>

      <!--数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :sortable="column.sortable"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :align="column.align || 'center'"
          :width="column.width"
          :fixed="column.fixed"
          :show-overflow-tooltip="showOverflowTooltip"
        >
          <template slot-scope="scope">
            
            <template v-if="!column.render">{{scope.row[column.prop]}}</template>

            <!-- render -->
            <template v-else>
              <RenderDom :row="scope.row" :index="index" :render="column.render"/>
            </template>

            <!-- render button -->
            <template v-if="column.button">
              <template v-for="(btn, i) in column.group">
                <el-button
                  :key="i"
                  :type="btn.type"
                  :size="btn.size || 'mini'"
                  :icon="btn.icon"
                  :disabled="btn.disabled"
                  :plain="btn.plain"
                  @click.stop="btn.onClick(scope.row, scope.$index)"
                >{{btn.name}}</el-button>
              </template>
            </template>

            <!-- slot 你可以其他常用项 -->
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="pagination"
      :total="pagination.total"
      :page-sizes="[20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      style="margin-top: 20px;text-align: right"
    ></el-pagination>
  </div>
</template>

<style>
.el-table .warning-row {
  color: blue;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
export default {
  data() {
    return {
      tableHeight: 50,
      multipleSelection: "",
      showOverflowTooltip: true
    };
  },
  components: {
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render(createElement, ctx) {
        const { row, index } = ctx.props;
        return ctx.props.render(row, index);
      }
    }
  },
  props: {
    dataSource: Array,
    options: Object, // 表格参数控制 maxHeight、stripe 等等...
    columns: Array,
    fetch: Function, // 获取数据的函数
    pagination: Object // 分页，不传则不显示
  },
  mounted: function() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight -
        this.$refs.table.$el.offsetTop -
        250 -
        this.options.subheight;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 250;
      };
    });

    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },
  created() {
    // 传入的options覆盖默认设置
    this.$parent.options = Object.assign(
      {
        maxHeight: 800,
        stripe: true, // 是否为斑马纹
        border: true
      },
      this.options
    );

    this.options.initTable && this.fetch();
  },
  methods: {
    // 选中特定行
    toggleSelection(rows) {
      this.$nextTick(function() {
        if (rows) {
          rows.forEach(row => {
            this.$refs.table.toggleRowSelection(row);
          });
        }
      });
    },
    handleSizeChange(size) {
      // 切换每页显示的数量
      this.pagination.pageSize = size;
      this.fetch();
    },
    handleIndexChange(current) {
      // 切换页码
      this.pagination.pageIndex = current;
      this.fetch();
    },
    handleSelect(selection, row) {
      this.$emit("handleSelect", selection, row);
    },
    rowclass(selection, row) {
      this.$emit("rowclass", selection, row);
    },
    // 单击行
    handleRowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    // 双击行
    handleRowDbClick(row, event, column) {
      this.$emit("row-dblclick", row, event, column);
    },
    // 表格样式渲染
    tableRowClassName({ row, rowIndex }) {
      if (row.docstatus === 100) {
        return "warning-row";
      }
      return "";
    },
    // 监听排序动作
    sortchange({ column, prop, order }) {
      this.$emit("sortchange", { column, prop, order });
    }
  }
};
</script>

<style>
.el-table__header th,
.el-table__header tr {
  background-color: #eaeaea;
  font-size: 12px;
  font-weight: bold;
  color: black;
  border: 1px solid #dce2ef;
}
/* .el-table td,
.el-table th {
  color: black;
} */
.el-table {
  background-color: #fafafa;
  font-family: "宋体";
  color: #000000;
}
/* .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #daf8fd !important;
} */
.current-row > td {
  background: rgba(0, 158, 250, 0.219) !important;
}
</style>
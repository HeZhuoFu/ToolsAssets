<!-- 表格组件      show-summary-->
<template>
  <div style="padding-left:10px;padding-right:10px;">
    <vxe-table
      ref="table"
      border
      :show-footer="showfooter"
      :footer-method="footerMethod"
      highlight-current-row
      resizable
      :data.sync="dataSource"
      :height="height || this.tableHeight"
      :loading="options.loading"
      :max-height="options.maxHeight"
      :row-class-name="rowClassName"
      :header-cell-class-name="headerCellClassName"
      @header-cell-click="headerCellClickEvent"
      @header-cell-dblclick="headerCellDBLClickEvent"
      @cell-click="cellClickEvent"
      @cell-dblclick="cellDBLClickEvent"
      @cell-mouseenter="cellMouseenterEvent"
      @cell-mouseleave="cellMouseleaveEvent"
    >
      <vxe-table-column v-if="showindex || false" type="index" width="50"></vxe-table-column>
      <template v-for="(column, index) in tableColumn">
        <vxe-table-column
          show-header-overflow
          show-overflow
          :sortable="column.sortable || true"
          :key="index"
          :prop="column.prop"
          :type="column.type"
          :label="column.label"
          :align="column.align || 'center'"
          :width="column.width"
          :formatter="column.formatter"
          :slots="column.slots"
          :fixed="column.fixed"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">{{scope.row[column.prop]}}</template>

            <!-- render -->
            <template v-else>
              <RenderDom :row="scope.row" :index="index" :render="column.render" />
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
        </vxe-table-column>
      </template>
    </vxe-table>

    <!-- 分页组件 -->
    <vxe-pager
      v-if="pagination"
      :current-page="pagination.pageIndex"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      style="text-align: right;color:black;height:50px;"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></vxe-pager>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      tableHeight: 50 //高度
      // multipleSelection: "",
      // showOverflowTooltip: true
    };
  },

  // 计算属性
  components: {
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      render(createElement, ctx) {
        const { row, index } = ctx.props;
        return ctx.props.render(row, index);
      }
    }
  },

  // 传递参数
  props: {
    dataSource: Array, // 表格数据（必传）
    tableColumn: Array, // 表格字段（必传）
    fetch: Function, // 获取数据的函数
    pagination: Object, // 分页，不传则不显示
    showindex: Boolean,
    showfooter: Boolean,
    footerMethod: Function,
    height: Number,
    options: Object // 表格参数控制 maxHeight、stripe 等等...
  },

  // 装载完成
  mounted: function() {
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度

    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 140;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 140;
      };
    });
  },

  // 创建完成
  created() {
    // 传入的options覆盖默认设置
    this.$parent.options = Object.assign(
      {
        maxHeight: 300,
        stripe: true, // 是否为斑马纹
        border: true
      },
      this.options
    );

    this.options.initTable && this.fetch();
  },

  // 操作方法
  methods: {
    // 行颜色样式
    rowClassName({ row, rowIndex }) {
      if (row.docstatus >= 50) {
         return "row-yellow";
      } else {
        return "row-comm";
      }
    },
    
    // 表头样式
    headerCellClassName({ column, columnIndex }) {
      return "col-style";
    },
    // 分页
    searchEvent() {
      this.pagination.pageIndex = 1;
      this.fetch();
    },

    // 页码更改
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.fetch();
    },

    // 页数更改
    handleCurrentChange(currentPage) {
      this.pagination.pageIndex = currentPage;
      this.fetch();
    },

    // 表头单元格点击
    headerCellClickEvent({ row, rowIndex, column, columnIndex }, event) {
      this.$emit(
        "headerCellClickEvent",
        { row, rowIndex, column, columnIndex },
        event
      );
    },

    // 表头单元格双击
    headerCellDBLClickEvent({ row, rowIndex, column, columnIndex }, event) {
      this.$emit(
        "headerCellDBLClickEvent",
        { row, rowIndex, column, columnIndex },
        event
      );
    },

    // 单元格点击
    cellClickEvent({ row, rowIndex, column, columnIndex }, event) {
      this.$emit(
        "cellClickEvent",
        { row, rowIndex, column, columnIndex },
        event
      );
    },

    // 单元格双击
    cellDBLClickEvent({ row, rowIndex, column, columnIndex }, event) {
      this.$emit(
        "cellDBLClickEvent",
        { row, rowIndex, column, columnIndex },
        event
      );
    },

    // 鼠标进入单元格
    cellMouseenterEvent({ row, rowIndex, column, columnIndex }, event) {
      this.$emit(
        "cellMouseenterEvent",
        { row, rowIndex, column, columnIndex },
        event
      );
    },

    // 鼠标离开单元格
    cellMouseleaveEvent({ row, rowIndex, column, columnIndex }, event) {
      this.$emit(
        "cellMouseleaveEvent",
        { row, rowIndex, column, columnIndex },
        event
      );
    },

    // 全选数据
    setAllSelection() {
      this.$refs.table.setAllSelection(true);
    },

    // 取消全选
    clearSelection() {
      this.$refs.table.clearSelection();
    },

    // 获取已经选中的数据
    getSelectRecords() {
      return this.$refs.table.getSelectRecords();
    },

    // 导出csv文件
    exportCsvEvent() {
      this.$refs.table.exportCsv();
    }
  }
};
</script>

<style>
</style>
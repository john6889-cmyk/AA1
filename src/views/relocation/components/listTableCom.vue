<template>
  <div class="listTableCom">
    <el-table
      ref="multipleTable"
      :data="deviceAllData.list"
      tooltip-effect="dark"
      style="width: 100%"
      class="infoTable"
      :cell-style="cellStyle"
      :header-cell-style="getRowClass"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        label="序号"
        width="70"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{
          (deviceAllData.pageNum - 1) * deviceAllData.pageSize +
            scope.$index +
            1
        }}</template>
      </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="chName" label="大类"> </el-table-column>
      <el-table-column prop="vendor" label="品牌"> </el-table-column>
      <el-table-column prop="campsite" label="所在营区"> </el-table-column>
      <el-table-column prop="district" label="所在位置"> </el-table-column>
      <!-- <el-table-column prop="name" label="状态"> </el-table-column> -->
      <!-- <el-table-column prop="name" label="参数"> </el-table-column> -->
      <!-- <el-table-column label="操作" width="260px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            plain
            @click="onUpdateTag(scope.row.id)"
            >详情</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="deviceAllData.pageNum"
        :page-sizes="[15, 20, 25, 30]"
        :page-size="deviceAllData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="deviceAllData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deviceAllData"],
  data() {
    return {
      tableData: [
        {
          name: "test"
        },
        {
          name: "test"
        },
        {
          name: "test"
        },
        {
          name: "test"
        }
      ],
      multipleSelection: [],
      currentPage4: 4,
      loading: false,
      addrIds: []
    };
  },
  methods: {
    // 实现单元格文本居中
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center;padding:8px 0 8px 0";
    },
    //设置表格第一行的颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgb(235, 238, 245);rgb(144, 147, 153);text-align:center;padding: 5px 0";
      } else {
        return "";
      }
    },
    onUpdateTag() {},
    handleSizeChange(val) {
      this.$emit("onPageSizeChange", val);
    },
    handleCurrentChange(val) {
      // console.log(val, "页数");
      this.$emit("onPageNumChange", val);
    },
    handleSelectionChange(val) {
      // console.log(val, "++++++++++++++++");
      this.multipleSelection = val;
      let newArray = this.multipleSelection.map(item => {
        return item.resId;
      });
      this.addrIds = newArray;
      this.$emit("selectedChange", this.addrIds);
    },
    openLoading() {
      this.loading = true;
    },
    closeLoading() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.listTableCom {
  height: 100%;
  width: 100%;
  .block {
    margin-top: 20px;
  }
}
</style>
<style lang="scss">
.listTableCom {
  .infoTable {
    height: calc(100% - 50px);
    .el-table__header-wrapper {
      height: 34px;
    }
    .el-table__body-wrapper {
      height: calc(100% - 34px);
      overflow-y: auto;
    }
  }
  .block {
    height: 30px;
  }
}
</style>

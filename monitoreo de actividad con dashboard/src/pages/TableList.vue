<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns">
            </paper-table>
          </div>
        </card>
      </div>


    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["date", "steps"];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "STEPS IN THE LAST 7 DAYS",
        subTitle: "",
        columns: [...tableColumns],
        data: this.$store.state.exampleArray
      },
    };
  }
};
</script>
<style>
</style>

<template>
  <v-container>
    <div class="chat">
      <v-card class="pa-2" outlined>
        <div class="justify-center font-weight-bold ma-2">Chat Window</div>
        <v-card-text class="ma-0 pa-0">
          <v-container>
            <v-row
              v-for="item in paginatedList"
              :key="item.id"
              style="cursor: default"
              ><b>{{ item.category }}:&nbsp;</b>{{ item.question }}
            </v-row>
            <v-form @submit.prevent="sendMessage">
              <v-text-field
                type="text"
                v-model="message"
                autocomplete="off"
                placeholder="Say something"
                append-outer-icon="mdi-send"
                @click:append-outer="sendMessage"
              ></v-text-field>
            </v-form>
            <v-pagination
              :length="maxPage"
              :value="pageNumber"
              v-model="pageNumber"
              class="pt-3 elevation-0"
            >
            </v-pagination>
          </v-container>
        </v-card-text>
      </v-card>
    </div>
    <br />
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "chat",
  components: {},
  data: () => ({
    message: null,
    faq: [
      {
        id: 1,
        category: "Fake User",
        link: "",
        question: "Fake Chat Message (Will be functional soon)",
      },
    ],
    superFAQ: [],
    pageNumber: 1,
    pageSize: 7,
    maxPage: null,
    imageLinks: {},
  }),
  methods: {
    sendMessage() {
      this.message = "";
    },
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.faq.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.question.toLowerCase().includes(v) +
                item.category.toLowerCase().includes(v)
            );
        });
      } else {
        return this.faq;
      }
    },
    paginatedList() {
      const start = (this.pageNumber - 1) * this.pageSize;
      const end = start + this.pageSize;
      let current = start;
      let outputArr = [];
      while (current < end && this.resultQuery[end - (end - current)]) {
        outputArr.push(this.resultQuery[end - (end - current)]);
        current++;
      }
      if (outputArr.length === 0) {
        return this.resultQuery;
      }
      return outputArr;
    },
  },
  watch: {
    paginatedList: {
      deep: true,
      handler: function () {
        this.maxPage = Math.ceil(this.resultQuery.length / this.pageSize);
        if (this.maxPage < this.pageNumber && this.maxPage > 0) {
          this.pageNumber = this.maxPage;
        }
      },
    },
  },
  created() {
    var i = 0;
    for (i = 0; i < 150; i++) {
      this.superFAQ.push({
        id: i,
        link: "",
        category: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 5),
        question: (
          Math.random().toString(36).replace(/\./g, "") +
          Math.random().toString(36).replace(/\./g, "") +
          Math.random().toString(36).replace(/\./g, "")
        ).replace(/[^a-z]+/g, " "),
      });
      this.maxPage = Math.ceil(this.resultQuery.length / this.pageSize);
    }
  },
};
</script>
<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}
.pagination a.active {
  background-color: #4CAF50;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>
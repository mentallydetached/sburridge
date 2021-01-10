<template>
  <v-container>
    <div class="faq">
      <v-card outlined>
        <v-card-text>
          <br />What are we even doing here? What is life? Who am I? Let's
          explore some commonly asked questions and see what we find out.
          <br />
          <br />
        </v-card-text>
      </v-card>
      <br />

      <v-card class="pa-2" outlined>
        <div class="justify-center font-weight-bold ma-2">
          Frequently Asked Questions
        </div>
        <v-card-text class="ma-0 pa-0">
          <v-text-field
            class=""
            type="text"
            v-model="searchQuery"
            placeholder="Search"
          ></v-text-field>
          <v-container>
            <v-row>
              <v-col cols="4" class="text-left">Category</v-col>
              <v-col cols="8" class="text-left">Question</v-col>
            </v-row>
            <v-row
              v-for="item in paginatedList"
              :key="item.id"
              @click="NavigatePage(item.link)"
              class="hyperlink"
              v-ripple
            >
              <v-col cols="12" class="ma-0 pa-0">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="4" class="text-left">{{ item.category }}</v-col>
              <v-col cols="8" class="text-left">{{ item.question }}</v-col>
            </v-row>
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
  name: "faq",
  components: {},
  data: () => ({
    searchQuery: null,
    faq: [
      {
        id: 1,
        category: "Music",
        link: "",
        question: "Can I upload my own track?",
      },
      {
        id: 2,
        category: "Music",
        link: "",
        question: "Does the music need to be original content?",
      },
      {
        id: 3,
        category: "Music",
        link: "",
        question: "Can my content be monetized?",
      },
      {
        id: 4,
        category: "Music",
        link: "",
        question: "What rights am I granted for my content?",
      },
      {
        id: 5,
        category: "Music",
        link: "",
        question: "Can I remove my track?",
      },
      {
        id: 6,
        category: "Chat",
        link: "",
        question: "How long are the chat records retained?",
      },
      {
        id: 7,
        category: "Chat",
        link: "",
        question: "How do I report or delete offensive material?",
      },
      {
        id: 8,
        category: "Chat",
        link: "",
        question: "Can I search the chat?",
      },
      {
        id: 9,
        category: "Chat",
        link: "",
        question: "Are there multiple chat rooms?",
      },
      {
        id: 10,
        category: "Website",
        link: "",
        question: "Why does any of this exist?",
      },
    ],
    superFAQ: [],
    pageNumber: 1,
    pageSize: 7,
    maxPage: null,
    imageLinks: {},
  }),
  methods: {
    NavigatePage(link) {
      window.location.href = link;
    },
    randImg(num) {
      return "https://picsum.photos/700/400?grayscale&random=" + num;
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
    for (i = 0; i < 1000; i++) {
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
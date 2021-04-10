<template>
  <div class="homecontent">
    <p class="title">Welcome to my little playground</p>
    <div>
      <p class="font-weight-thin">
        Honestly, if you've made it all the way here on the internet... I feel
        you must be pretty bored. I don't think this site will update a whole
        lot as it's mostly going to be used for me to show off random projects
        I'm working on or test out new tech.
      </p>
    </div>
    <p class="title">Latest Updates</p>
    <v-row>
      <v-col
        cols="12"
        style="min-height: 100px"
        v-for="update in latestUpdates"
        v-bind:key="update.body"
      >
        <v-card outlined height="100%">
          <v-card-text class="fill-height ma-0 pa-0">
            <h4>{{ update.title }}</h4>
            <v-divider></v-divider>
            <p class="verticalalignedtext pl-3 pr-3">
              {{ update.body }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HomeContent",
  data: () => ({
    latestUpdates: [
      {
        title: "Added ability to like songs",
        body:
          "Now we can easily pick out the best tracks and build out your library.",
      },
      {
        title: "Updated theme and added authentication",
        body:
          "Now we'll be able to start having fun with user-generated content. Will be adding more stuff soon.",
      },
    ],
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.vertalignedtext {
  height: 75%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>

<template>
  <v-container>
    <div class="home">
      <v-card outlined>
        <v-card-text class="cursive">
          <br />
          {{ quote }}
          <br />
          <br />
        </v-card-text>
      </v-card>
      <br />
      <v-img :src="imageLinks.parallaxBackground" fluid aspect-ratio="7">
        <v-container>
          <v-card outlined class="ma-3">
            <v-card-text>
              <HomeContent />
            </v-card-text>
          </v-card>
        </v-container>
      </v-img>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HomeContent from "@/components/HomeContent.vue";

export default {
  name: "home",
  components: {
    HomeContent,
  },
  data: () => ({
    imageLinks: {
      parallaxBackground: require("@/assets/blurrybackgroundsquare.png"),
    },
    quoteList: [
      "They all laughed when I said I was going to be a comedian... Well they aren't laughing now!",
      "I'm having a quarantine party this weekend and none of you are invited.",
      "Moths are always looking on the bright side.",
      "A woodpecker just called me paranoid in Morse code.",
      "I went to the Fibonacci Convention this year, and it was just as good as the last two put together!",
      "I started a yacht making business in my attic; sails are going through the roof.",
      "They took my mood ring, and I don't know how to feel about that.",
      "I had a fear of speed bumps, but I'm slowly getting over them.",
      "Words cannot express how limited my vocabulary is.",
      "Some rude kids on the bus just texted each other “I think that old creep is looking at our phones”.",
      "Every pizza is a personal pizza, if you believe in yourself.",
      "As I put the car in reverse, I thought “This takes me back”.",
      "Have you ever noticed the irony behind “hyphenated” and “non-hyphenated”?",
      "I ordered a chicken and an egg from Amazon. I’ll let you know.",
      "My son thinks he’s so smart now that he’s learned how to recite pi, and now I’ll never hear the end of it.",
      "I just made up a new word: plagiarism.",
      "I was attacked by a group of mimes and they did unspeakable things to me.",
      "RIP boiling water, you will be mist.",
      "I was gonna tell a time travelling joke but you guys didn't like it.",
      "Apparently I snore so loudly that it scares everyone in the car I'm driving.",
      "Nothing is foolproof to a sufficiently talented fool.",
      "Choirs use their vocal cords to make vocal chords.",
      "I don't want to sound like I'm showing off or something, but people put bricks through my windows just so they can hear me practicing my saxophone louder.",
      "Nostalgia isn’t what it used to be.",
      "To the guy who invented zero, thanks for nothing!",
      "The ceiling isn’t my favorite part of the house, but it’s definitely up there.",
      "My extra sensitive toothpaste doesn't like it when I use other toothpastes.",
      "If anyone has any advice on how to deal with plastic surgery gone wrong, I'm all ears.",
      "To the people who are trying to overcome their paranoia, I'm behind you all the way.",
      "Most people think that t-rexes can't clap because they have short arms, but really it's because they are dead.",
      "The procrastination club's meeting has been postponed.",
      "Good camo pants are hard to find.",
    ],
    quote: "",
  }),
  methods: {},
  mounted() {
    var chosenNumber = Math.floor(Math.random() * this.quoteList.length);
    this.quote = this.quoteList[chosenNumber];
  },
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="elevation-12 d-flex flex-column">
          <v-toolbar class color="primary" dark flat>
            <v-toolbar-title
              class="d-block font-weight-bold text-center text-uppercase"
              >About Us
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="d-flex flex-column card">
            <v-row>
              <div class="ml-3 mr-3 mt-12 justify-center">
                <v-img
                  style="height: 100px;width: 100px"
                  src="https://res.cloudinary.com/serfati/image/upload/v1591970948/soupify_zrbnbo.png"
                />
              </div>
              <v-col>
                <p class="black--text mt-3">
                  With <b>Soupify</b>, it’s easy to find the right food or
                  desert for every moment – on your phone, your computer, your
                  tablet and more. There are millions of tracks and episodes on
                  Soupify. So whether you’re behind the wheel, working out,
                  partying or relaxing, the right food or meal is always at your
                  fingertips. Choose what you want to eat, or let Soupify
                  surprise you. You can also browse through the collections of
                  friends, chefs, and reviewers, or create a new recipe and just
                  sit back. Foodtrack your life with Soupify. Subscribe or cook
                  for free.<br>

                </p>
                <span class="text-uppercase"> Additional Links: </span>
                <div v-for="l in links" :key="l.title">
                  <a :href="l.url"> {{ l.title }} </a>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: "About",

    data() {
      return {
        links: [
          {
            title: "Soupify - API Specification",
            url: "https://github.com/Serfati/soupify-api-specs-v1.1"
          },
          {
            title: "Soupify - Backend",
            url: "https://github.com/Serfati/soupify-v1"
          },
          {
            title: "Soupify - Frontend",
            url: "https://github.com/uspeit/webenv-assignment3-client"
          },
          {
            title: "Retro PACMAN",
            url: "https://github.com/Serfati/spacman"
          },
          {
            title: "Personal Website",
            url: "https://github.com/Serfati/serfati_webpage"
          },

        ]
      }
    },

  };
</script>


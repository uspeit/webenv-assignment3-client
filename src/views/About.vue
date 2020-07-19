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
                  for free.<br />
                </p>
                <span class="text-uppercase"> About the team: </span>
                <p class="black--text">
                  We are 3 Software and Information Systems Engineering students
                  in Ben Gurion University this project is a part of Web
                  Development Fundamentals course guided by Erez Shalem and Shir
                  Frumerman.
                </p>
                <v-row justify="space-around">
                  <v-tooltip v-for="m in members" :key="m.name" left light>
                    <template v-slot:activator="{ on, attrs }">
                      <a :href="m.url">
                        <v-avatar
                          v-bind="attrs"
                          v-on="on"
                          v-bind:color="m.color"
                          size="70"
                        >
                          <img :src="m.img" />
                        </v-avatar>
                      </a>
                    </template>
                    <span class="text--hint">
                      {{ m.name }}
                    </span>
                  </v-tooltip>
                </v-row>

                <div class="mt-5">
                  <span class="text-uppercase "> Additional Links: </span>
                  <div v-for="l in links" :key="l.title">
                    <a :href="l.url"> {{ l.title }} </a>
                  </div>
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
        }
      ],
      members: [
        {
          name: "Avihai Serfati",
          img:
            "https://res.cloudinary.com/serfati/image/upload/v1595173689/as_wudrhc.jpg",
          color: "deep-purple",
          url: "https://github.com/Serfati"
        },
        {
          name: "Eitan Fedenko",
          img:
            "https://res.cloudinary.com/serfati/image/upload/v1595173814/ef_necztn.jpg",
          color: "teal",
          url: "https://github.com/uspeit"
        },
        {
          name: "Yarden Levy",
          img:
            "https://res.cloudinary.com/serfati/image/upload/v1595173689/yl_pwv27s.jpg",
          color: "orange",
          url: "https://github.com/YardenLevy"
        }
      ]
    };
  }
};
</script>

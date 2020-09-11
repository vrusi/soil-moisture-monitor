<template>
  <div>
    <v-app-bar short bottom>
      <div>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <v-toolbar-title>Soil Moisture Monitor</v-toolbar-title>
        </router-link>
      </div>

      <v-toolbar-items style="width: 100%; margin: 10px">
        <router-link to="/plants" tag="span">
          <v-btn text block style="height: 100% !important; border-radius: 0px;">Plants</v-btn>
        </router-link>

        <router-link to="/sensors" tag="span">
          <v-btn text block style="height: 100% !important; border-radius: 0px;">Sensors</v-btn>
        </router-link>
        <v-spacer></v-spacer>

        <v-row style="align-content: center;">
          <v-col style="text-align: end;">
            <v-card-text>Overall Plant Health</v-card-text>
          </v-col>
        </v-row>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

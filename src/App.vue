<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline font-weight-regular">
        <span class="font-weight-light">Import CSV file from Agritempo portal</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="getContext" style="text-decoration: none;" >
        <v-btn flat @click="test">{{!isGetContext ? "See Contexts List": "Back"}}</v-btn>
      </router-link>
    </v-toolbar>

    <v-content>
      <ImportCSVFile v-if="!isGetContext"/>
      <Content v-if="isGetContext"/>
    </v-content>
  </v-app>
</template>

<script>
import ImportCSVFile from "./components/ImportCSVFile";
import Content from "./components/Content";

export default {
    // beforeCreate() {
    //   this.isGetContext = false
    // },
    name: "App",
    components: {
        ImportCSVFile,
        Content
    },
    data() {
        return {
            isGetCSV: false,
            isGetContext: false
        };
    },
    methods: {
        test() {
            this.isGetContext = !this.isGetContext;
            console.log(this.isGetContext);
        }
    }
};
</script>

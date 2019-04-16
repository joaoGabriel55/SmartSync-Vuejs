<template>
 <v-app>
     <v-container fluid>
          <h2>Get Context links</h2>
    <!-- <v-treeview :items="contexts"></v-treeview> -->
    <!-- <tree-view :data="itens" :options="{maxDepth: 4}"></tree-view> -->
      <v-treeview :items="items" select keyfield="id"></v-treeview>

          <!-- <v-expansion-panel>
               <v-expansion-panel-content
                    v-for="context in contexts"
                    :key="context.sha">
                    <template v-slot:header>
                         <div>{{context.name}}</div>
                    </template>
                    <v-card>
                         <v-card-text>
                              {{context.url}}
                         </v-card-text>
                    </v-card>
               </v-expansion-panel-content>
          </v-expansion-panel> -->
     </v-container>
 </v-app>
</template>

<script>
// With Gameleira's Help
import axios from "axios";
// import Tree from "liquor-tree";

export default {
    name: "GetContext",
    // components: { Tree },
    data: () => ({
        items: []
    }),
    beforeMount() {
        this.getContexts();
    },
    methods: {
        getContexts() {
            // console.log(this.itemsTest)
            axios
                .get(
                    "https://api.github.com/repos/JorgePereiraUFRN/SGEOL-LD/contents/ngsi-ld?ref=master"
                )
                .then(response => {
                    this.items = this.createDir(response.data);
                    console.log(this.items);
                })
                .catch(e => e);
        },
        createDir(json) {
            return this.auxCreateDir(json);
        },
        getData(url) {
            return axios.get(url).then(response => {
                // returning the data here allows the caller to get it through another .then(...)
                return response.data;
            });
        },
        auxCreateDir(data) {
            let vector = [];

            for (let i = 0; i < data.length; i++) {
                let element = data[i];
                let objPattern = {
                    id: element.sha,
                    name: element.type == "file" ? element.url : element.name
                };
                if (element.type == "dir") {
                    //element.dir = [];
                    this.getData(element.url).then(dataDir => {
                        objPattern.children = this.auxCreateDir(dataDir);
                    });
                }
                vector.push(objPattern);
            }
            return vector;
        }
    }
};
</script>

<style>
</style>

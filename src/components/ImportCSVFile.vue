<template>
  <div class="hello">

   <v-content>
     <v-container fluid>
				<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<!-- <v-text-field label="Select Image" v-on:change="handleFileUpload()" prepend-icon='attach_file'></v-text-field> -->
                     <v-switch
                        v-model="isGetCSV"
                        :label="`Get Data CSV: ${isGetCSV.toString()}`"
                        >
                    </v-switch>
                    <input
                        v-show="isGetCSV"
						type="file"
						ref="file"
						@change="handleFileUpload"
					>
                    <v-btn color="info" v-on:click="submitFile()">Get Data</v-btn>
               
				</v-flex>
        <br>
        <div v-if="isGetCSV">
            <v-data-table v-show="dataFromCSV.length > 0"
                :headers="headers"
                :items="dataFromCSV"
                class="elevation-1"
            >
                <template v-slot:items="props">
                <td>{{ props.item.data.value }}</td>
                <td class="text-xs-left">{{ props.item.precipitacao.value }}</td>
                <td class="text-xs-left">{{ props.item.tMin.value }}</td>
                <td class="text-xs-left">{{ props.item.tMed.value == null ? 
                        (props.item.tMin.value + props.item.tMax.value) / 2: 
                        props.item.tMed.value }}</td>
                <td class="text-xs-left">{{ props.item.tMax.value }}</td>
                </template>
            </v-data-table>
        </div>
        <div v-else-if="!isGetCSV">
            <h2 v-show="dataFromCSV.length > 0">City: {{cityName}}</h2>
            <br>
             <v-data-table v-show="dataFromCSV.length > 0"
                :headers="headers"
                :items="dataFromCSV"
                class="elevation-1"
            >
                <template v-slot:items="props">
                <td>{{ props.item.date_br }}</td>
                <td class="text-xs-left">{{ props.item.rain.precipitation }}</td>
                <td class="text-xs-left">{{ props.item.temperature.min }}</td>
                <td class="text-xs-left">
                    {{
                        (props.item.temperature.min + props.item.temperature.max) / 2 
                    }}
                </td>
                <td class="text-xs-left">{{ props.item.temperature.max }}</td>
                </template>
            </v-data-table>
        </div>
			</v-container>
   </v-content>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ImportCSVFile",
    data() {
        return {
            file: "",
            isGetCSV: false,
            headers: [
                {
                    text: "Data",
                    align: "left",
                    sortable: false,
                    value: "data"
                },
                { text: "Precipitação", value: "precipitacao" },
                { text: "Temperatura Mínima (°C)", value: "tMin" },
                { text: "Temperatura Média (°C)", value: "tMed" },
                { text: "Temperatura Máxima (°C)", value: "tMax" }
            ],
            cityName: String,
            dataFromCSV: []
        };
    },
    methods: {
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            // console.log(this.file);
        },
        submitFile() {
            // console.log(this.isGetCSV);
            let formData = new FormData();
            formData.append("file", this.file);
            if (this.isGetCSV) {
                axios
                    .post("http://localhost:8080/sync/csvToJson", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    .then(response => {
                        this.dataFromCSV = response.data;
                        console.log(this.dataFromCSV);
                    })
                    .catch(err => console.log(err));
            } else {
                axios
                    .get(
                        "http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/5864/days/15?token=5a9b3f805ec40c8cab31ceb684b68075"
                    )
                    .then(response => {
                        this.dataFromCSV = response.data.data;
                        this.cityName = response.data.name;
                        // console.log(this.cityName);
                    })
                    .catch(err => console.log(err));
            }
        },
        setMethod() {
            this.isGetCSV = !this.isGetCSV;
            // console.log(this.isGetCSV);
        }
    }
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
</style>

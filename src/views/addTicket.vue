<template>
  <div id="demo1">
    <h1 class="title" style="text-align: center">ADD Ticket</h1>
    <div class="box">
      <div class="rows">
        <div class="row is-4">
          <div class="field">
            <label class="label" for="title">Title:</label>
            <div class="control">
              <input class="input" type="text" id="title" v-model="title" />
            </div>
          </div>
        </div>
        <div class="row is-4">
          <div class="field">
            <label class="label" for="description">Description:</label>
            <div class="control">
              <input class="input" id="description" v-model="description" />
            </div>
          </div>
        </div>
        <div class="row is-4">
          <div class="field">
            <label class="label" for="contact-info">Contact Information:</label>
            <div class="control">
              <input
                class="input"
                type="text"
                id="contact-info"
                v-model="contactInformation"
              />
            </div>
          </div>
        </div>
        <div class="row is-4" style="margin-top: 10px">
          <div class="columns is-centered">
            <div class="column"></div>
            <div class="column is-narrow">
              <button
                class="button is-primary"
                type="submit"
                @click.prevent="submitForm"
              >
                Submit
              </button>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Demo1View",
  data() {
    return {
      title: "",
      description: "",
      contactInformation: "",
    };
  },
  methods: {
    submitForm() {
      const data = {
        title: this.title,
        description: this.description,
        contactInformation: this.contactInformation,
      };
      console.log(data);
      fetch("http://127.0.0.1:8000/addticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.title,
          description: this.description,
          contactInformation: this.contactInformation,
        }),
      })
        .then((response) => {
          console.log("Ticket submitted successfully:", response);
        })
        .catch((error) => {
          console.error("Error submitting ticket:", error);
        });
    },
  },
});
</script>

<style scoped>
/* No custom styles needed with Bulma */
</style>

<template>
  <h1 class="title" style="text-align: center">Ticket</h1>
  <div class="box">
    <div class="btn-group mb-3">
      <button class="button is-warning" @click="getTickets('pending')">
        pending
      </button>
      <button class="button is-info" @click="getTickets('accepted')">
        accepted
      </button>
      <button class="button is-success" @click="getTickets('resolved')">
        resolved
      </button>
      <button class="button is-danger" @click="getTickets('rejected')">
        rejected
      </button>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>ContactInformation</th>
          <th>Created_date</th>
          <th>Updated_date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td>{{ ticket.Id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.description }}</td>
          <td>{{ ticket.contactInformation }}</td>
          <td>{{ ticket.created_date }}</td>
          <td>{{ ticket.updated_date }}</td>
          <td>{{ ticket.status }}</td>
          <td>
            <button class="button is-primary" @click="showModal(ticket)">
              Change Status
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="popup" v-if="showPopup">
      <div class="popup-inner">
        <h2>Create New Ticket</h2>
        <div class="btn-group mb-3">
          <button class="button is-warning">pending</button>
          <button class="button is-info">accepted</button>
          <button class="button is-success">resolved</button>
          <button class="button is-danger">rejected</button>
        </div>
        <button id="show-modal" @click="showModal = true">Show Modal</button>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': modalActive }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ modalTitle }}</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div v-if="modalActive">
            <p>Change Status of Ticket</p>
            <button
              class="button is-warning"
              @click="changeStatus('pending', ticketId)"
            >
              pending
            </button>
            <button
              class="button is-info"
              @click="changeStatus('accepted', ticketId)"
            >
              accepted
            </button>
            <button
              class="button is-success"
              @click="changeStatus('resolved', ticketId)"
            >
              resolved
            </button>
            <button
              class="button is-danger"
              @click="changeStatus('rejected', ticketId)"
            >
              rejected
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ticket",
  data() {
    return {
      tickets: [],
      modalActive: false,
      modalTitle: "",
      ticketId: "",
    };
  },

  methods: {
    getTickets(status: string) {
      axios.get(`http://127.0.0.1:8000/status?status=${status}`).then((res) => {
        console.log(res.data.result);
        this.tickets = res.data.result;
      });
    },
    showModal(ticket: any) {
      this.modalActive = true;
      this.modalTitle = `Title:${ticket.title}`;
      this.ticketId = ticket.Id;
    },
    closeModal() {
      this.modalActive = false;
      this.modalTitle = "";
    },
    changeStatus(status: string, id: string) {
      console.log(status, id);
      fetch("http://127.0.0.1:8000/updateStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: parseInt(id, 10),
          status: status,
        }),
      })
        .then((response) => {
          console.log("Ticket submitted successfully:", response);
        })
        .catch((error) => {
          console.error("Error submitting ticket:", error);
        });
      this.modalActive = false;
      this.modalTitle = "";
      window.location.reload();
    },
  },
});
</script>
<style scoped>
.box {
  width: 80%;
  margin: 0 auto;
}

.modal {
  display: none;
}

.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

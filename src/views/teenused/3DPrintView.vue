<template xmlns="http://www.w3.org/1999/html">
  <main>

    <div class="primary-container shadowed">
      <h1>
        3D Printimine
      </h1>
      </div>
    <div class="primary-container shadowed">
      <h2>
        Printimise ettevalmistus
      </h2>
      Printimiseks on vaja kõigepealt luua 3D mudelist STL fail. <br>
      Detaili luues tuleb arvestada sellega, et printer kasvatab kujundit kihthaaval ja otse õhu kohale printimine
      ei ole gravitatsiooni tõttu võimalik. <br> Maksimaalne nurk, mida on võimalik suhteliselt normaalselt printida
      on 60 kraadi. <br>Et saada teada umbkaudne prinditava detaili mass, tuleb avada STL fail programmiga Ultimaker Cura,
      kus tuleb detail(id) paigutada alusel sobivasse asendisse ning seadistada printimise parameetrid. <br>
      Curast näeb ka printimisele kuluvat aega.
    </div>
    <div class="primary-container shadowed">
      <h2>
        Tellimine
      </h2>
      Soovi korral saame Teie detaili(d) oma printeritega välja printida. Saame abistada ka 3D mudelite loomisega,
      sellest loe täpsemalt inseneriteenuste lehelt. <br> Detaili lõplik hind võib natuke muutuda sõltuvalt detaili
      keerukusest ja printimisele kuluvast ajast. <br>

      <strong>Tellimused koos STL failiga saata aadressile
        <a href="mailto:printimine@robotiklubi.ee" target="_blank">printimine@robotiklubi.ee</a></strong>
    </div>
    <div class="primary-container shadowed">
      <h2>
        Hind
      </h2>
      Alustustasu 3€ <br>
      Materjalikulu 0.10€/g <br>
      Tunnihind 1.5€ <br>

    </div>

    <div class="primary-container shadowed" :class="{'success': uploadSuccess}" id="uploads">
      <input type="text" id="fname" name="fname" placeholder="First name" v-model="firstName" required>
      <input type="text" id="lname" name="lname" placeholder="Last name" v-model="lastName" required>
      <input type="email" id="email" name="email" placeholder="E-mail" v-model="email" required>
      <input type="tel" id="phone" name="phone" placeholder="Phone number" v-model="phone" required>
      <div id="fileButtons">
        <label class="custom-file-upload">
          <input type="file" id="file" ref="file" @change="uploadFile" accept=".stl"/>
          Select File:
          {{fileName}}
        </label>
        <button @click="submitFile" class="submit" :class="{'success': uploadSuccess, 'error': errorResponse}">Upload</button>
      </div>
    </div>
  </main>

</template>

<script lang="ts">
import axios from 'axios'
import {defineComponent} from "vue";

export default defineComponent( {
  data() {
    return {
      file: null,
      uploadSuccess: false,
      errorResponse: false,
      done: false,
      fileName: '',
      polling: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }
  },
  methods: {
    uploadFile(event: { target: { files: null[]; }; }) {
      this.file = event.target.files[0];
      this.fileName = event.target.files[0] !== null ? event.target.files[0].name : ''; // If IDE warns about .name then ignore it
    },
    async submitFile() {
      let info = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
      }
      if (info.firstName === '' || info.lastName === '' || info.email === '' || info.phone === '') {
        alert('Please fill in all the fields')
        return
      }

      const formData = new FormData();
      if (this.file == null) {
        return;
      }
      formData.append('file', this.file);
      await axios.post('api/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response);
        this.uploadSuccess = true;
        console.log("Upload success");
        this.polData();
      }).catch(error => {
        this.errorResponse = true;
        console.log(error);
      });
    },
    polData () {
      this.polling = setInterval(async () => {
        console.log("Polling");
        const formData = new FormData();
        if (this.file == null) {
          return;
        }
        formData.append('fileName', this.fileName);
        formData.append('email', this.email);
        formData.append('phone', this.phone);
        formData.append('firstName', this.firstName);
        formData.append('lastName', this.lastName);
        try {
          await axios.post('api/process/status', formData, {
            headers: {
              'Content-Type':'application/json'
            }
          }).then(response => {
            console.log(response);
            if (response.data.status == 'done') {
              this.done = true;
              clearInterval(this.polling);
              alert('Your file has been processed');
            }
          }).catch(error => {
            this.errorResponse = true;
            console.log(error);
          });
        } catch (e) {
          console.log(e);
        }

      }, 3000)
    }
  },
  beforeDestroy() {
    // clearInterval(this.polling);
  }

})
</script>

<style scoped>
#uploads {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
}
#uploads input {
  margin: 10px;
  font-size: 1.2rem;
}
#file {
  text-align: center;
  display: none;
}

label.custom-file-upload {
  width: 19rem;
  min-height: 3rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #00b9f2;
  border-radius: 10px;
  text-align: center;
  color: black;
  font-weight: bold;
}

#fileButtons {
  padding: inherit;
}

button.submit {
  width: 19rem;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border-radius: 10px;
}

button.submit.success {
  background-color: #4CAF50;
  color: white;
}

button.submit.error {
  background-color: #f44336;
  color: white;
}


</style>
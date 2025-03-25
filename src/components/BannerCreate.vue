<!-- src/App.vue -->
<template>
  <div class="container">
    <!-- Full-width Banner -->
    <header :style="bannerStyle" class="banner">
      <img
        v-if="bannerImage"
        :src="bannerImage"
        alt="Banner Image"
        class="banner-img"
        @error="handleImageError"
        @load="imageLoaded = true"
      />
      <h1 :style="{ color: textColor }">{{ bannerText }}</h1>
      <p v-if="imageError" class="error-message">Invalid image URL. Please enter a valid link.</p>
    </header>

    <!-- Interactive Form -->
    <section class="form-section">
      <h2>Customize Your Banner</h2>
      <form @submit.prevent>
        <div class="form-group">
          <label for="bannerText">Banner Text:</label>
          <input
            id="bannerText"
            v-model="bannerText"
            type="text"
            placeholder="Enter text"
            class="input-text"
          />
        </div>
        <div class="form-group">
          <label for="bgColor">Background Color:</label>
          <input
            id="bgColor"
            v-model="bgColor"
            type="color"
            class="input-color"
          />
        </div>
        <div class="form-group">
          <label for="bannerImage">Banner Image URL:</label>
          <input
            id="bannerImage"
            v-model="imageInput"
            type="url"
            placeholder="Enter image URL (e.g., https://picsum.photos/1200/300)"
            class="input-text"
            @input="updateImage"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerText: "Discovering New Horizons",
      bgColor: "#2c3e50",
      imageInput: "",
      bannerImage: null,
      imageError: false,
      imageLoaded: false,
    };
  },
  computed: {
    bannerStyle() {
      return {
        backgroundColor: this.bannerImage && this.imageLoaded ? "transparent" : this.bgColor,
        backgroundImage: this.bannerImage && this.imageLoaded ? `url(${this.bannerImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
    textColor() {
      if (this.bannerImage && this.imageLoaded) return "#fff"; // White text over images
      const hex = this.bgColor.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? "#333" : "#fff";
    },
  },
  methods: {
    updateImage() {
      this.imageError = false;
      this.imageLoaded = false;
      const url = this.imageInput.trim();
      if (url) {
        this.bannerImage = url;
      } else {
        this.bannerImage = null;
      }
    },
    handleImageError() {
      this.imageError = true;
      this.imageLoaded = false;
      this.bannerImage = null;
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
}

/* Full-width Banner */
.banner {
  width: 100vw;
  min-height: 300px;
  margin-left: calc(-50vw + 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

h1 {
  position: relative;
  z-index: 1;
  font-size: 2.5rem;
  margin: 0;
  padding: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: color 0.3s ease;
}

.error-message {
  position: relative;
  z-index: 1;
  color: #ff4d4d;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 10px;
}

.form-section {
  max-width: 800px;
  margin: 30px auto;
  text-align: center;
  background: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-group {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

label {
  font-weight: bold;
  color: #34495e;
}

.input-text,
.input-color {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.input-text:focus,
.input-color:focus {
  border-color: #3498db;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  outline: none;
}

.input-text {
  width: 300px;
}

.input-color {
  width: 50px;
  height: 40px;
  padding: 0;
}
</style>
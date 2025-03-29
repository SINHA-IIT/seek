export default {
  template: `
    <div class="register-container">
      <div class="register-box">
        <div class="register-title-section">
          <img src="assets/logo.png" alt="seek.AI Logo" class="register-logo" />
          <h2 class="register-title">{{ isEditMode ? "EDIT COURSE" : "EDIT COURSE" }}</h2>
        </div>

        <form @submit.prevent="submiteditcourse">
                  <div class="register-form-content">
                      <!-- Left Section (Common Fields) -->
                      <div class="register-left-section">
                                              
                        <input type="text" v-model="name" class="register-form-control" placeholder="Course Name" required />
                        <input type="text" v-model="desc" class="register-form-control" placeholder="Course Description" required />
                        <input type="text" v-model="course_code" class="register-form-control" placeholder="Course Code" required />
                        <input type="text" v-model="term_name" class="register-form-control" placeholder="Term Name" required />
  
                             
  
                  <button type="submit" class="register-btn-register">Submit</button>
  
                  <p v-if="alertMessage" class="register-error-message">{{ alertMessage }}</p>
                  
              </form>
      </div>
    </div>
  `,

  data() {
    return {
      course_id: course.course_id, // Used for edit mode
      name: "",
      desc: "",
      term_name: "",
      course_code: "",
      alertMessage: "",
      isEditMode: false, // Track if we are in edit mode
    };
  },

  created() {
    // Check if we are in edit mode by looking for course data in route params
    if (this.$route.params.course) {
      const course = this.$route.params.course;
      this.loadCourseData(course);
    }
  },

  methods: {
    // Load course data for editing
    loadCourseData(course) {
      this.course_id = course.course_id;
      this.name = course.name;
      this.desc = course.desc;
      this.term_name = course.term_name;
      this.course_code = course.course_code;
      this.isEditMode = true;
    },

    // Submit course - add or update
    async submiteditcourse() {
      console.log(this.isEditMode ? "Updating course..." : "Adding course...");

      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const token = userData.token;

        // Determine URL and method based on mode (add or edit)
        const url = this.isEditMode
          ? `${location.origin}/api/course/${this.course_id}`
          : `${location.origin}/api/course`;
        const method = this.isEditMode ? "PUT" : "POST";

        const res = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: this.name,
            desc: this.desc,
            term_name: this.term_name,
            course_code: this.course_code,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          this.alertMessage = this.isEditMode
            ? "Course updated successfully."
            : "Course added successfully.";

          setTimeout(() => {
            if (this.$store.state.role.includes("admin")) {
              this.$router.push("/admin-dashboard");
            }
          }, 1000);
        } else {
          const errorData = await res.json();
          this.alertMessage =
            errorData.message || "Something went wrong. Try again.";
        }
      } catch (error) {
        console.error("Error:", error);
        this.alertMessage = "Something went wrong.";
      }
    },
  },
};

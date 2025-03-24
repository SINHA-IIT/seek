import NavBar from "../components/navBar.js";
import RightSideBar from "../components/RightSideBar.js";

export default {
    components: { NavBar, RightSideBar },
    template: `
    <div>
        <NavBar />
        <div class="profile-page-container">
            <RightSideBar />

            <div class="profile-page-main">
                <h1 class="text-center">My Profile</h1>

                <!-- Profile Card -->
                <div class="profile-page-card">
                    <img src="https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-74966.jpg"
                        class="profile-page-avatar" alt="Student Photo">
                    <div class="profile-page-info">
                        <h3>{{ userName }}</h3>
                        <p>Level: {{ userLevel }}</p>
                        <p>DOB: {{ userDOB }}</p>
                    </div>
                </div>

                <!-- Badges -->
                <div class="profile-page-badges">
                    <h5>Achievements & Badges</h5>
                    <div>
                        <span v-for="badge in userBadges" :key="badge" class="profile-page-badge" :class="badgeClass(badge)">{{ badge }}</span>
                    </div>
                </div>

                <!-- Accordion Sections -->
                <div class="accordion profile-page-accordion" id="profileAccordion">
                    <!-- Projects -->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#projectsSection">
                                Projects
                            </button>
                        </h2>
                        <div id="projectsSection" class="accordion-collapse collapse show">
                            <div class="accordion-body">
                                <p v-for="(project, index) in userProjects" :key="index">{{ project }}</p>
                                <button class="btn btn-primary">Edit</button>
                            </div>
                        </div>
                    </div>

                    <!-- Address -->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#addressSection">
                                Address
                            </button>
                        </h2>
                        <div id="addressSection" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <p>{{ userAddress }}</p>
                                <button class="btn btn-primary">Edit</button>
                            </div>
                        </div>
                    </div>

                    <!-- Personal Links -->
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#linksSection">
                                Personal Links
                            </button>
                        </h2>
                        <div id="linksSection" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <p>LinkedIn: <a :href="userLinks.linkedin" target="_blank">{{ userLinks.linkedin }}</a></p>
                                <p>GitHub: <a :href="userLinks.github" target="_blank">{{ userLinks.github }}</a></p>
                                <button class="btn btn-primary">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Logout Button -->
                <button class="profile-page-logout-btn" @click="logout">Logout</button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            userName: this.$store.state.name || "Student Name",
            userLevel: "Degree/Foundation/Diploma",
            userDOB: "July 13, 2099",
            userBadges: ["Python Expert", "Full Stack Developer", "AI Enthusiast", "Data Science", "Machine Learning"],
            userProjects: ["Project 1: XYZ", "Project 2: ABC"],
            userAddress: "123, Street Name, City, State",
            userLinks: {
                linkedin: "https://linkedin.com/yourprofile",
                github: "https://github.com/yourprofile"
            }
        };
    },
    methods: {
        badgeClass(badge) {
            const colors = ["bg-primary", "bg-success", "bg-warning text-dark", "bg-danger", "bg-info text-dark", "bg-secondary", "bg-dark", "bg-light text-dark"];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        logout() {
            this.$store.commit("logout");
            this.$router.push("/login");
        }
    }
};

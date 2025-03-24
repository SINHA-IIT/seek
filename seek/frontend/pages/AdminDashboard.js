import NavBar from "../components/navBar.js";
import RightSideBar from "../components/RightSideBar.js";

export default {
    components: { NavBar, RightSideBar },
    template: `
    <div>
        <!-- Navbar -->
        <NavBar />

        <div class="dashboard-container">
            <div class="container mt-5 text-center">
                <h2>Admin Dashboard</h2>
                <p>Welcome, <strong>{{ userName }}</strong>!</p>
                <p>Your role: <strong>{{ userRole }}</strong></p>
            </div>
        </div>

        <!-- Right Sidebar -->
        <RightSideBar />
    </div>
    `,
    computed: {
        userName() {
            return this.$store.state.name || "Admin"; // Fetch from Vuex
        },
        userRole() {
            return this.$store.state.role || "Administrator";
        }
    }
};

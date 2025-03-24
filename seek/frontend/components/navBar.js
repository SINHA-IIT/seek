import RightSideBar from "./RightSideBar.js";

export default {
    components: { RightSideBar },
    template: `
    <header class="custom-navbar">
        <div class="navbar-container">
            <!-- Logo -->
            <router-link to="/" class="custom-navbar-logo">
                <img src="/assets/logo.png" alt="seek.AI" />
            </router-link>

            <!-- Greeting with logged-in user's name -->
            <div class="custom-greeting">
                {{ greetingMessage }}
            </div>

            <!-- Right Section -->
            <div class="custom-right-section">
                <span class="custom-current-date">{{ formattedDate }}</span>
                <button class="custom-menu-btn" @click="toggleSidebar">
                    <img :src="menuIcon" alt="Menu" class="custom-menu-icon" :class="{ 'custom-rotated': isSidebarOpen }" />
                </button>
            </div>
        </div>

        <!-- Sidebar -->
        <RightSideBar :isOpen="isSidebarOpen" @close-sidebar="toggleSidebar" />

        <!-- Overlay -->
        <div v-if="isSidebarOpen" class="custom-overlay" @click="toggleSidebar"></div>
    </header>
    `,
    data() {
        return {
            isSidebarOpen: false,
            menuIcon: "https://img.icons8.com/?size=100&id=30UIOfuJpZnZ&format=png&color=FFFFFF",
            formattedDate: "",
        };
    },
    computed: {
        // Fetch name from Vuex store
        studentName() {
            return this.$store.state.name || "Guest";  // Get name from Vuex
        },
        // Display greeting with user's name
        greetingMessage() {
            const hours = new Date().getHours();
            if (hours < 12) return `Good Morning, ${this.studentName}!`;
            if (hours < 18) return `Good Afternoon, ${this.studentName}!`;
            return `Good Evening, ${this.studentName}!`;
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        updateDate() {
            const now = new Date();
            const options = { month: "short", day: "numeric", year: "numeric" };
            this.formattedDate = now.toLocaleDateString("en-US", options);
        }
    },
    mounted() {
        this.updateDate();
        setInterval(this.updateDate, 60000);
    },
};

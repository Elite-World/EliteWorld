# CourseHub (EliteWorld)

A premium, B2B2C global learning marketplace styled similarly to Airbnb, exclusively tailored for offline, highly-curated educational experiences. 

## Platform Roles

The ecosystem supports 6 core distinct user profiles, segregated into three main parties: **Platform**, **Seller (Institution)**, and **Buyer (Paylord/Consumer)**.

### 1. Web Master (Platform)
- The ultimate super-admin (You). 
- **Capabilities:** Manages students, institutional partners, courses, and platform finances.
- **Access:** Has exclusive access to the Admin Portal. Cannot access the Partner Portal or Learner Dashboard to enforce strict data and role boundaries.

### 2. Institutional Partner (Seller)
- The primary account holder for a registered school or educational institution.
- **Capabilities:** Registers the institution, manages the institution profile, and orchestrates the creation of sub-accounts for their staff (Faculties and Administrators).
- **Access:** Partner Portal.

### 3. Administrator (Seller)
- An administrative staff member hired by the Institutional Partner.
- **Capabilities:** Manages resources, assigns faculties to classes, schedules rooms, and handles day-to-day operational logistics for the institution.
- **Access:** Partner Portal.

### 4. Faculty (Seller)
- The teaching staff hired by the Institutional Partner.
- **Capabilities:** Manages assignments, class materials, curriculum execution, and grades for the students enrolled in their assigned sessions.
- **Access:** Partner Portal.

### 5. User / Paylord (Buyer)
- A registered user who logs into the platform to purchase and enroll in programs.
- **Capabilities:** Can browse courses, manage a wishlist, purchase courses, and track active sessions. In the future, this role will act as a "Paylord" who can create sub-accounts for the actual students (e.g., parents buying for their children).
- **Access:** Learner Dashboard.

### 6. Visitor
- An unregistered or non-logged-in user.
- **Capabilities:** Can explore the global registry, view course details, and read reviews, but cannot enroll or access dashboards.
- **Access:** Global Search & Discovery.

---

## Course Schema

Every "Experience" (Course) on the platform is structured around the following critical offline-first attributes:

- **`startDate`**: The exact date the course/cohort begins.
- **`endDate`**: The exact date the course/cohort concludes.
- **`duration`**: A human-readable string (e.g., "6 Weeks") representing the total length of the program.
- **`priceUnit`**: The billing unit for the course price. Valid options include `Total`, `Per Week`, or `Per Month`.
- **`location`**: The physical city and country where the offline class takes place (e.g., "London, UK" or "Silicon Valley, USA"). *Note: Online courses are strictly not supported at this time.*
- **`mode`**: The attendance format. Valid options include `Full Day`, `Half Day`, `Weekend`, or `Evening`.
- **`category`**: The subject matter domain (e.g., Coding, Language, Business, Summer Camp).

